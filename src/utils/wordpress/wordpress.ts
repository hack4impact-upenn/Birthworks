import db from '../database';
import { Customer, ICustomer } from '../../models/customer.model';
import { Cert, ICert } from '../../models/cert.model';
/*eslint-disable */
//@typescript-eslint/no-var-requires
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
/*eslint-enable */
const path = 'src/utils/wordpress/members.csv';
const orderPath = 'src/utils/wordpress/orders.csv';

const rows: any = [];
const orderRows: any = [];

enum validOrders {
  aced = 'ACED Certification (Accelerated Childbirth Educator & Doula)',
  childbirth = 'Certified Childbirth Educator',
  bdoula = 'Doula Program (International)',
  bdoulaus = 'Doula Program (US Only)',
  pdoula = 'Postpartum Doula Certification',
  pdoulap = 'Postpartum Doula Certification Program',
  bdoulaI = 'Birth Doula Certification-Indonesia',
  ceducator = 'Certification - Childbirth Educator',
  cdoula = 'Certification - Birth Doula',
}

function isDate(dateStr: string) {
  return !isNaN(new Date(dateStr).getDate());
}

function getName(s: string): string {
  switch (s) {
    case 'ACED Certification (Accelerated Childbirth Educator & Doula)':
      return 'ACED (Childbirth Educator & Birth Doula)';
    case 'Certified Childbirth Educator':
      return 'Childbirth Educator';
    case 'Doula Program (International)':
      return 'Birth Doula';
    case 'Doula Program (US Only)':
      return 'Birth Doula';
    case 'Postpartum Doula Certification':
      return 'Postpartum Doula';
    case 'Postpartum Doula Certification Program':
      return 'Postpartum Doula';
    case 'Birth Doula Certification-Indonesia':
      return 'Birth Doula';
    case 'Certification - Childbirth Educator':
      return 'Childbirth Educator';
    case 'Kangaroula (Advanced) Certification':
      return 'Kangaroula (Advanced) Certification';
    case 'Certification - Birth Doula':
      return 'Birth Doula';
  }
  return 'unknown type';
}

function removeEmpty(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v != null && typeof v == 'string' && v.length > 0
    )
  );
}

const readCustomerData = async () => {
  await fs
    .createReadStream(path)
    .pipe(csv())
    .on('data', function (data: any) {
      try {
        if (data !== null) {
          rows.push(data);
        }
      } catch (err) {
        //perform the operation
        //error handler
      }
    })
    .on('end', function () {
      //some final operation
      populateMongo();
    });
};

const readOrderData = async () => {
  await fs
    .createReadStream(orderPath)
    .pipe(csv())
    .on('data', function (data: any) {
      try {
        if (data !== null) {
          orderRows.push(data);
        }
      } catch (err) {
        //perform the operation
        //error handler
      }
    })
    .on('end', function () {
      //some final operation
      populateOrders();
    });
};

const populateOrders = async () => {
  for (let i = 0; i < orderRows.length; i++) {
    let customerByEmail = null;
    let customerByNameCombo = null;
    // eslint-disable-next-line no-var
    var customer;
    if (
      orderRows[i]['First Name (Billing)'] &&
      orderRows[i]['Last Name (Billing)']
    ) {
      customerByNameCombo = await Customer.findOne({
        first_name: orderRows[i]['First Name (Billing)'],
        last_name: orderRows[i]['Last Name (Billing)'],
      });
    }
    if (orderRows[i]['Email (Billing)']) {
      customerByEmail = await Customer.findOne({
        email: orderRows[i]['Email (Billing)'],
      });
    }
    let flag = false;
    customer = customerByNameCombo || customerByEmail;
    const uniqueIdentifier = orderRows[i]['Email (Billing)'];

    if (
      !(
        typeof orderRows[i]['Order Date'] === 'string' &&
        isDate(orderRows[i]['Order Date'])
      )
    ) {
      continue;
    }

    if (!customer) {
      if (!uniqueIdentifier || !(typeof uniqueIdentifier === 'string')) {
        continue;
      }
      customer = new Customer();
      customer.first_name = orderRows[i]['First Name (Billing)'];
      customer.last_name = orderRows[i]['Last Name (Billing)'];
      customer.city = orderRows[i]['City (Billing)'];
      customer.state = orderRows[i]['State Code (Billing)'];
      customer.country = orderRows[i]['Country Code (Billing)'];
      customer.membership_start = new Date(orderRows[i]['Order Date']);
      customer.membership_end = new Date(orderRows[i]['Order Date']);
      customer.membership_end.setFullYear(
        customer.membership_end.getFullYear() + 1
      );
      if (!customer.membership_start) {
        continue;
      }
      //customer.membership_end = new Date(rows[i].tdoc);
      customer.notes_read = '';
      customer.notes_write = '';
      customer.phone = orderRows[i]['Phone (Billing)'];
      customer.email = uniqueIdentifier;
      flag = true;
    }

    const newCert: ICert = new Cert();
    if (Object.values(validOrders).includes(orderRows[i]['Item Name'])) {
      const newName = getName(orderRows[i]['Item Name']);
      const prevCert = await Cert.findOne({
        customer_id: customer._id,
        name: newName,
      });
      if (prevCert) {
        continue;
      }
      newCert.customer_id = customer._id;
      newCert.entry_date = orderRows[i]['Order Date'];
      newCert.completion_date = orderRows[i]['Order Date'];
      newCert.completion_date.setFullYear(
        newCert.completion_date.getFullYear() + 1
      );
      newCert.certificate = orderRows[i]['Order Date'];
      newCert.certificate.setFullYear(newCert.certificate.getFullYear() + 1);
      newCert.recertification_dates = [newCert.certificate];
      newCert.mentor = orderRows[i]['mentor'];
      newCert.name = newName;
      if (flag) {
        customer.certifications = [newCert._id];
        customer.save();
      } else {
        await Customer.update(
          { _id: customer._id },
          { $push: { certifications: newCert._id } }
        );
      }
      newCert.save();
    }
  }
};

const populateMongo = async () => {
  for (let i = 0; i < rows.length; i++) {
    let flagg = false;
    let uniqueIdentifier = rows[i].email;
    if (!uniqueIdentifier) {
      uniqueIdentifier = rows[i].fname + '.' + rows[i].lname + '@fake.com';
      flagg = true;
    }
    if (
      uniqueIdentifier &&
      typeof uniqueIdentifier === 'string' &&
      uniqueIdentifier.length &&
      uniqueIdentifier.length > 0
    ) {
      const prevData: ICustomer | null = await Customer.findOne({
        email: uniqueIdentifier,
      });

      if (!prevData) {
        const customer: ICustomer = new Customer();

        if (!(typeof rows[i].tdoe === 'string' && isDate(rows[i].tdoe))) {
          customer.membership_start = new Date();
        } else {
          customer.membership_start = new Date(rows[i].tdoe);
        }
        if (!(typeof rows[i].tdoc === 'string' && isDate(rows[i].tdoc))) {
          customer.membership_end = new Date();
        } else {
          customer.membership_end = new Date(rows[i].tdoc);
        }
        if (!(typeof rows[i].tdoe === 'string' && rows[i].fname.length > 0)) {
          customer.first_name = 'Unknown';
        } else {
          customer.first_name = rows[i].fname;
        }
        if (!(typeof rows[i].tdoe === 'string' && rows[i].lname.length > 0)) {
          customer.last_name = 'unknown';
        } else {
          customer.last_name = rows[i].lname;
        }

        customer.city = rows[i].city;
        customer.state = rows[i].state;
        customer.country = rows[i].country;
        customer.notes_read = rows[i].comments;
        customer.notes_write = '';
        customer.phone = rows[i].phone;
        customer.email = uniqueIdentifier;

        const res = await customer.save();
      }
    }
  }
};

export const sync = async () => {
  const username = process.env.WOOCOMMERCE_KEY;
  const password = process.env.WOOCOMMERCE_SECRET;
  const uri = process.env.WP_WOCOMMERCE_API;
  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString('base64');
  console.log(password);

  const config = {
    method: 'get',
    url: uri,
    headers: { Authorization: 'Basic ' + encodedToken },
  };

  axios(config)
    .then(async function (response: any) {
      const { data } = response;

      for (let i = 0; i < data.length; i++) {
        let customerByEmail = null;
        let customerByNameCombo = null;
        // eslint-disable-next-line no-var
        var customer;
        if (
          data[i]['billing']['first_name'] &&
          data[i]['billing']['last_name']
        ) {
          customerByNameCombo = await Customer.findOne({
            first_name: data[i]['billing']['first_name'],
            last_name: data[i]['billing']['last_name'],
          });
        }
        if (data[i]['billing']['email']) {
          customerByEmail = await Customer.findOne({
            email: data[i]['billing']['email'],
          });
        }
        let flag = false;
        customer = customerByNameCombo || customerByEmail;
        const uniqueIdentifier = data[i]['billing']['email'];

        if (
          !(
            typeof data[i]['date_created'] === 'string' &&
            isDate(data[i]['date_created'])
          )
        ) {
          continue;
        }

        if (!customer) {
          if (!uniqueIdentifier || !(typeof uniqueIdentifier === 'string')) {
            console.log('hi');
            continue;
          }
          customer = new Customer();
          customer.first_name = data[i]['billing']['first_name'];
          customer.last_name = data[i]['billing']['last_name'];
          customer.city = data[i]['billing']['city'];
          customer.state = data[i]['billing']['state'];
          customer.country = data[i]['billing']['country'];
          customer.membership_start = new Date(data[i]['date_created']);
          customer.membership_end = new Date(data[i]['date_created']);
          customer.membership_end.setFullYear(
            customer.membership_end.getFullYear() + 1
          );
          if (!customer.membership_start) {
            continue;
          }
          //customer.membership_end = new Date(rows[i].tdoc);
          customer.notes_read = '';
          customer.notes_write = '';
          customer.phone = data[i]['billing']['phone'];
          customer.email = uniqueIdentifier;
          flag = true;
        }

        const newCert: ICert = new Cert();
        if (
          Object.values(validOrders).includes(data[i]['line_items'][0]['name'])
        ) {
          const newName = getName(data[i]['line_items'][0]['name']);
          const prevCert = await Cert.findOne({
            customer_id: customer._id,
            name: newName,
          });
          if (prevCert) {
            continue;
          }
          newCert.customer_id = customer._id;
          newCert.entry_date = data[i]['date_created'];
          newCert.completion_date = data[i]['date_created'];
          newCert.completion_date.setFullYear(
            newCert.completion_date.getFullYear() + 1
          );
          newCert.certificate = data[i]['date_created'];
          newCert.certificate.setFullYear(
            newCert.certificate.getFullYear() + 1
          );
          newCert.recertification_dates = [newCert.certificate];
          newCert.mentor = '';
          newCert.name = newName;
          if (flag) {
            customer.certifications = [newCert._id];
            customer.save();
          } else {
            await Customer.update(
              { _id: customer._id },
              { $push: { certifications: newCert._id } }
            );
          }
          newCert.save();
        }
      }
    })
    .catch(function (error: any) {
      console.log(error);
    });
};

const main = async () => {
  await db.open();
  await readCustomerData();
  await readOrderData();
};

main();

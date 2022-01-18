import db from '../database';
import { Customer, ICustomer } from '../../models/customer.model';
import { Cert, ICert } from '../../models/cert.model';
const fs = require('fs');
const csv = require('csv-parser');
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
    case 'Kangaroula (Advanced) Certification':
      return 'Kangaroula (Advanced) Certification';
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
    //console.log(orderRows[i])
    var customerByEmail = null;
    var customerByNameCombo = null;
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
    var flag = false;
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
      newCert.recertification_dates = [orderRows[i]['Order Date']];
      newCert.mentor = orderRows[i]['mentor'];
      newCert.name = newName;
      if (flag) {
        customer.certifications = [newCert._id];
        customer.save();
      } else {
        console.log('----------------');
        await Customer.update(
          { _id: customer._id },
          { $push: { certifications: newCert._id } }
        );
      }
      newCert.save();
      console.log(customer);
      console.log(newCert);
    }
  }
};

const populateMongo = async () => {
  for (let i = 0; i < rows.length; i++) {
    const uniqueIdentifier = rows[i].email;
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
          //console.log('p1');
          continue;
        }
        if (!(typeof rows[i].tdoc === 'string' && isDate(rows[i].tdoc))) {
          //console.log('p2');
          continue;
        }
        if (!(typeof rows[i].tdoe === 'string' && rows[i].fname.length > 0)) {
          //console.log('p3');
          continue;
        }
        if (!(typeof rows[i].tdoe === 'string' && rows[i].lname.length > 0)) {
          //console.log('p4');
          continue;
        }
        customer.first_name = rows[i].fname;
        customer.last_name = rows[i].lname;
        customer.city = rows[i].city;
        customer.state = rows[i].state;
        customer.country = rows[i].country;
        customer.membership_start = new Date(rows[i].tdoe);
        customer.membership_end = new Date(rows[i].tdoc);
        customer.notes_read = rows[i].comments;
        customer.notes_write = '';
        customer.phone = rows[i].phone;
        customer.email = uniqueIdentifier;
        const res = await customer.save();
      } else {
      }
    }
  }
};

const main = async () => {
  await db.open();
  await readCustomerData();
  await readOrderData();
};

main();

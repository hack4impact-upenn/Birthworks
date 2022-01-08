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
}

function isDate(dateStr: string) {
  return !isNaN(new Date(dateStr).getDate());
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

    customer = customerByNameCombo || customerByEmail;

    if (!customer) {
      continue;
    }

    if (Object.values(validOrders).includes(orderRows[i]['Item Name'])) {
      const newCert: ICert = new Cert();
      newCert.customer_id = customer._id;
      newCert.entry_date = orderRows[i]['Order Date'];
      newCert.completion_date = orderRows[i]['Date'];
      newCert.recertification_dates = orderRows[i]['Date'];
      newCert.mentor = orderRows[i]['mentor'];
      newCert.name = orderRows[i]['Item Name'];

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

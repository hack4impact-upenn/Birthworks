import db from '../database';
import { Customer, ICustomer } from '../../models/customer.model';
var fs = require('fs');
const csv = require('csv-parser');
const path = 'src/utils/wordpress/members.csv';

const rows: any = [];

function isDate(dateStr: string) {
  console.log(dateStr);
  return !isNaN(new Date(dateStr).getDate());
}

function removeEmpty(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v != null && typeof v == 'string' && v.length > 0
    )
  );
}

const readData = async () => {
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
      console.log(rows.length);
    })
    .on('end', function () {
      //some final operation
      populateMongo();
    });
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
          console.log('p1');
          continue;
        }
        if (!(typeof rows[i].tdoc === 'string' && isDate(rows[i].tdoc))) {
          console.log('p2');
          continue;
        }
        if (!(typeof rows[i].tdoe === 'string' && rows[i].fname.length > 0)) {
          console.log('p3');
          continue;
        }
        if (!(typeof rows[i].tdoe === 'string' && rows[i].lname.length > 0)) {
          console.log('p4');
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
        console.log(res);
      } else {
      }
    }
  }
};

const main = async () => {
  await db.open();
  await readData();

  console.log('-----------------');
  console.log(rows.length);
};

main();

import { Customer, ICustomer } from '../models/customer.model';
import { Cert, ICert } from '../models/cert.model';
import express from 'express';
import auth from '../middleware/auth';
import errorHandler from './error';
import mongoose from 'mongoose';
import { result } from 'lodash';

const number_of_customers = 10;

const router = express.Router();

function getMaxExpDate(months: number) {
  const dateObj = new Date();
  let month = dateObj.getMonth() + 1 + months;
  const day = 1;
  let year = dateObj.getFullYear();
  console.log(`${year}, ${month}`);
  if (month > 11) {
    year = year + Math.floor(month / 12);
    month = month % 12;
  }
  return new Date(year, month, day);
}
// TODO: see if we actually need to calculate and/or push the recert date?
function expiresTooSoon(
  months: number,
  element: ICert,
  index: number,
  array: [ICert]
) {
  const exp_months = element.name === 'Kangaroula' ? 12 : 24;
  const recertification_date = new Date(
    element.completion_date.setMonth(
      element.completion_date.getMonth() + exp_months
    )
  );
  return recertification_date > getMaxExpDate(months);
}

function customerInvalid(c: any, filter: any) {
  console.log(filter);
  const certs = c.cert_obj;
  let recertifications_bad = false;
  if (filter.recertification != 'undefined' && filter != '') {
    recertifications_bad = certs.some(
      expiresTooSoon.bind(null, filter.recertification)
    );
  }
  let membership_bad = false;
  if (filter.membership != 'undefined' && filter != '') {
    membership_bad = c.membership_end > getMaxExpDate(filter.membership);
  }
  return recertifications_bad || membership_bad;
}

router.post('/', async (req, res) => {
  console.log(getMaxExpDate(27));
  console.log(getMaxExpDate(1));
  const { page_num } = req.body;
  const { filters } = req.body;
  console.log(req.body);
  console.log(filters);
  const { query } = req.body;
  let find_query = {};
  if (typeof query !== 'undefined') {
    find_query = {
      $or: [
        { first_name: { $regex: query } },
        { last_name: { $regex: query } },
        { email: { $regex: query } },
        { phone: { $regex: query } },
      ],
    };
  }
  Customer.aggregate([
    {
      $lookup: {
        from: 'certifications',
        localField: 'certifications',
        foreignField: '_id',
        as: 'cert_obj',
      },
    },
  ])
    .match(find_query)
    .skip(page_num * number_of_customers)
    .limit(number_of_customers)
    .then((result) =>
      result.filter((customer) => customerInvalid(customer, filters))
    )
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

/**
 * When a user edits the “New Notes” section for the
 * customer with the specified customer_id. Update the value of the notes_write
 * field with the value of the notes param.
 */
const patch_err_msg = 'Error updating customer notes';
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  console.log(notes);
  Customer.findByIdAndUpdate(id, { notes_write: notes }, (err, _) => {
    if (err) {
      return errorHandler(res, patch_err_msg);
    }
    return res
      .status(200)
      .json({ success: true, result: 'Notes successfully updated' });
  });
});

router.get('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  console.log(customer_id);
  Customer.findById(customer_id)
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

export default router;

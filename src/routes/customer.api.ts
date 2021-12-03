import { Customer, ICustomer } from '../models/customer.model';
import { Cert, ICert } from '../models/cert.model';
import express from 'express';
import auth from '../middleware/auth';
import errorHandler from './error';

const number_of_customers = 10;

const router = express.Router();

function getMaxExpDate(months: number) {
  const dateObj = new Date();
  let month = dateObj.getMonth() + 1 + months;
  const day = 1;
  let year = dateObj.getFullYear();
  if (month > 11) {
    year = year + Math.floor(month / 12);
    month = month % 12;
  }
  return new Date(year, month, day);
}
/**
 * Checks to see if a certifcation expires within a given number of months.
 * Calculated by looking at the latest recertification date of the certification
 * or uses the original certification date if there's no recertifications.
 * @param months The number of months to check for a potential expiration
 * @param element The certification to check
 * @returns A boolean saying if it expires within the range or not
 */
function expiresTooSoon(
  months: number,
  element: ICert,
  index: number,
  array: [ICert]
) {
  const exp_months = element.name === 'Kangaroula' ? 12 : 24;
  const recert_dates = element.recertification_dates;
  let latest_completion = element.completion_date;
  if (recert_dates.length > 0) {
    latest_completion = recert_dates[recert_dates.length - 1];
  }
  latest_completion = new Date(latest_completion);
  const recertification_deadline = new Date(
    latest_completion.setMonth(latest_completion.getMonth() + exp_months)
  );
  return recertification_deadline < getMaxExpDate(months);
}

function customerInvalid(c: any, filter: any) {
  const temp_c = JSON.parse(JSON.stringify(c));
  const certs = temp_c.cert_obj;
  let recertifications_bad = false;
  if (filter.recertification != 'undefined' && filter != '') {
    recertifications_bad = certs.some(
      expiresTooSoon.bind(null, filter.recertification)
    );
  }
  let membership_bad = false;
  if (filter.membership != 'undefined' && filter != '') {
    membership_bad = c.membership_end < getMaxExpDate(filter.membership);
  }
  return recertifications_bad || membership_bad;
}

router.post('/', async (req, res) => {
  const { page_num } = req.body;
  const { filters } = req.body;
  const { query } = req.body;
  let find_query = {};
  if (typeof query !== 'undefined') {
    find_query = {
      $or: [
        { first_name: { $regex: query, $options: 'i' } },
        { last_name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
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
    .skip((page_num - 1) * number_of_customers)
    .limit(number_of_customers)
    .then((result) => {
      result = result.filter((customer) => customerInvalid(customer, filters));
      res.status(200).json({ success: true, result });
    })
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
  Customer.findById(customer_id)
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

export default router;

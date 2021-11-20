import { Customer, ICustomer } from '../models/customer.model';
import express from 'express';
import auth from '../middleware/auth';
import errorHandler from './error';

const number_of_customers = 10;

const router = express.Router();

router.get('/', async (req, res) => {
  const { filters } = req.body.filters;
  const { query } = req.body.query;
  Customer.find({})
    .limit(number_of_customers)
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
  const customer = await Customer.findByIdAndUpdate(
    id,
    { notes_write: notes },
    (err, result) => {
      if (err) {
        return errorHandler(res, patch_err_msg);
      }
      return res.status(200).json({ success: true, result });
    }
  );
});

router.get('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  Customer.findById(customer_id)
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

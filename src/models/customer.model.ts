import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ICustomer extends mongoose.Document {
  _id: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  country: string;
  membership_start: Date;
  membership_end: Date;
  notes_read: string;
  notes_write: string;
  workshops: [number];
  certifications: [number];
}

const CustomerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: false },
  country: { type: String, required: true },
  membership_start: { type: Date, required: true },
  membership_end: { type: Date, required: true },
  notes_read: { type: String, required: true },
  notes_write: { type: String, required: true },
  workshops: { type: [Number], required: true },
  certifications: { type: [Number], required: true },
});

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export { Customer, ICustomer };

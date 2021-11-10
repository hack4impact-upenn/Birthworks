import mongoose from 'mongoose';
import { EphemeralKeyInfo } from 'tls';

const { Schema } = mongoose;

interface IPersInf extends mongoose.Document {
  _id: string;
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  memberSinceDate: Date;
  memberUntilDate: Date;
}

const PersInfSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  memberSinceDate: { type: Date, required: true },
  memberUntilDate: { type: Date, required: true },
});

const PersInf = mongoose.model<IPersInf>('PersInf', PersInfSchema);

export { PersInf, IPersInf };

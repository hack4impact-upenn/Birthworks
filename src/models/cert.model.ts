import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ICert extends mongoose.Document {
  _id: string;
  customer_id: number;
  name: string;
  entry_date: Date;
  completion_date: Date;
  certificate: Date;
  recertification_dates: [Date];
  mentor: string;
}

const CertSchema = new Schema({
  name: { type: String, required: true },
  customer_id: { type: Number, required: true },
  entry_date: { type: Date, required: true },
  completion_date: { type: Date, required: true },
  certificate: { type: Date, required: true },
  recertification_dates: { type: [Date], required: true },
  mentor: { type: String, required: false },
});

const Cert = mongoose.model<ICert>('Cert', CertSchema);

export { Cert, ICert };

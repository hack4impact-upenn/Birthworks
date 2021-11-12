import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ICert extends mongoose.Document {
  _id: string;
  name: string;
  entryDate: Date;
  completionDate: Date;
  certificationDate: Date;
  recertificationDate: Date;
  trainer: string;
}

const CertSchema = new Schema({
  name: { type: String, required: true },
  entryDate: { type: Date, required: true },
  completionDate: { type: Date, required: true },
  certificationDate: { type: Date, required: true },
  recertificationDate: { type: Date, required: true },
  trainer: { type: String, required: true },
});

const Cert = mongoose.model<ICert>('Cert', CertSchema);

export { Cert, ICert };

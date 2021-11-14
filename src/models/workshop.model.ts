import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IWorkshop extends mongoose.Document {
  _id: number;
  customer_id: number;
  start_date: Date;
  end_date: Date;
  workshop_name: string;
  trainer: string;
}

const WorkshopSchema = new Schema({
  customer_id: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  workshop_name: { type: String, required: true },
  trainer: { type: String, required: false },
});

const Workshop = mongoose.model<IWorkshop>('Workshop', WorkshopSchema);

export { Workshop, IWorkshop };

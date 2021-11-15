import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IWorks extends mongoose.Document {
  _id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  mentor: string;
}

const WorksSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  mentor: { type: String, required: true },
});

const Works = mongoose.model<IWorks>('Works', WorksSchema);

export { Works, IWorks };

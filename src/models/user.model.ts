import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  type: string;
  refreshToken: string;
}

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  refreshToken: { type: String, required: false },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };

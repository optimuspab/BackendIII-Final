import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  sex: { type: String, required: true },
  birthDate: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userRole: { type: String, enum: ['user', 'admin'], required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pets' }],
  isPremium: { type: Boolean, required: true },
  occupation: { type: String, required: true },
  image: { type: String },
});

const petSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['dog', 'cat', 'bird', 'fish'], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

export const UsersModel = mongoose.model('Users', userSchema);
export const PetsModel = mongoose.model('Pets', petSchema);

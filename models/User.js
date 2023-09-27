import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  
  email: String,
  password: String,
  
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);

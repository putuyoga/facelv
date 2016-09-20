import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const faceSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  count: {
      yay: { type: Number, default: 0 },
      nay: { type: Number, default: 0 }
  }
});

export default mongoose.model('Face', faceSchema);

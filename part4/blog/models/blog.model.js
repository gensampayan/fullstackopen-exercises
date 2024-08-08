import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = model('Blog', blogSchema);
export default Blog;

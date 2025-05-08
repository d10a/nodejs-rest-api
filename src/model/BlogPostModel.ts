import mongoose from 'mongoose';
const { Schema } = mongoose;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlogPostSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{
    body: String,
    date: Date
  }],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

export const BlogPostModel = mongoose.model('blog_post', BlogPostSchema);
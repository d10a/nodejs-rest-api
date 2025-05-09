import express from 'express';
import 'dotenv/config'
// import ViteExpress from "vite-express"

const app = express()
const port = parseInt(process.env.PORT || '3000')
import mongoose from 'mongoose';
import { BlogPostModel } from './model/BlogPostModel';
import { TZDate } from '@date-fns/tz';

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// config from CMS
app.get('/config', (req, res) => {
    res.json({
        blogTitle: 'My Blog'
    })
})


app.get('/post', async (req, res) => {
    try {
        const blogPosts = await BlogPostModel.find()
        return res.status(200).json(blogPosts)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

})
app.post('/post', async (req, res) => {
    try {
        const newBlogPost = new BlogPostModel({
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
            comments: [],
            date: new TZDate(new Date(), process.env.TIMEZONE),
            hidden: req.body.hidden,
            meta: {
                votes: 0,
                favs: 0
            }
        });
        await newBlogPost.save()
        return res.status(201).json(newBlogPost.toJSON())
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }


})
app.put('/post/:id', async (req, res) => {
    try {
        const query = { _id: req.params.id }
        const toUpdate = req.body // TODO detecter les champs modifiés
        const blogPost = await BlogPostModel.findOneAndUpdate(query, toUpdate)
        if (!blogPost) {
            return res.status(404).json({
                message: 'Blog post not found'
            })
        }
        await blogPost.save()
        return res.status(200).json(blogPost)
    } catch (error) {
        return res.status(500).json({
            message: 'An error occured while updating the blog post'
        })
    }
})

app.delete('/post/:id', async (req, res) => {
    try {
        const query = { _id: req.params.id }
        const blogPost = await BlogPostModel.findOneAndDelete(query)
        if (!blogPost) {
            return res.status(404).json({
                message: 'Blog post not found'
            })
        }
        blogPost.save()
        return res.status(200).json(blogPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occured while deleting the blog post'
        })
    }
})

app.listen(port, async () => {
    // connect to MongoDB
    await mongoose.connect('mongodb+srv://dev:SAq5szspLvOBkG2P@cluster0.aum84i5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
})
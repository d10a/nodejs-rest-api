import { TZDate } from "@date-fns/tz";
import { ICreateBlogPostRepository } from "../../domain/event/create-blog-post/ICreateBlogPostRepository";
import { BlogPostModel } from "../model/BlogPostModel";

export class CreateBlogPostRepository implements ICreateBlogPostRepository {
    async saveBlogPost(request: any): Promise<any> {

        try {
            const newBlogPost = new BlogPostModel({
                title: request.title,
                author: request.author,
                body: request.body,
                comments: [],
                date: new TZDate(new Date(), process.env.TIMEZONE),
                hidden: request.hidden,
                meta: {
                    votes: 0,
                    favs: 0
                }
            });
            await newBlogPost.save()
            console.log('Blog post saved')
        } catch (error) {
            throw new Error(error.message);
        }

    }
}
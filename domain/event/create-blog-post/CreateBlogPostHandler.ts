import InvalidArgumentError from "../../../lib/errors/InvalidArgumentError";
import { ICreateBlogPostRepository } from "./ICreateBlogPostRepository";

type CreateBlogPostPayloadType = {
    title: string   // Title of the blog post       
}

export class CreateBlogPostHandler {
    private eventResult: any
    private repository: ICreateBlogPostRepository

    constructor(repository: ICreateBlogPostRepository,) {
        this.repository = repository
    }

    validatePayload(payload: CreateBlogPostPayloadType) {
        if (!payload.title) {
            throw new InvalidArgumentError("Title is required");
        }
        return this
    }

    async execute(payload: CreateBlogPostPayloadType): Promise<any> {
        try {
            this.validatePayload(payload)
            console.log(payload)
            await this.repository.saveBlogPost(payload)
            this.eventResult = { success: true, message: "Blog post created successfully" }
        } catch (error) {
            this.eventResult = {
                success: false,
                message: "Error creating blog post"
            }
            throw new Error(`Error creating blog post: ${error}`);
        }
    }

    getResult() {
        return this.eventResult
    }
}
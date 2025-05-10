export interface ICreateBlogPostRepository {
    saveBlogPost(request: any): Promise<any>
}
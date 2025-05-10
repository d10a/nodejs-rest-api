import { Final } from "../../lib/decorators/FinalDecorator"
import { Immutable } from "../../lib/decorators/ImmutableDecorator"

type PostComment = {
    body: string
    date: Date
}

type PostMeta = {
    votes: number
    favs: number
}

export type Post = {
    title: string
    author: string
    body: string
    comments: PostComment[],
    date: Date,
    hidden: boolean,
    meta: PostMeta
}

@Final
@Immutable
export class BlogPost {
    private post: Post

    constructor(post: Post) {
        this.post = post
    }
}
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../lib/db";

export interface CreatePostPayload {
    title: string
    content: string
    authorId: string
}

class PostService {
    public static getAllPosts() {
        return prismaClient.post.findMany();
    }

    public static getPostById(id: number) {
        return prismaClient.post.findUnique({where: { id }})
    }

    public static getPostsOdAuthor(authorId: string) {
        return prismaClient.post.findMany({
            where: { authorId },
        });
    }

    public static createPost(payload: CreatePostPayload) {
        const {title, content, authorId}  = payload

        return prismaClient.post.create({
            data: {
                title,
                content,
                author: {
                    connect: { id: authorId },
                },
            }
        })
    }
}

export default PostService
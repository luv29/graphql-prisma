import { Post } from "@prisma/client";
import PostService, { CreatePostPayload } from "../../services/post";
import UserService from "../../services/user";

const post = {
    author: async (post: Post) => {
        return await UserService.getUserById(post.authorId);
    }
}

const queries = {
    posts: async () => {
        return await PostService.getAllPosts();
    },
    post: async (_parent: Post, payload: {id: number}) => {
        return await PostService.getPostById(payload.id);
    }
}

const mutations = {
    createPost: async (_parent: Post, payload: CreatePostPayload) => {
        const post = await PostService.createPost(payload)
        return post.id;
    }
}

export const resolvers = { queries, mutations, post };
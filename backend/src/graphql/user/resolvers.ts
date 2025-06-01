import { User } from "@prisma/client";
import UserService, { 
    CreateUserPayload, 
    GetUserTokenPayload 
} from "../../services/user";
import PostService from "../../services/post";

const user = {
    posts: async (user: User) => {
        return await PostService.getPostsOdAuthor(user.id)
    }
}

const queries = {
    getUserToken: async (_parent: User, payload: GetUserTokenPayload) => {
        const token = await UserService.getUserToken(payload)
        return token
    },
    getCurrentLoggedInUser: async (_parent: User, __: any, context: any) => {
        if(context && context.user) {
            const user = await UserService.getUserById(context.user.id)
            return user;
        }
        throw new Error("User not logged in.")
    },
    users: async () => {
        return await UserService.getAllUsers();
    },
    user: async(_parent: User, payload: {id: string}) => {
        return await UserService.getUserById(payload.id)
    }
}

const mutations = {
    createUser: async (_parent: User, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
}

export const resolvers = { queries, mutations, user };
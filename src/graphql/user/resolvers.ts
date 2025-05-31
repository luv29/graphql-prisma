import UserService, { 
    CreateUserPayload, 
    GetUserTokenPayload 
} from "../../services/user";

const user = {

}

const queries = {
    getUserToken: async (_: any, payload: GetUserTokenPayload) => {
        const token = await UserService.getUserToken(payload)
        return token
    },
    getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
        if(context && context.user) {
            const user = await UserService.getUserById(context.user.id)
            return user;
        }
        throw new Error("User not logged in.")
    }
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
}

export const resolvers = { queries, mutations, user };
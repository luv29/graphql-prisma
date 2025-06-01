import { ApolloServer } from '@apollo/server';
import { User } from './user';
import { Post } from './post';

export async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs:`
            ${User.typedefs}
            ${Post.typedefs}
            
            type Query {
                ${User.queries}
                ${Post.queries}
            }
            type Mutation {
                ${User.mutations}
                ${Post.mutations}
            }
        `,
        resolvers: {
            User: User.resolvers.user,
            Post: Post.resolvers.post,
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations,
            },
        },
    });

    await gqlServer.start();

    return gqlServer;
}
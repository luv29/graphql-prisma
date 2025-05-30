import { ApolloServer } from '@apollo/server';
import { User } from './user';


export async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query {
                ${User.queries}
                hello: String
                say(name: String): String
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                hello: () => 'helo from graphql server',
                say: (_, {name}: {name: string}) => `hey ${name}`
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        },
    });

    await gqlServer.start();

    return gqlServer;
}
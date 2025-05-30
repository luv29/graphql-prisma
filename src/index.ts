import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import { prismaClient } from './lib/db';

async function init() {
    const app = express()
    const port = Number(process.env.PORT) || 8000

    app.use(express.json())
    
    const server = new ApolloServer({
        typeDefs:`
            type Query {
                hello: String
                say(name: String): String
            }
            type Mutation {
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'helo from graphql server',
                say: (_, {name}: {name: string}) => `hey ${name}`
            },
            Mutation: {
                createUser: async (_, {
                    firstName, 
                    lastName, 
                    email, 
                    password
                }: {
                    firstName: string;
                    lastName: string;
                    email: string;
                    password: string;
                }) => {
                    await prismaClient.user.create({
                        data : {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: "random-salt",
                        }
                    });

                    return true;
                }
            }
        },
    });

    await server.start();

    app.get('/', (req, res) => {
        res.json({message: "Server is running"})
    })

    app.use(
        '/graphql',
        expressMiddleware(server),
    );

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

init()
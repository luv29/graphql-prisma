import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';

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
        `,
        resolvers: {
            Query: {
                hello: () => 'helo from graphql server',
                say: (_, {name}: {name: string}) => `hey ${name}`
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
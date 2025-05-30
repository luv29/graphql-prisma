import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import { createApolloGraphqlServer } from './graphql';

async function init() {
    const app = express()
    const port = Number(process.env.PORT) || 8000

    app.use(express.json())

    app.get('/', (req, res) => {
        res.json({message: "Server is running"})
    })

    app.use(
        '/graphql',
        expressMiddleware(await createApolloGraphqlServer()),
    );

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

init()
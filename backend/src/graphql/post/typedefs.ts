export const typedefs = `#graphql
    type Post {
        id: Int!
        createdAt: String!
        updatedAt: String!
        published: Boolean!
        title: String!
        author: User!
    }
`;
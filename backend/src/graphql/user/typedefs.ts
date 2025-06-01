export const typedefs = `#graphql
    enum Role {
        USER
        ADMIN
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String
        profileImageURL: String
        email: String!
        createdAt: String!
        role: Role!
        posts: [Post!]!
    }
`;
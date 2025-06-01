export const queries = `#graphql
    getUserToken(email: String, password: String): String
    getCurrentLoggedInUser: User
    users: [User!]!
    user(id: ID!): User
`;
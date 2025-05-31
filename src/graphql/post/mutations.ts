export const mutations = `#graphql
 createPost(
        title: String!
        content: String!
        authorId: ID!
    ): Int!
`;
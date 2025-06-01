import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            published
            author {
                firstName
                email
            }
        }
    }
`;

const PostList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            <ul className="space-y-1">
                {data.posts.map((post: any) => (
                    <li key={post.id} className="border p-2 rounded">
                        <strong>{post.title}</strong> by {post.author.firstName} ({post.author.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;

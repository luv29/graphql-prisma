import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';

const CREATE_POST = gql`
    mutation Mutation(
        $title: String!, 
        $content: String!, 
        $authorId: ID!
    ) {
        createPost(
            title: $title, 
            content: $content, 
            authorId: $authorId
        )
    }
`;

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            firstName
        }
    }
`;

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { data } = useQuery(GET_USERS);
    const [createPost] = useMutation(CREATE_POST);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPost({ 
                variables: { 
                    title, 
                    content, 
                    authorId 
                } 
            });
            
            setTitle('');
            setContent('');
            setAuthorId('');
            toast.success('Post created successfully!');
        } catch (err: any) {
            toast.error(err.message || 'Failed to create post.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Create Post</h3>
            <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Title" 
                className="block mb-2 border px-2 py-1 w-full" 
            />

            <textarea 
                value={content} 
                onChange={e => 
                setContent(e.target.value)} 
                placeholder="Content" 
                className="block mb-2 border px-2 py-1 w-full" 
            />

            <select 
                value={authorId} 
                onChange={e => setAuthorId(e.target.value)} 
                className="block mb-2 border px-2 py-1 w-full"
            >
                <option value="">Select Author</option>
                {data?.users.map((user: any) => (
                    <option key={user.id} value={user.id}>{user.firstName}</option>
                ))}
            </select>
            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Create</button>
        </form>
    );
};

export default CreatePost;
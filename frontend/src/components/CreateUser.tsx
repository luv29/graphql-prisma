import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
    mutation Mutation(
        $firstName: String!, 
        $lastName: String!, 
        $email: String!, 
        $password: String!) {
        createUser(
            firstName: $firstName, 
            lastName: $lastName, 
            email: $email, 
            password: $password
        )
    }
`;

const CreateUser: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUser] = useMutation(CREATE_USER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createUser({ 
            variables: { 
                firstName, 
                lastName, 
                email, 
                password 
            } 
        });

        setFirstName(''); 
        setLastName(''); 
        setEmail(''); 
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Create User</h3>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" className="block mb-2 border px-2 py-1 w-full" />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" className="block mb-2 border px-2 py-1 w-full" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="block mb-2 border px-2 py-1 w-full" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="block mb-2 border px-2 py-1 w-full" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Create</button>
        </form>
    );
};

export default CreateUser;
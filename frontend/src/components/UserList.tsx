import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
    query GetUsers {
        users {
            lastName
            firstName
            id
            email
        }
    }
`;

const UserList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <ul className="space-y-1">
                {data.users.map((user: any) => (
                    <li key={user.id} className="border p-2 rounded">
                        {user.firstName} {user.lastName} - {user.email} {`(${user.id})`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
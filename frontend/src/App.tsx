import React from 'react';
import UserList from './components/UserList';
import PostList from './components/PostList';
import CreateUser from './components/CreateUser';
import CreatePost from './components/CreatePost';

const App: React.FC = () => {
    return (
        <div className="p-4 font-sans">
            <h1 className="text-2xl font-bold mb-4">GraphQL Dashboard</h1>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <CreateUser />
                <CreatePost />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <UserList />
                <PostList />
            </div>
        </div>
    );
};

export default App;
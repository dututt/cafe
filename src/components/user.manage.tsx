import { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetch('/api/external')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users?.map((user: IUser) => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default ManageUsers;

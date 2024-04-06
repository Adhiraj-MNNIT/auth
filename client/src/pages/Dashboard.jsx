import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Dashboard() {
    const { user, logoutUser } = useContext(UserContext);

    const handleLogout = () => {
        // Call logoutUser function from the context
        logoutUser();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <h1> Hi {user.name}!</h1>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

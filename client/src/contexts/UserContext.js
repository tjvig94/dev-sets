import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        const parsedUser = JSON.parse(localStorage.getItem('user'));
        setUser(parsedUser);
    }
    const logout = (user) => {
        localStorage.removeItem('user')
        setUser();
    }

    useEffect(() => {
        localStorage.getItem('user');
        const parsedUser = JSON.parse(localStorage.getItem('user'));
        setUser(parsedUser);
    }, []);

    return(
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

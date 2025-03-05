// All functions we need to interact with the db
import React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { BASE_URL } from '../../config';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    // States to store user and records
    const [users, setUsers] = useState([]);
    const [records, setRecords] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const fetchUsers = useCallback(async() => {
        try {
            const result = await fetch(`${BASE_URL}users`);
            const data = await result.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching Users',error);
        }
       
    },[]);

    // function to fetch user details by email
    const fetchUserByEmail = useCallback(async(email) => {
        try {
            const result = await fetch(`${BASE_URL}users?email=${email}`);
            const data = await result.json();
            if (data.length === 0) {
                console.error('No user found with that email');
                setCurrentUser(data[0]);
                return;
            }
            
        } catch (error) {
            console.error('Error fetching User by email', error);
        }
    },[]);

    // crete user details
    const createUser = useCallback(async(user) => {
        try {
            const result = await fetch(`${BASE_URL}users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const newUser = await result.json();
            setUsers((prevUser) => [...prevUser, newUsers[0]]);
        } catch (error) {
            console.error('Error creating User', error);
            return null;
        }
    },[]);

    // function to fetch User records
    const fetchUserRecords = useCallback(async(userEmail) => {
        try {
            const result = await fetch(`${BASE_URL}records`);
            const data = await result.json();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching User Records', error);
        }
    },[]);

    // function to create user records
    const createRecord = useCallback(async(record) => {
        try {
            const result = await fetch(`${BASE_URL}records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(record)
            });
            const newRecord = await result.json();
            setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
            return newRecord[0];
        } catch (error) {
            console.error('Error creating Record', error);
            return null;
        }
    },[]);
    // Update record with new records
    const updateRecord = useCallback(async(record) => {
        try {
            const result = await fetch(`${BASE_URL}records/${record.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(record)
            });
            const updatedRecord = await result.json();
            setRecords((prevRecords) => prevRecords.map((r) => r.id === updatedRecord.id? updatedRecord : r));
            return updatedRecord;
        } catch (error) {
            console.error('Error updating Record', error);
            return null;
        }
    }, []);
    // delete record
    // const deleteRecord = useCallback(async(recordId) => {
    //     try {
    //         const result = await fetch(`${BASE_URL}records/${recordId}`, {
    //             method: 'DELETE'
    //         });
    //         if (result.status === 204) {
    //             setRecords((prevRecords) => prevRecords.filter((r) => r.id !== recordId));
    //         }
    //     } catch (error) {
    //         console.error('Error deleting Record', error);
    //     }
    // }, []);

    return (
        <StateContext.Provider value={{
            users,
            records,
            currentUser,
            fetchUsers,
            fetchUserByEmail,
            createUser,
            fetchUserRecords,
            createRecord,
            updateRecord,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the state context
export const useStateContext = () => {
    return useContext(StateContext);
};
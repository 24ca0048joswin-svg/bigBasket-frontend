import AdminNav from "./AdminNav";
import UserRow from "./UserRow";
import './ManageUsers.css';
import { useState, useEffect } from "react";
import axios from 'axios';

function ManageUsers() {
    const [users, setUsers] = useState([]);

    async function fetchData() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/getUsers`);
            const data = res.data;
            // setFetchSuccess(true);
            setUsers([]);
            setUsers([...data.users])
        } catch (err) {
            console.log(`An error occured: ${err}`)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <AdminNav />
            <div className="display-center margin-top">
                <table>
                    <thead>
                        <tr>
                            <td>User Name</td>
                            <td>Email</td>
                            <td colSpan="2">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => ((
                            <UserRow email={user.email} username={user.username} id={user._id} key={index} fetchData={fetchData}/>
                        )))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageUsers;
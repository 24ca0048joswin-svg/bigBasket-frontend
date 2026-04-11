import { Link } from "react-router-dom";
import axios from 'axios';

function UserRow({ username, email, id, fetchData }) {
    async function deleteUser() {
        try {
            const res = await axios.post('http://localhost:3000/admin/deleteUser', { 'id': id }, {});
            if (res) {
                fetchData();
            }
        }catch(err){
            console.log(`An error occured: ${err}`)
        }
    }

    return (
        <>
            <tr>
                <td>{username}</td>
                <td>{email}</td>
                <td>
                    <Link to={`/editUserNameOrEmail/${id}`} className="add-btn add-btn-margin link-margin">Edit</Link>
                    <button className="add-btn add-btn-margin" onClick={deleteUser}>Delete</button>
                </td>
            </tr>
        </>
    );
}

export default UserRow;
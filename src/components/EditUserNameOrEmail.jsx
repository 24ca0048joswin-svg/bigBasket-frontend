import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditUsers() {
    const { userId } = useParams();
    const [uname, setUname] = useState('');
    const [mail, setMail] = useState('');
    const navigate = useNavigate();

    async function fetchData() {
        try {
            const res = await axios.post('http://localhost:3000/admin/getOneUser', { id: userId });
            const user = res.data.user;
            setUname(user.username);
            setMail(user.email);
        } catch (err) {
            console.log(`An error occured: ${err}`)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function handleSubmit() {

        if (uname == '') {
            addMessage('Please provide the username');
        }

        if (mail == '') {
            addMessage('Please provide the email');
        }

        try {
            const res = await axios.post('http://localhost:3000/admin/updateNameAndMail',
                {
                    'id': userId,
                    'username': uname,
                    'email': mail,
                }, {});
            const data = res.data;

            if (data.status == 'success') {
                alert("Changes updated successfully");
                navigate('/manageUsers')
            } else {
                alert("Unable to make changes");
            }
        } catch (err) {
            console.log(`An error occured: ${err}`);
        }
    }

    return (
        <>
            <div className='center-modal-no-height'>
                <div className="modal-content">
                    <div className="right-panel">
                        <h2 className='center-text'>
                            Edit User
                        </h2>

                        <label>
                            Change username:
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            className="input-field"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                        />

                        <label>
                            Change email:
                        </label>

                        <input
                            type="email"
                            placeholder="Change email"
                            className="input-field"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />

                        <input type="button" value="Submit" className="continue-btn" onClick={handleSubmit} />

                    </div>
                </div>
            </div >
        </>
    );
}

export default EditUsers;
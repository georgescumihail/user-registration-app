import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/serverData";

interface User {
    email: string;
    name: string;
}

const Details = () => {

    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${serverUrl}/userdetails`, {
            'method': 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                token
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.email) {
                setUser(data);
            }
            else {
                navigate('/login');
            }
        })
        .catch(() => {
            navigate('/login');
        })
    })
    return <div>
                {user ? (
                    <div>
                <div><span>Email:</span>{user.email}<span></span></div>
                <div><span>Name:</span><span>{user.name}</span></div>
                </div>
                ) : <div></div>
                }
            </div>
}

export default Details;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/serverData";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const onSignupClick = () => {
        fetch(`${serverUrl}/signup`, {
            'method': 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email, password, name
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token);
                navigate('/details');
            }
        })
    }

    return <div className='main-form'>
        <div className='form-row'><span>Email:</span><input type='text' onChange={e => setEmail(e.target.value)} /></div>
        <div className='form-row'><span>Name:</span><input type='text' onChange={e => setName(e.target.value)} /></div>
        <div className='form-row'><span>Password:</span><input type='password' onChange={e => setPassword(e.target.value)} /></div>
        <div className='form-row'><button onClick={() => onSignupClick()}> Sign Up</button></div>
    </div>
}

export default SignUp;
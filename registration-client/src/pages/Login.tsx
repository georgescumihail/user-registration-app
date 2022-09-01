import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/serverData";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onLoginClick = () => {
        fetch(`${serverUrl}/login`, {
            'method': 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email, password
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
        <div className='form-row'><span>Password:</span><input type='password' onChange={e => setPassword(e.target.value)} /></div>
        <div className='form-row'><button onClick={() => onLoginClick()}> Login</button></div>
        <div>No account? Sign up <Link to='/signup'>Here</Link></div>
    </div>
}

export default Login;
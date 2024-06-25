import { useState } from 'react';
import axios from 'axios';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { BottomWarning } from '../components/BottomWarning';
import { NeonButton } from '../components/NeonButton';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/login', {
                email,
                password,
            });
            console.log('User authenticated:', response.data);
            localStorage.setItem('token', response.data.token);
            setEmail('');
            setPassword('');
            setError('');
            navigate('/home'); // Redirect user to a dashboard or home page
        } catch (error) {
            setError('Invalid email or password');
        }
    };
    return (
        <div className='bg-black w-full h-screen flex justify-center items-center'>
            <div className="flex py-2 px-4 flex-col justify-center items-center w-5/12 text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                <Heading label={"Sign In"}></Heading>
                <Subheading label={"Enter your credentials to login"}></Subheading>
                {error && <p className="text-red-500">{error}</p>}
                <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                    <InputBox
                        placeholder={"Enter your email"}
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></InputBox>
                    <InputBox
                        placeholder={"Enter your password"}
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></InputBox>
                    <div className='m-2'></div>
                    <NeonButton text={"Sign In"} type="submit"></NeonButton>
                </form>
                <div className='m-1'></div>
                <BottomWarning label={"If you don't have an account"} buttonText={"Sign Up here"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    );
}

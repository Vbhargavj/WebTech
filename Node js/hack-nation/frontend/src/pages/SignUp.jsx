import axios from 'axios';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { BottomWarning } from '../components/BottomWarning';
import { NeonButton } from '../components/NeonButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                name,
                email,
                password,
                confirmpassword
            });
            console.log('User authenticated:', response.data);
            localStorage.setItem('token', response.data.token);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmpassword('');
            setError('');
            navigate('/home')
        } catch (error) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 409) {
                setError('Email already exists. Please sign in.');
            } else {
                setError('Invalid email or password');
            }
        }
    };

    return (
        <div className='bg-black w-full h-screen flex justify-center items-center'>
            <div className="flex py-2 px-4 flex-col justify-center items-center w-5/12 text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                <Heading label={"Sign Up"}></Heading>
                <Subheading label={"Enter your information to create an account"}></Subheading>
                {error && <p className="text-red-500">{error}</p>}
                <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                    <InputBox
                        placeholder={"Enter your name"}
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></InputBox>
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
                    <InputBox
                        placeholder={"Re-enter your password"}
                        label="Re-enter Password"
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    ></InputBox>
                    <div className='m-2'></div>
                    <NeonButton text={"Sign Up"} type="submit"></NeonButton>
                </form>
                <div className='m-1'></div>
                <BottomWarning label={"If you already have an account"} buttonText={"Sign In here"} to={"/login"}></BottomWarning>
            </div>
        </div>
    );
}

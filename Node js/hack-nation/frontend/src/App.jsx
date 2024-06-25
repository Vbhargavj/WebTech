import {  useEffect, useContext } from 'react';
import { AddDiscussion } from './pages/AddDiscussion';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/SingIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext'

import { useNavigate } from 'react-router-dom';
import { ForumPage } from './pages/ForumPage';

axios.defaults.withCredentials = true

function App() {


    return (
        // <ForumPage></ForumPage>
        
        <Routes>
            <Route path="/" element={<IsLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path="/add-discussion" element={<AddDiscussion />} />
            <Route path="/forum/:id" element={< ForumPage/>} />


        </Routes>
    );
}

export default App;



const IsLogin = () => {
    const authState = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/forum/forums').then(response => {
            console.log(response);
            authState.setAuth(true)
            navigate('home')
        }).catch(error => {
            console.log("fuck you")
            navigate('/login')
        })
    })

};



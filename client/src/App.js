import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails.jsx';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <GoogleOAuthProvider clientId="741594874203-r3tftovvv3pvd8v9sujbnaq637chi7ab.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxwidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/posts" />} />
                        <Route path="/posts" exact element={<Home />}/>
                        <Route path="/posts/search" exact element={<Home />}/>
                        <Route path="/posts/:id" exact element={<PostDetails />}/>
                        <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate to="/posts" /> )}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
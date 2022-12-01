import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';

const App = () => {

    return (
        <GoogleOAuthProvider clientId="741594874203-r3tftovvv3pvd8v9sujbnaq637chi7ab.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Home />}/>
                        <Route path="/auth" exact element={<Auth />}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
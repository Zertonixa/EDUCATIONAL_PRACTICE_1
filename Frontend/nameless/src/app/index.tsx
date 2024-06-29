import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Layout } from '../shared/Layout.tsx';
import { UpdateDB } from '../pages/UpdateDB.tsx'



export const Pages: React.FC = () => {

    return (

        <ChakraProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/updatedb" element={<UpdateDB/>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ChakraProvider>

    )
    
}
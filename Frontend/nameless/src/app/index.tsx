import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Layout } from '../components/Layout.tsx';
import { UpdateDB } from '../pages/UpdateDB.tsx'
import { Vacancies } from '../pages/Vacancies.tsx';



export const Pages: React.FC = () => {

    return (

        <ChakraProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="" element={<UpdateDB/>} />
                        <Route path="/vacancies" element={<Vacancies/>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ChakraProvider>

    )
    
}
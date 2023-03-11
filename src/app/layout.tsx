'use client'
import '../../styles/theme.scss'
import Authprovider from './Authprovider';
import NavBar from "@/partials/NavBar";
import Footer from "@/app/_components/Footer";
import {ReactNode} from 'react';
import {SSRProvider} from "react-bootstrap";


function RootLayout({children}: { children: ReactNode }) {
    return (
        <SSRProvider>
            <html>
                <body className="bg-dark">
                    <Authprovider>
                        <main className="page-wrapper">
                            <NavBar/>
                            {children}
                        </main>
                        <Footer/>
                    </Authprovider>
                </body>
            </html>
         </SSRProvider>
    )
}

export default RootLayout
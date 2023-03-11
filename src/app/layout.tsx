import '../../styles/theme.scss'
import '../../styles/theme.scss'
import AuthProvider from './AuthProvider';
import NavBar from "@/partials/NavBar";
import Footer from "@/app/_components/Footer";
import {ReactNode} from 'react';
import {SSRProvider} from "react-bootstrap";


function RootLayout({children}: { children: ReactNode }) {
    return (
            <html>
                <body className="bg-dark">
                    <AuthProvider>
                        <main className="page-wrapper">
                            <NavBar/>
                            {children}
                        </main>
                        <Footer/>
                    </AuthProvider>
                </body>
            </html>
    )
}

export default RootLayout
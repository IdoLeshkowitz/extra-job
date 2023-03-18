import '../../styles/theme.scss'
import '../../styles/theme.scss'
import AuthProvider from './AuthProvider';
import MainLayoutNavBar from "@/app/components/MainLayoutNavBar";
import Footer from "@/components/footer/Footer";
import {ReactNode} from 'react';
import {SSRProvider} from "react-bootstrap";


function RootLayout({children}: { children: ReactNode }) {
    return (
            <html>
                <body className="bg-dark">
                    <AuthProvider>
                        <main className="page-wrapper">
                            <MainLayoutNavBar/>
                            {children}
                        </main>
                        <Footer/>
                    </AuthProvider>
                </body>
            </html>
    )
}

export default RootLayout
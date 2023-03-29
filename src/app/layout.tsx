import '../../styles/theme.scss'
import '../../styles/theme.scss'
import AuthProvider from './AuthProvider';
import MainLayoutNavBar from "@/app/components/MainLayoutNavBar";
import Footer from "@/components/footer/Footer";
import {ReactNode} from 'react';
import {SSRProvider} from "react-bootstrap";

//"linear-gradient(#e66465, #9198e5)"
function RootLayout({children}: { children: ReactNode }) {
    return (
            <html>
                <body >
                    <AuthProvider>
                        <main className="page-wrapper bg-gradient" style={{direction:'rtl'}}>
                            <MainLayoutNavBar/>
                            {children}
                        </main>
                        {/*<Footer/>*/}
                    </AuthProvider>
                </body>
            </html>
    )
}

export default RootLayout
import '../../styles/theme.scss'
import Provider from './provider';
import NavBar from "@/partials/NavBar";
import Footer from "@/app/_components/Footer";
import {ReactNode} from 'react';
import {SSRProvider} from "react-bootstrap";


function RootLayout({children}: { children: ReactNode }) {
    return (
            <html>
                <body className="bg-dark">
                    <Provider>
                        <main className="page-wrapper">
                            <NavBar/>
                            {children}
                        </main>
                        <Footer/>
                    </Provider>
                </body>
            </html>
    )
}

export default RootLayout
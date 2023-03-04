'use client'
import '../../styles/theme.scss'
import Provider from './provider';
import NavBar from "@/partials/NavBar";
import Footer from "@/components/Footer";
import {ReactNode, useState} from 'react';
import SignInModalLight from "@/partials/SignInModalLight";
enum ModalState {
    SignIn,
    SignUp,
    InActive
}
function RootLayout({children}: { children: ReactNode }) {
    const [modalState, setModalState] = useState<ModalState>(ModalState.InActive)
    return (
        <html>
            <body>
                <Provider>
                    <main className="page-wrapper">
                        {/* Sign in modal */}
                        {modalState === ModalState.SignIn && <SignInModalLight
                            centered
                            size='lg'
                            pillButtons
                            show={true}
                            onHide={() => setModalState(ModalState.InActive)}
                            onSwap={() => setModalState(ModalState.SignUp)}
                        />}
                        {/*<NavBar/>*/}
                        {children}
                    </main>
                    <Footer/>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
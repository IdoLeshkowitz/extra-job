'use client';
import {useState} from 'react'
import SignInModalLight from '@/partials/SignInModalLight'
import {SSRProvider} from "react-bootstrap";
import NavBar from "@/partials/NavBar";
import {Session} from "next-auth";
import Footer from "@/components/Footer";

enum ModalState {
    SignIn,
    SignUp,
    InActive
}

interface JobBoardPageLayoutProps {
    children: React.ReactNode
    session: Session | null
}

const JobBoardPageLayout = ({children, session}: JobBoardPageLayoutProps) => {
    const [modalState, setModalState] = useState<ModalState>(ModalState.InActive)
    const handleSignInToUp = (e: any) => {
        e.preventDefault()
    }
    const handleSignUpToIn = (e: any) => {
        e.preventDefault()
    }


    return (
        <SSRProvider>
            <div>
                {/* Sign in modal */}
                {modalState ===  ModalState.SignIn && <SignInModalLight
                    centered
                    size='lg'
                    pillButtons
                    show={true}
                    onHide={() => setModalState(ModalState.InActive)}
                    onSwap={() => setModalState(ModalState.SignUp)}
                />}

                {/*PAGE CONTENT*/}
                {children}
                <NavBar session = {session} openSignInModal={()=>setModalState(ModalState.SignIn)}/>

                {/* Footer */}
                <Footer/>
            </div>
        </SSRProvider>
    )
}

export default JobBoardPageLayout

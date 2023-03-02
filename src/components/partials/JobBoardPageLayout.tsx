'use client';
import {useState} from 'react'
import NavBar from "@/partials/NavBar";
import Footer from "@/components/Footer";
import SignInModalLight from "@/partials//SignInModalLight";

enum ModalState {
    SignIn,
    SignUp,
    InActive
}

interface JobBoardPageLayoutProps {
    children: React.ReactNode
}

const JobBoardPageLayout = ({children}: JobBoardPageLayoutProps) => {
    const [modalState, setModalState] = useState<ModalState>(ModalState.InActive)
    const handleSignInToUp = (e: any) => {
        e.preventDefault()
    }
    const handleSignUpToIn = (e: any) => {
        e.preventDefault()
    }


    return (
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

            {/*PAGE CONTENT*/}
            {children}


            {/* Footer */}

        </main>
    )
}

export default JobBoardPageLayout

'use client'
import '../../styles/theme.scss'
import Provider from './provider';
import NavBar from "@/partials/NavBar";
import Footer from "@/components/Footer";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <body>
                <Provider>
                    <main className="page-wrapper">
                        <NavBar openSignInModal={()=>{}}/>
                        {children}
                        <Footer/>
                    </main>
                </Provider>
            </body>
        </html>
    )
}

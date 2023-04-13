import '../../styles/theme.scss'
import MySessionProvider from './mySessionProvider';
import MainLayoutNavBar from "@/app/components/MainLayoutNavBar";
import {ReactNode} from 'react';
import MyQueryClientProvider from "@/app/myQueryClientProvider";


function RootLayout({children}: { children: ReactNode }) {
    return (
        <html>
            <body>
                <MySessionProvider>
                    <MyQueryClientProvider>
                        <main className="page-wrapper bg-gradient" style={{direction: 'rtl'}}>
                            <MainLayoutNavBar/>
                            {children}
                        </main>
                    </MyQueryClientProvider>
                </MySessionProvider>
            </body>
        </html>
    )
}

export default RootLayout
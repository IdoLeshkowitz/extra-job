'use client'
import '../../styles/theme.scss'
import ScrollTopButton from '../components/ScrollTopButton'
import SSRProvider from 'react-bootstrap/esm/SSRProvider'
import JobBoardPageLayout from "@/partials/JobBoardPageLayout";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="he" dir="rtl">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <SSRProvider>
                <body>
                    <JobBoardPageLayout>
                        {children}
                    </JobBoardPageLayout>
                </body>

                <ScrollTopButton
                    showOffset={600}
                    duration={800}
                    easing='easeInOutQuart'
                    tooltip='Top'
                />
            </SSRProvider>

        </html>
    )
}

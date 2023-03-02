import '../../styles/theme.scss'
import JobBoardPageLayout from "@/partials/JobBoardPageLayout";
import Provider from './provider';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {SSRProvider} from "react-bootstrap";

export default async function RootLayout({
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
                {/*hhh*/}
                    <Provider>
                        <JobBoardPageLayout session={await getServerSession(authOptions)}>
                            {children}
                        </JobBoardPageLayout>
                    </Provider>
            </body>
        </html>
    )
}

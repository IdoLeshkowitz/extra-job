import {ReactNode} from "react";
import {SSRProvider} from "react-bootstrap";
import JobBoardPageLayout from "@/partials/JobBoardPageLayout";

export default function MainLayout({children}: { children: ReactNode }) {
    return (
        <html>
            <body>
                    <JobBoardPageLayout>
                        {children}
                    </JobBoardPageLayout>
            </body>
        </html>
    )
}
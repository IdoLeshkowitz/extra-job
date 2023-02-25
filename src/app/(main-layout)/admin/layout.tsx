import {ReactNode} from "react";
import JobBoardAccountLayout from "@/partials/JobBoardAccountLayout";


export default function MainLayout({children}: { children: ReactNode }) {
    return (
        <html>
            <body>
          <JobBoardAccountLayout>
              {children}
          </JobBoardAccountLayout>
            </body>
        </html>
    )
}
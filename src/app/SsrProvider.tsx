'use client'
export default function SsrProvider({children}: { children: React.ReactNode }) {
    return (
        <SsrProvider>
            {children}
        </SsrProvider>
    )
}
'use client'
import { Metadata } from "next"
import { Container } from "react-bootstrap"

export const metadata: Metadata = {
    title: "Admin"
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}
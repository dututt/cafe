import { Metadata } from "next"
import { Container } from "react-bootstrap"

export const metadata: Metadata = {
    title: "Orders status"
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}
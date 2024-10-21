// import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import AppFooter from "../components/app.footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import NavBarApp from "./admin/navbar";
import { Container } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Container>
          <ClerkProvider>
            <NavBarApp />
          </ClerkProvider>
          <>{children}</>
          <AppFooter />
          <ToastContainer />
        </Container>
      </body>
    </html>
  );
}

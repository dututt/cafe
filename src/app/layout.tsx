"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import AppFooter from "../components/app.footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import NavBarApp from "./admin/navbar";
import MenuOffCanvas from "./admin/menu.offcanvas";
import { Container } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <NavBarApp />
          <MenuOffCanvas />
        </ClerkProvider>
        <Container>{children}</Container>
        <AppFooter />
        <ToastContainer />
      </body>
    </html>
  );
}

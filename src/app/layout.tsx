'use client'
import { Container } from 'react-bootstrap'
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '../components/app.header'
import AppFooter from '../components/app.footer'
import NavBarApp from '../components/navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarApp />
        <AppHeader />
        <Container>
          {children}
        </Container>
        <AppFooter />
        <ToastContainer />
      </body>
    </html>
  )
}

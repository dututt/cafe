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
import useCustomHook from '@/components/useCustomHook';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const useCustom = useCustomHook()
  const [role, setRole] = useState<boolean>(false)

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarApp useCustom={useCustom} setRole={setRole} />
        <AppHeader useCustom={useCustom} role={role} />
        <Container>
          {children}
        </Container>
        <AppFooter />
        <ToastContainer />
      </body>
    </html>
  )
}

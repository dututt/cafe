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
  const [, handleActiveTab] = useState<boolean>(false)

  function refreshRole() {
    return useCustom.user.checkRole
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarApp useCustom={useCustom} refreshRole={refreshRole} />
        <AppHeader useCustom={useCustom} refreshRole={refreshRole} />
        <Container>
          {children}
        </Container>
        <AppFooter />
        <ToastContainer />
      </body>
    </html>
  )
}

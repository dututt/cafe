"use client";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Register from "../../components/register";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

function NavBarApp() {
  const { user } = useClerk();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleClose = () => setShowLogin(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Cafe 290</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user?.primaryEmailAddress?.emailAddress ?? (
              <Link href="/login">Login</Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <LoginCard refreshChangeText={refreshChangeText} /> */}
          <Navbar.Brand onClick={handleShowRegister} href="#">
            Đăng Ký
          </Navbar.Brand>
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavBarApp;

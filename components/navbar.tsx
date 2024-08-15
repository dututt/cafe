import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Link from 'next/link';
import { Modal, Button } from 'react-bootstrap';
import LoginCard from './login.card';
import Register from './register';

function NavBarApp() {
    const [show, setShow] = useState(false);
    const [showR, setShowR] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseR = () => setShowR(false);
    const handleShowR = () => {
        setShow(false);
        setShowR(true);
    }
    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">[Logo Cafe]</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <Navbar.Brand onClick={handleShow} href="#">Login</Navbar.Brand>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginCard />
                    <Navbar.Brand onClick={handleShowR} href="#">Đăng Ký</Navbar.Brand>
                </Modal.Body>
            </Modal>


            <Modal show={showR} onHide={handleCloseR}>
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
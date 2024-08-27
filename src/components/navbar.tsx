import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginCard from './login.card';
import Register from './register';

function NavBarApp() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleClose = () => setShowLogin(false);
    const handleShowLogin = () => {
        setShowLogin(true);
    }

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    }
    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">[Logo Cafe]</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Navbar.Brand onClick={handleShowLogin} href="#">Login</Navbar.Brand>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Modal show={showLogin} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginCard />
                    <Navbar.Brand onClick={handleShowRegister} href="#">Đăng Ký</Navbar.Brand>
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
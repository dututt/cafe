import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginCard from './login.card';
import Register from './register';

interface IProps {
    setRole: (value: boolean) => void
    useCustom: {
        user: IUser
    }
}

function NavBarApp(props: IProps) {
    const { useCustom, setRole } = props

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [changeText, setChangeText] = useState<string>("Login")

    const handleClose = () => setShowLogin(false);

    const handleShowLogin = () => {
        if (useCustom.user.checkRole) {
            useCustom.user.checkRole = false
            refreshChangeText()
        } else {
            setShowLogin(true);
        }
        setRole(useCustom.user.checkRole)
    }

    function refreshChangeText(): void {
        if (useCustom.user.checkRole) {
            setChangeText(useCustom.user.email)
            setShowLogin(false);
        } else {
            setChangeText("Login")
        }
        setRole(useCustom.user.checkRole)
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
                            <Navbar.Brand onClick={handleShowLogin} href="#">{changeText}</Navbar.Brand>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Modal show={showLogin} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginCard useCustom={useCustom} refreshChangeText={refreshChangeText} />
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
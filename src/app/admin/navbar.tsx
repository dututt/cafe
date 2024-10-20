"use client";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import {
  Button,
  ListGroup,
  Modal,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Register from "../../components/register";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

function NavBarApp() {
  const { user } = useClerk();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleClose = () => setShowLogin(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const _handleClose = () => setShow(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary p-0">
        <Container>
          <Button variant="" onClick={handleShow} className="material-icons">
            reorder
          </Button>
          <Navbar.Brand href="/">Cafe 290</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user?.primaryEmailAddress?.emailAddress.split("@")[0] ?? (
              <Link href="/login">Login</Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={_handleClose}>
        <Offcanvas.Header closeButton>
          <Navbar.Brand href="/">Cafe 290</Navbar.Brand>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item>
              <Nav.Link href="/" className="material-icons">
                home
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="/orders-status">Trạng thái</Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="/orders-management">Đơn hàng</Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="/food-beverage-management">Thêm món mới</Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="/admin">Quản lý</Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavDropdown
                title="Doanh thu"
                id={`offcanvasNavbarDropdown-expand`}
              >
                <NavDropdown.Item href="/report/day">
                  Theo ngày
                </NavDropdown.Item>
                <NavDropdown.Item href="/report/month">
                  Theo tháng
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/report/year">
                  Theo năm
                </NavDropdown.Item>
              </NavDropdown>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link
                //   onClick={async () => {
                //     await signOut();
                //   }}
                href="/"
              >
                Đăng xuất
              </Nav.Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

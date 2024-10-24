"use client";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import {
  Button,
  ListGroup,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useClerk } from "@clerk/nextjs";

function NavBarApp() {
  const { user, signOut } = useClerk();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Navbar className="bg-body-tertiary p-0">
        <Button variant="" onClick={handleShow} className="material-icons p-0">
          reorder
        </Button>
        <Navbar.Brand href="/">Cafe 290</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end p-0">
          {user?.primaryEmailAddress?.emailAddress.split("@")[0] ?? ""}
        </Navbar.Collapse>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
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
            {user?.publicMetadata?.role === "order" && (
              <ListGroup.Item>
                <Nav.Link href="/orders-status">Trạng thái</Nav.Link>
              </ListGroup.Item>
            )}
            {(user?.publicMetadata?.role === "admin" ||
              user?.publicMetadata?.role === "manager") && (
              <>
                <ListGroup.Item>
                  <Nav.Link href="/orders-status">Trạng thái</Nav.Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Nav.Link href="/orders-management">Đơn hàng</Nav.Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Nav.Link href="/food-beverage-management">
                    Thêm món mới
                  </Nav.Link>
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
              </>
            )}
            <ListGroup.Item>
              {user ? (
                <Button
                  variant=""
                  className="material-icons p-0"
                  onClick={async () => {
                    await signOut();
                    setShow(false);
                  }}
                >
                  settings_power
                </Button>
              ) : (
                <Nav.Link href="/login">Đăng nhập</Nav.Link>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="/register">Đăng ký</Nav.Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      {/* <Modal show={showLogin} onHide={handleClose}>
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
      </Modal> */}
    </div>
  );
}

export default NavBarApp;

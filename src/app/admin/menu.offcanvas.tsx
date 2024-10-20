"use client";

import { Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useClerk } from "@clerk/nextjs";

function MenuOffCanvas() {
  const { user, signOut } = useClerk();
  const currentRole = user?.publicMetadata.role;

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Quản lý
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              hidden={
                !(
                  currentRole === "manager" ||
                  currentRole === "admin" ||
                  currentRole === "order"
                )
              }
            >
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" className="material-icons">
                  home
                </Nav.Link>

                <Nav.Link href="/orders-status">Trạng thái</Nav.Link>
                <Nav.Link
                  hidden={
                    !(currentRole === "manager" || currentRole === "admin")
                  }
                  href="/orders-management"
                >
                  Đơn hàng
                </Nav.Link>
                <Nav.Link
                  hidden={
                    !(currentRole === "manager" || currentRole === "admin")
                  }
                  href="/food-beverage-management"
                >
                  Thêm món mới
                </Nav.Link>
                <Nav.Link
                  hidden={
                    !(currentRole === "manager" || currentRole === "admin")
                  }
                  href="/admin"
                >
                  Quản lý
                </Nav.Link>
                <NavDropdown
                  hidden={
                    !(currentRole === "manager" || currentRole === "admin")
                  }
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
                <Nav.Link
                  onClick={async () => {
                    await signOut();
                  }}
                  href="/"
                >
                  Đăng xuất
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuOffCanvas;

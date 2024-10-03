'use client'
import { Offcanvas } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useClerk } from '@clerk/nextjs';

function MenuOffCanvas() {
    const { user, signOut } = useClerk();

    return (
        <>
            {
                ['sm'].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body-tertiary">
                        <Container >
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Tìm kiếm"
                                    className="me-2"
                                    aria-label="Tìm kiếm"
                                />
                            </Form>

                            {user?.primaryEmailAddress?.emailAddress && <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="start"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        Quản lý
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        {/* <Nav.Link href="/users-management">Tài khoản</Nav.Link> */}
                                        <Nav.Link href="/orders-status">Trạng thái</Nav.Link>
                                        <Nav.Link href="/orders-management">Đơn hàng</Nav.Link>
                                        <Nav.Link href="/food-beverage-management">Thêm món mới</Nav.Link>
                                        <Nav.Link href="/admin">Quản lý</Nav.Link>
                                        <NavDropdown
                                            title="Doanh thu"
                                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        >
                                            <NavDropdown.Item href="/report">Theo ngày</NavDropdown.Item>
                                            <NavDropdown.Item href="#action4">
                                                Theo tháng
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action5">
                                                Theo năm
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link onClick={async () => { await signOut() }} href="/">Đăng xuất</Nav.Link>
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>}
                        </Container>
                    </Navbar>
                ))
            }
        </>
    );
}

export default MenuOffCanvas;
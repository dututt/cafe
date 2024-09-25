import { Image, Offcanvas } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MenuOffCanvas() {
    return (
        <>
            {['sm'].map((expand, idx) => (
                <Navbar key={idx} expand={expand} className="bg-body-tertiary mb-1">
                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Tìm kiếm"
                                className="me-2"
                                aria-label="Tìm kiếm"
                            />
                            <Button variant="outline-success">
                                Se...
                            </Button>
                        </Form>
                        <Navbar.Offcanvas
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
                                    <Nav.Link href="#action2">Đơn hàng</Nav.Link>
                                    <NavDropdown
                                        title="Doanh thu"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Theo ngày</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Theo tháng
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Theo năm
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default MenuOffCanvas;
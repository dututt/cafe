import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

interface IProps {
  setValueSearch: (value: string) => void;
}

function MenuSearch({ setValueSearch }: IProps) {
  return (
    <div className="flex-row-1 p-0">
      <Navbar expand="sm" className="bg-body-tertiary p-1">
        <Container fluid>
          <Button variant="" className="material-icons p-0">
            add_shopping_cart
          </Button>
          <Form className="d-flex">
            <Form.Control
              onChange={(e) => setValueSearch(e.target.value)}
              type="search"
              placeholder="Tìm kiếm"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="material-icons"
          >
            reorder
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <Nav.Link href="#" onClick={() => setValueSearch("Điểm Tâm")}>
                Điểm Tâm
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => setValueSearch("Cafe - Milo - Cacao")}
              >
                Cafe - Milo - Cacao
              </Nav.Link>
              <Nav.Link href="#" onClick={() => setValueSearch("Sinh Tố")}>
                Sinh Tố
              </Nav.Link>
              <Nav.Link href="#" onClick={() => setValueSearch("Yaourt - Kem")}>
                Yaourt - Kem
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => setValueSearch("Trà Truyền Thống")}
              >
                Trà Truyền Thống
              </Nav.Link>
              <Nav.Link href="#" onClick={() => setValueSearch("Nước Ép")}>
                Nước Ép
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MenuSearch;

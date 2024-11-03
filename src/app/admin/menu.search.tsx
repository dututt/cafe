import { useCart } from "@/components/cart.context";
import ViewCardOrder from "@/components/view.card.orders";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

interface IProps {
  setValueSearch: (value: string) => void;
}

function MenuSearch({ setValueSearch }: IProps) {
  const [show, setShow] = useState<boolean>(false);
  const { state } = useCart();
  let count = 0;
  state.items.map((item) => (count = count + item.amount));

  return (
    <>
      {show && <ViewCardOrder show={show} setShow={setShow} />}

      <div className="flex-row-1 p-0">
        <Navbar expand="sm" className="bg-body-tertiary p-1">
          <Container fluid>
            <Button
              onClick={() => setShow(count > 0)}
              variant=""
              style={count == 0 ? {} : { color: "red", position: "relative" }}
              className="p-0"
              size="sm"
            >
              <i className="material-icons p-0">add_shopping_cart</i>
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "20px",
                    borderRadius: "50%",
                    padding: "2px",
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  {count}
                </span>
              )}
            </Button>
            <Form className="d-flex p-0">
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
              className="material-icons p-0"
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
                <Nav.Link
                  href="#"
                  onClick={() => setValueSearch("Yaourt - Kem")}
                >
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
    </>
  );
}

export default MenuSearch;

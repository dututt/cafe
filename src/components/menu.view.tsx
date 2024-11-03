"use client";
import CurrencyDisplay from "@/app/utils/currency.display";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { GetMenus } from "./actions";
import Cart from "./Cart";

interface IProps {
  valueSearch: string | undefined;
}

function MenuView({ valueSearch }: IProps) {
  let menus: ICatalogPrice[] = GetMenus();
  if (valueSearch?.trim()) {
    menus = menus?.filter(
      (item) =>
        item.title
          .trim()
          .toLowerCase()
          .includes(valueSearch?.toLowerCase().trim() ?? "") ||
        item.content
          .trim()
          .toLowerCase()
          .includes(valueSearch?.toLowerCase().trim() ?? "")
    );
  }
  return (
    <>
      <div className="grow space-y-1">
        <Row xs={1} md={2} className="g-0">
          {Array.from({ length: menus?.length }).map((_, idx) => (
            <Col key={idx}>
              <Card style={{ height: "8rem" }}>
                <Row>
                  <Col xs="auto">
                    <Card.Img
                      variant="top"
                      style={{ height: "7rem", width: "7rem" }}
                      className="card-img-center self-center fixed-size p-1"
                      src={menus[idx].image}
                    />
                  </Col>
                  <Col>
                    <Card.Body className="p-1">
                      <Card.Title className="d-flex justify-content-between align-items-start font-semibold p-0">
                        {menus[idx].title}
                      </Card.Title>
                      <Button variant="outline-primary" className="p-0">
                        <CurrencyDisplay amount={menus[idx].price} />
                      </Button>
                      <ButtonGroup
                        size="lg"
                        className="d-flex items-right justify-content-end"
                      >
                        <Cart selection={menus[idx]} />
                      </ButtonGroup>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
export default MenuView;

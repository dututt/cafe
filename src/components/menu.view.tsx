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
    <div className="grow space-y-1">
      <Row xs={1} md={2} className="g-0">
        {Array.from({ length: menus?.length }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{ height: "8rem" }}>
              <Row>
                <Col>
                  <Card.Img
                    variant="top"
                    style={{ height: "7rem", width: "8rem" }}
                    className="card-img-top fixed-size"
                    src={menus[idx].image}
                  />
                </Col>
                <Col className="flex items-center gap-3">
                  <Card.Body className="p-0">
                    <Card.Title className="d-flex justify-content-between align-items-start font-semibold">
                      {menus[idx].title}
                    </Card.Title>
                  </Card.Body>
                  <Card.Body className="p-0">
                    <ButtonGroup size="sm">
                      <Button variant="outline-warning">Giá</Button>
                      <Button variant="outline-danger">
                        <CurrencyDisplay amount={menus[idx].price} />
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup
                      size="sm"
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
  );
}
export default MenuView;

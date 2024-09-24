import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CarouselDarkVariant from './carousel';

function BrandCard() {
    return (
        <Card>
            {/* <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.UhUMwpnx5NvOtlWl5YaeFAHaFj?w=2048&h=1536&rs=1&pid=ImgDetMain" /> */}
            <CarouselDarkVariant />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on...
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default BrandCard;
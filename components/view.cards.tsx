'use client'
import Card from 'react-bootstrap/Card';

function ViewCard() {
    return (
        <>
            <Card border="primary">
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>Primary Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card&apos;'s content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card border="secondary">
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>Secondary Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card&apos;'s content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ViewCard;
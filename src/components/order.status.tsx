import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function OrderStatus() {
    return (
        <>
            <Button variant="primary" disabled >
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Đang tạo món...</span>
            </Button>{' '}
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Đang tạo món...
            </Button>
        </>
    );
}

export default OrderStatus;
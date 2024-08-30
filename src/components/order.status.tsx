import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface IProps {
    status: boolean
}

function OrderStatus(props: IProps) {
    const { status } = props
    return (
        <>
            <Button variant="primary" disabled hidden={!status}>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Đang tạo món...</span>
            </Button>{' '}
            <Button variant="primary" disabled hidden={!status}>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Đang tiếp nhận...
            </Button>
        </>
    );
}

export default OrderStatus;
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface IProps {
    status: boolean
    changeTextStatus: string
}

function OrderStatus(props: IProps) {
    const { status, changeTextStatus } = props

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
                {changeTextStatus}
            </Button>
        </>
    );
}

export default OrderStatus;
'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginCard() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control type="text" placeholder="Tên đăng nhập" />
                <Form.Text className="text-muted">
                    Yêu cầu nhập tên đăng nhập!
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Nhớ đăng nhập" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Đăng Nhập
            </Button>
        </Form>
    );
}

export default LoginCard;
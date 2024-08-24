import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Register() {
    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Tên đăng nhập
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Tên đăng nhập" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Mật khẩu
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="password" placeholder="Mật khẩu" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Form.Check label="Remember me" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Đăng Ký</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default Register;
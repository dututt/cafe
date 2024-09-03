'use client'
import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useSWR from 'swr';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(
        "/api/login",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    if (!data) {
        return <div>login failed...</div>
    }
    console.log(">>>>>>>>>>Data: ", data)
    console.log(">>>>>>>>>>Login: ", email, password)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (data[0].email === email && data[0].password === password) {

        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Form.Text className="text-muted">
                    Yêu cầu nhập email!
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
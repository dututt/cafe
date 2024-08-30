'use client'
import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            // fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json, text/plain, */*',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ email, password })
            // }).then(res => res.json())
            //     .then(res => {
            //         if (res) {
            //             toast.success("Login succeed !")
            //         }
            //     })

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }).then(res => {
                console.log(">>>>>>>>>res: ", res.json())
            })



        } catch (error) {
            toast.error("Login failed !")
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
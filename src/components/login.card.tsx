'use client'
import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useSWR, { Fetcher } from 'swr';

interface IProps {
    refreshChangeText: () => void
}

function LoginCard(props: IProps) {
    const { refreshChangeText } = props

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetcher: Fetcher<IUser[], string> = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "/api/login",
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
        }
    );
    if (error) {
        return <div>login failed...</div>
    }
    if (isLoading) {
        return <div>isLoading...</div>
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = data?.find(user => user.email === email && user.password === password)
        if (user) {
            // userLogin.checkRole = true
            // userLogin.username = user.username
            // setUserLogin(userLogin)
            refreshChangeText()
        }
    }

    return (
        <>
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
        </>
    );
}

export default LoginCard;
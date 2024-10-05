'use client'
import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { now } from 'next-auth/client/_utils';
import { Button, ButtonGroup } from 'react-bootstrap';

const QrGenerator: React.FC = () => {
    const { Canvas } = useQRCode();
    const [number, setNumber] = useState(1);

    const increment = () => {
        setNumber((prev) => (prev < 99 ? prev + 1 : prev));
    };

    const decrement = () => {
        setNumber((prev) => (prev > 1 ? prev - 1 : prev));
    };
    return (
        <div>
            <ButtonGroup size="lg" className="mb-2">
                <Button disabled>Chọn số bàn: </Button>
                <Button onClick={decrement}>-</Button>
                <Button disabled>{number}</Button>
                <Button onClick={increment}>+</Button>
            </ButtonGroup>
            <Canvas
                text={"https://cafe-smoky.vercel.app/#" + number + "#" + now()}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                        dark: '#000000',
                        light: '#ffffff',
                    },
                }}
            />
        </div>
    );
};

export default QrGenerator;

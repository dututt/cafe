'use client'
import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { now } from 'next-auth/client/_utils';

const QrGenerator: React.FC = () => {
    const [text, setText] = useState(' ');
    const { Canvas } = useQRCode();
    const handleOnChange = (val: string) => {
        const value = "https://cafe-smoky.vercel.app/#" + val
        setText(value)
    }

    return (
        <div>
            Nhập số bàn: <input
                type="text"
                value={text}
                onChange={(e) => + setText(e.target.value)}
                placeholder="Enter text or URL"
            />
            <Canvas
                text={"https://cafe-smoky.vercel.app/#" + text.trim() + "#" + now()}
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

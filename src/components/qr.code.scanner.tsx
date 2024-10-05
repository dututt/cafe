import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

interface IProps {
    setDecodedText: (value: string) => void
}

const QrScanner = ({ setDecodedText }: IProps) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 },
            false
        );

        scanner.render(
            (decodedText, decodedResult) => {
                if (!decodedText.split("#")[0].includes("https://cafe-smoky.vercel.app")) return alert('Mã QR không hợp lệ!')
                setDecodedText((decodedText.split("#")[1]).split("%")[0])
                scanner.pause()
                scanner.clear();
            },
            (errorMessage) => {
                console.log(`Error scanning = ${errorMessage}`);
            }
        );

        return () => {
            scanner.clear();
        };
    });

    return <div id="reader" style={{ width: "500px" }} />;
};

export default QrScanner;

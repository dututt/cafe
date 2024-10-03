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
                console.log(`Code matched = ${decodedText}`, decodedResult.result.text);
                setDecodedText((decodedText.split("#")[1]).split("%")[0])
            },
            (errorMessage) => {
                console.log(`Error scanning = ${errorMessage}`);
            }
        );

        return () => {
            scanner.clear();
        };
    }, []);

    return <div id="reader" style={{ width: "500px" }} />;
};

export default QrScanner;

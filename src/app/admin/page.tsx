import QrGenerator from "@/components/qr-generator";


export default function AdminNavbar() {


    return (
        <div className="border">
            <h1>In mã QR</h1>
            <QrGenerator />
        </div>
    )
}
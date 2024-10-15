import QrGenerator from "@/components/qr-generator";
import UploadForm from "../file/UploadForm";
import ImageList from "../file/ImageList";

export default function AdminNavbar() {
  return (
    <>
      <div className="border">
        <h1>In mã QR</h1>
        <QrGenerator />
      </div>

      <div className="border">
        <h1>File Upload Example</h1>
        <UploadForm />
        <ImageList />
      </div>
    </>
  );
}

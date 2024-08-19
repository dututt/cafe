import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";

const AddCard = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [type, setType] = useState<number>(1)
    const [image, setImage] = useState<string>("")

    const handleSubmit = () => {

        if (!title) {
            toast.error("Not empty title !")
            return
        }
        if (!content) {
            toast.error("Not empty content !")
            return
        }
        if (!image) {
            toast.error("Not empty image !")
            return
        }
        console.log(">>> Handle submit data: ", title, content, type, image)

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, image, type })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Create new meal succeed !")
                    mutate("https://dututt.github.io/backend-cafe/db.json")
                }
            })

        setTitle("")
        setContent("")
        setImage("")
        setType(1)
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                <Form.Label column sm={2}>
                    Tiêu đề
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalContent">
                <Form.Label column sm={2}>
                    Nội dung
                </Form.Label>
                <Col sm={10}>
                    <Form.Control as="textarea" rows={3} placeholder="Nội dung"
                        value={content}
                        onChange={(e) => setContent(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                <Form.Label column sm={2}>
                    Chọn ảnh
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="file"
                        value={image}
                        onChange={(e) => setImage(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
                <Form.Label column sm={2}>
                    Thể loại
                </Form.Label>
                <Col sm={10}>
                    <Form.Select aria-label="Floating label select example" onChange={(e) => setType(Number.parseInt(e.target.value))}>
                        <option value="1">Ăn</option>
                        <option value="2">Uống</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button href="#" type="submit" onClick={() => handleSubmit()}>Thêm</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default AddCard;
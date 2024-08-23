'use client'
import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, ModalBody, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import { mutate } from "swr"

interface IProps {
    showModalUpdate: boolean
    setShowModalUpdate: (value: boolean) => void
    catalog: ICatalog | null
    setCatalog: (value: ICatalog | null) => void
}

function UpdateModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, catalog, setCatalog } = props

    const [id, setId] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<number>(0);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (catalog && catalog.id) {
            setId(catalog.id)
            setContent(catalog.content)
            setAuthor(catalog.author)
            setTitle(catalog.title)
            setType(catalog.type)
            setImage(catalog.image)
            console.log(">>>> Update data:", catalog)
        }
    }, [catalog])

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

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, image, type })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.warning("Update meal succeed !")
                    handleCloseModal()
                    // mutate("https://dututt.github.io/backend-cafe/db.json")
                    mutate("http://localhost:8000/blogs")
                }
            })
    }

    const handleCloseModal = () => {
        setTitle("")
        setContent("")
        setImage("")
        setType(1)
        setCatalog(null)
        setShowModalUpdate(false)
    }

    return (

        <Modal
            show={showModalUpdate}
            onHide={() => setShowModalUpdate(false)}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa món</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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
                                onChange={(e) => setImage(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
                        <Form.Label column sm={2}>
                            Thể loại
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Select value={type} aria-label="Floating label select example" onChange={(e) => setType(Number.parseInt(e.target.value))}>
                                <option value="1">Ăn</option>
                                <option value="2">Uống</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModal()}>Đóng</Button>
                <Button variant="warning" onClick={() => handleSubmit()}>Đồng ý</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateModal;
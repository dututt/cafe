'use client'
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
    showModalCreate: boolean
    setShowModalCreate: (value: boolean) => void
    data: ICatalogPrice[]
}

const CreateModal = (props: IProps) => {
    const { showModalCreate, setShowModalCreate, data } = props

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [type, setType] = useState<number>(1)
    const [image, setImage] = useState<string>("")
    const [price, setPrice] = useState<number>(0)


    function checkExisting() {
        const existItems = data.filter(item => item.title.trim() === title.trim())
        if (existItems.length > 0) return true
        return false
    }

    const handleAddItem = () => {

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
        if (!price) {
            toast.error("Not empty price !")
            return
        }
        if (checkExisting()) {
            toast.success("Meal existing !")
            return
        }
        fetch('/api/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, image, type, price })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Create new meal succeed !")
                    mutate("/api/food-beverage")
                }
            })
    }

    const handleCloseModal = () => {
        setTitle("")
        setContent("")
        setImage("")
        setType(1)
        setShowModalCreate(false)
    }

    return (

        <Form>
            <Modal
                show={showModalCreate}
                onHide={() => setShowModalCreate(false)}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thực đơn mới</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                        <Form.Label column sm={2}>
                            Tiêu đề
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Tiêu đề"
                                value={title} name="title"
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
                                value={content} name="content"
                                onChange={(e) => setContent(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Chọn ảnh
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
                        <Form.Label column sm={2}>
                            Giá
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number"
                                value={price}
                                onChange={(e) => setPrice(Number.parseInt(e.target.value))} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
                        <Form.Label column sm={2}>
                            Thể loại
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Select aria-label="Floating label select example" onChange={(e) => setType(Number.parseInt(e.target.value))} name="type">
                                <option value="1">Ăn</option>
                                <option value="2">Uống</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>Đóng</Button>
                    <Button variant="warning" onClick={() => handleAddItem()}>Thêm</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default CreateModal;


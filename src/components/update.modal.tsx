'use client'
import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import { mutate } from "swr"

interface IProps {
    showModalUpdate: boolean
    setShowModalUpdate: (value: boolean) => void
    catalog: ICatalogPrice | null
    setCatalog: (value: ICatalogPrice | null) => void
}

function UpdateModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, catalog, setCatalog } = props

    const [id, setId] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        if (catalog && catalog.id) {
            setId(catalog.id)
            setContent(catalog.content)
            setTitle(catalog.title)
            setType(catalog.type)
            setImage(catalog.image)
            setPrice(catalog.price)
            console.log(">>>> Update data:", catalog)
        }
    }, [catalog])

    const handleUpdateSubmit = () => {

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
        if (!type) {
            toast.error("Not empty type !")
            return
        }
        if (!price) {
            toast.error("Not empty price !")
            return
        }
        console.log(">>> Handle submit data: ", { id, title, content, type, image, price })

        fetch(`/api/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, title, content, image, type, price })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.warning("Update meal succeed !")
                    handleCloseModal()
                    mutate("/")
                }
            })
    }

    const handleCloseModal = () => {
        setTitle("")
        setContent("")
        setImage("")
        setType(1)
        setPrice(0)
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
                            <Form.Control type="text" value={image}
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

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
                        <Form.Label column sm={2}>
                            Giá
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" value={price}
                                onChange={(e) => {
                                    setPrice(Number.parseInt(e.target.value))
                                }} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModal()}>Đóng</Button>
                <Button variant="warning" onClick={() => handleUpdateSubmit()}>Đồng ý</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateModal;
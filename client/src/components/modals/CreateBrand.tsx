import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createBrand, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { ModalProps } from '../../pages/Admin';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const CreateBrand = observer(({ show, onHide }: ModalProps) => {
    const [value, setValue] = useState('');
    const { device } = useContext(Context);

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data));
    }, [show]);

    const addBrand = () => {
        createBrand({ name: value }).then(() => {
            setValue('');
            onHide();
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Уведіть назву типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBrand;
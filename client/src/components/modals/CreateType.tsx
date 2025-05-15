import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createType, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { ModalProps } from '../../pages/Admin';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const CreateType = observer(({ show, onHide }: ModalProps) => {
    const [value, setValue] = useState('');
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
    }, [show]);

    const addType = () => {
        createType({ name: value }).then(() => {
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
                    Добавити тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Уведіть назву типу"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addType}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateType;
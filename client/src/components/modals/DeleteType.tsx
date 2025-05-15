import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { ModalProps } from '../../pages/Admin';
import { Context } from '../..';
import { deleteType, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { IType } from '../../store/DeviceStore';

const DeleteType = observer(({ show, onHide }: ModalProps) => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
    }, [show]);

    const deleteAndSetSelectedType = () => {
        deleteType(String(device.selectedType.id));
        device.setSelectedType({} as IType);
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Виберіть тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={deleteAndSetSelectedType}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;
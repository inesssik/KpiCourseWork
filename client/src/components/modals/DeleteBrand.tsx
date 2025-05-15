import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { ModalProps } from '../../pages/Admin';
import { Context } from '../..';
import { deleteBrand, fetchBrands } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { IBrand } from '../../store/DeviceStore';

const DeleteBrand = observer(({ show, onHide }: ModalProps) => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data));
    }, [show]);

    const deleteAndSetSelectedBrand = () => {
        deleteBrand(String(device.selectedBrand.id));
        device.setSelectedBrand({} as IBrand);
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
                    Видалити бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Виберіть бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={deleteAndSetSelectedBrand}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteBrand;
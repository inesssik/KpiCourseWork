import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { ModalProps } from '../../pages/Admin';
import { Context } from '../..';
import { deleteDevice, fetchDevices } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { IDevice } from '../../store/DeviceStore';

const DeleteDevice = observer(({ show, onHide }: ModalProps) => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchDevices(null, null, 1, 2).then((data: { rows: IDevice[]; count: number; }) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [show]);

    const deleteAndSetSelectedDevice = () => {
        deleteDevice(String(device.selectedDevice.id));
        device.setSelectedDevice({} as IDevice);
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
                    Видалити девайс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedDevice.name || "Виберіть девайс"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.devices.map(deviceItem =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedDevice(deviceItem)}
                                    key={deviceItem.id}
                                >
                                    {deviceItem.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={deleteAndSetSelectedDevice}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteDevice;
import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteBrand from '../components/modals/DeleteBrand';
import DeleteDevice from '../components/modals/DeleteDevice';
import DeleteType from '../components/modals/DeleteType';

export interface ModalProps {
    show: boolean;
    onHide: () => void;
}

const Admin = () => {
    const [brandAddVisible, setBrandAddVisible] = useState(false);
    const [typeAddVisible, setTypeAddVisible] = useState(false);
    const [deviceAddVisible, setDeviceAddVisible] = useState(false);
    const [brandDeleteVisible, setBrandDeleteVisible] = useState(false);
    const [typeDeleteVisible, setTypeDeleteVisible] = useState(false);
    const [deviceDeleteVisible, setDeviceDeleteVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Container className="d-flex flex-column p-0">
                <Button
                    variant={"outline-dark"}
                    className="mt-5 p-2"
                    onClick={() => setTypeAddVisible(true)}
                >
                    Добавити тип
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-2 p-2"
                    onClick={() => setTypeDeleteVisible(true)}
                >
                    Видалити тип
                </Button>
            </Container>
            <Container className="d-flex flex-column p-0">
                <Button
                    variant={"outline-dark"}
                    className="mt-5 p-2"
                    onClick={() => setBrandAddVisible(true)}
                >
                    Добавити бренд
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-2 p-2"
                    onClick={() => setBrandDeleteVisible(true)}
                >
                    Видалити бренд
                </Button>
            </Container>
            <Container className="d-flex flex-column p-0">
                <Button
                    variant={"outline-dark"}
                    className="mt-5 p-2"
                    onClick={() => setDeviceAddVisible(true)}
                >
                    Добавити девайс
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-2 p-2"
                    onClick={() => setDeviceDeleteVisible(true)}
                >
                    Видалити девайс
                </Button>
            </Container>
            <CreateBrand show={brandAddVisible} onHide={() => setBrandAddVisible(false)} />
            <CreateDevice show={deviceAddVisible} onHide={() => setDeviceAddVisible(false)} />
            <CreateType show={typeAddVisible} onHide={() => setTypeAddVisible(false)} />
            <DeleteBrand show={brandDeleteVisible} onHide={() => setBrandDeleteVisible(false)} />
            <DeleteDevice show={deviceDeleteVisible} onHide={() => setDeviceDeleteVisible(false)} />
            <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)} />
        </Container>
    );
};

export default Admin;
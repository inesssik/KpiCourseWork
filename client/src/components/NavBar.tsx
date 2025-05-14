import React, { useContext } from 'react'
import { Navbar, Nav, Button, Col, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Col><NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>КупиДевайс</NavLink></Col>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Col>
                            <Button
                                variant={"outline-light"}
                                onClick={() => history(ADMIN_ROUTE)}
                            >
                                Адмінка
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                Вийти
                            </Button>
                        </Col>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Col><Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизація</Button></Col>
                    </Nav>
                }
            </Container>
        </Navbar >
    )
})

export default NavBar
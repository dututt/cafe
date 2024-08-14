'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GridCard from './grid.cards';
import ViewCard from './view.cards';
import LoginCard from './login.card';
import { Badge } from 'react-bootstrap';
import Register from './register';

function AppHeader() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="home" title="Ăn">
                <GridCard />
            </Tab>
            <Tab eventKey="profile" title="Uống">
                <GridCard />
            </Tab>
            <Tab eventKey="contact" title="Xem">
                <ViewCard />
            </Tab>
            <Tab eventKey="admin" title="Register">
                <Register />
            </Tab>
            <Tab eventKey="login" title="Login">
                <LoginCard />
            </Tab>
        </Tabs>
    );
}

export default AppHeader;
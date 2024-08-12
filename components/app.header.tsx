'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import GridCard from './grid.cards';

function AppHeader() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title="Home">
                <GridCard />
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <GridCard />
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                <GridCard />
            </Tab>
        </Tabs>
    );
}

export default AppHeader;
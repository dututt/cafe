'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import AddCard from './add.card';
import TableMeal from './table.meal';


function AppHeader() {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (!data) {
        return <div>loading...</div>
    }

    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="home" title="Ăn">
                <DrinkCard catalogs={data} />
            </Tab>
            <Tab eventKey="profile" title="Uống">
                <FoodCard catalogs={data} />
            </Tab>
            <Tab eventKey="contact" title="Xem">
                <ViewCard />
            </Tab>
            <Tab eventKey="admin" title="Admin">
                <TableMeal catalogs={data} />
            </Tab>
        </Tabs>
    );
}

export default AppHeader;
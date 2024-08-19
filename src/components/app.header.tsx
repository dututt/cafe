'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import TableMeal from './table.meal';


function AppHeader() {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(
        "https://dututt.github.io/backend-cafe/db.json",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    console.info(">>> data info: ", data?.blogs)
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
                <DrinkCard catalogs={data?.blogs} />
            </Tab>
            <Tab eventKey="profile" title="Uống">
                <FoodCard catalogs={data?.blogs} />
            </Tab>
            <Tab eventKey="contact" title="Xem">
                <ViewCard />
            </Tab>
            <Tab eventKey="admin" title="Admin">
                <TableMeal catalogs={data?.blogs} />
            </Tab>
        </Tabs>
    );
}

export default AppHeader;
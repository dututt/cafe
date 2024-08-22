'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import TableMeal from './table.meal';
import { useState } from 'react';


function AppHeader() {

    const selects: ISelections = { selections: [] }
    // const [selects, setSelects] = useState<ISelections>()
    const [_selections, setSelections] = useState<ISelections | null>(null)

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(
        "https://dututt.github.io/backend-cafe/db.json",
        // "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    console.info(">>> data info: ", data)
    if (!data) {
        return <div>loading...</div>
    }


    function handleSelect(e: string | null): void {
        console.log(">>>> handle Select:", e, selects)
        setSelections(selects)
        console.log(">>>> handle Select123:", _selections)
    }

    return (
        <Tabs
            defaultActiveKey="eat"
            id="uncontrolled-tab-example"
            onSelect={(e) => handleSelect(e)}
            className="mb-3"
            justify
        >
            <Tab eventKey="eat" title="Ăn">
                <DrinkCard catalogs={data?.blogs} selects={selects} />
            </Tab>
            <Tab eventKey="drink" title="Uống">
                <FoodCard catalogs={data?.blogs} selects={selects} />
            </Tab>
            <Tab eventKey="view" title="Xem">
                <ViewCard selections={selects} setSelections={setSelections} />
            </Tab>
            <Tab eventKey="admin" title="Admin">
                <TableMeal catalogs={data?.blogs} />
            </Tab>
        </Tabs>
    );
}

export default AppHeader;
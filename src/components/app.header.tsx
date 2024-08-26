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

    const s: ISelections = { selections: [] }
    const [selects, setSelects] = useState<ISelections>(s)
    const [showViewCard, setShowViewCard] = useState<boolean>(false)

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
        if (e === 'view') {
            setSelects(selects)
            setShowViewCard(true)
        } else if (e === 'admin') {
            setSelects(selects)
        }
    }

    return (
        <>
            <Tabs
                defaultActiveKey="eat"
                id="uncontrolled-tab-example"
                onSelect={(e) => handleSelect(e)}
                className="mb-3"
                justify
            >
                <Tab eventKey="eat" title="Ăn">
                    <DrinkCard catalogs={data?.blogs} selects={selects} setSelects={setSelects} />
                </Tab>
                <Tab eventKey="drink" title="Uống">
                    <FoodCard catalogs={data?.blogs} selects={selects} setSelects={setSelects} />
                </Tab>
                <Tab eventKey="view" title={"Xem (" + selects.selections.length + ")"}>
                    <ViewCard viewSelects={selects} setViewSelects={setSelects} showViewCard={showViewCard} setShowViewCard={setShowViewCard} />
                </Tab>
                <Tab eventKey="admin" title="Admin">
                    <TableMeal catalogs={data?.blogs} viewSelects={selects} />
                </Tab>
            </Tabs>

            <ViewCard
                showViewCard={showViewCard}
                setShowViewCard={setShowViewCard}
                viewSelects={selects}
                setViewSelects={setSelects}
            />

        </>
    );
}

export default AppHeader;
'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import TableMeal from './table.meal';
import { useState } from 'react';
import useCustomHook from './useCustomHook';


function AppHeader() {
    const useCustom = useCustomHook()

    const s: ISelections = { selections: [] }
    const [selects, setSelects] = useState<ISelections>(s)
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [acceptStatus, setAcceptStatus] = useState<boolean>(false)

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(
        "/api/fetch",
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

    function handleSelect(e: string | null): void {
        if (e === 'view') {
            setSelects(selects)
            setShowViewCard(true)
        } else if (e === 'admin') {
            setSelects(selects)
            setAcceptStatus(true)
        } else if (e === 'eat') {
            setSelects(selects)
            setAcceptStatus(true)
        } else if (e === 'drink') {
            setSelects(selects)
            setAcceptStatus(true)
        }
    }
    function handleAcceptStatus() {
        console.log(">>>>>1111handleAcceptStatus data: ", acceptStatus)
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
                    <DrinkCard catalogs={data?.result?.rows} selects={selects} setSelects={setSelects} />
                </Tab>
                <Tab eventKey="drink" title="Uống">
                    <FoodCard catalogs={data?.result?.rows} selects={selects} setSelects={setSelects} />
                </Tab>
                <Tab eventKey="view" title={"Xem (" + selects.selections.length + ")"}>
                    {/* <ViewCard viewSelects={selects} setViewSelects={setSelects} showViewCard={showViewCard} setShowViewCard={setShowViewCard} /> */}
                </Tab>
                {/* <Tab eventKey="admin" title="Admin">
                    {useCustom && <TableMeal catalogs={data?.result?.rows} viewSelects={selects} acceptStatus={acceptStatus} setAcceptStatus={setAcceptStatus} useCustom={useCustom} />}
                </Tab> */}
            </Tabs>

            {useCustom && <ViewCard
                showViewCard={showViewCard}
                setShowViewCard={setShowViewCard}
                viewSelects={selects}
                setViewSelects={setSelects}
                acceptStatus={acceptStatus}
                setAcceptStatus={handleAcceptStatus}
                useCustom={useCustom}
            />}
        </>
    );
}

export default AppHeader;

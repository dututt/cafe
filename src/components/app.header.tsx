'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import TableMeal from './table.meal';
import { useState } from 'react';

interface IProps {
    refreshRole: () => boolean
    useCustom: {
        user: IUser
    }
}

function AppHeader(props: IProps) {
    const { useCustom, refreshRole } = props

    const s: ISelections = { selections: [] }
    const [selects, setSelects] = useState<ISelections>(s)
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [acceptStatus, setAcceptStatus] = useState<boolean>(false)
    const [selectNum, setSelectNum] = useState<number>(0)
    const [role, setRole] = useState<boolean>(false)
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

    function handleSelects(value: ISelections) {
        setSelectNum(selects.selections.length)
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
                    <DrinkCard items={data?.result?.rows} selects={selects} setSelects={handleSelects} />
                </Tab>
                <Tab eventKey="drink" title="Uống">
                    <FoodCard items={data?.result?.rows} selects={selects} setSelects={handleSelects} />
                </Tab>
                <Tab eventKey="view" title={"Xem (" + selectNum + ")"}>
                    {/* <ViewCard viewSelects={selects} setViewSelects={setSelects} showViewCard={showViewCard} setShowViewCard={setShowViewCard} /> */}
                </Tab>
                {refreshRole() &&
                    (<Tab eventKey="admin" title="Admin">
                        {<TableMeal items={data?.result?.rows} viewSelects={selects} acceptStatus={acceptStatus} setAcceptStatus={setAcceptStatus} />}
                    </Tab>)}
            </Tabs>

            {<ViewCard
                showViewCard={showViewCard}
                setShowViewCard={setShowViewCard}
                viewSelects={selects}
                setViewSelects={setSelects}
                acceptStatus={acceptStatus}
                setAcceptStatus={handleAcceptStatus}
            />}
        </>
    );
}

export default AppHeader;

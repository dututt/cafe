'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import { useState } from 'react';

function AppHeader() {

    const s: ISelections = { selections: [] }
    const [selects, setSelects] = useState<ISelections>(s)
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [acceptStatus, setAcceptStatus] = useState<boolean>(false)
    const [selectNum, setSelectNum] = useState<number>(0)
    const [iSelects, setISelects] = useState<ISelections>({ selections: [] })

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "/api/fetch",
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
        }
    );
    if (isLoading) {
        return <div>loading...</div>
    }

    function handleSelect(e: string | null): void {
        if (e === 'view') {
            setSelects(selects)
            setShowViewCard(true)
        } else if (e === 'admin') {
            setSelects(selects)
        } else if (e === 'eat') {
            setSelects(selects)
        } else if (e === 'drink') {
            setSelects(selects)
        }
    }

    function handleAcceptStatus(value: boolean) {
        setAcceptStatus(value)
    }
    const items: ICatalogPrice[] = data?.result?.rows

    if (iSelects?.selections.length === 0) {
        items && items.map(val => {
            const iS: ISelection = {
                item: val,
                amount: 0,
                selected: false
            }
            iSelects?.selections.push(iS)
        })
    }

    function handleValueCheck(value: ISelection): number {
        setSelectNum((): number => {
            return iSelects?.selections.filter(item => item.selected === true).length
        })
        setAcceptStatus(value.selected)
        return value.item.id
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
                    <FoodCard iSelects={iSelects} handleValueCheck={handleValueCheck} />
                </Tab>
                <Tab eventKey="drink" title="Uống">
                    <DrinkCard iSelects={iSelects} handleValueCheck={handleValueCheck} />
                </Tab>
                <Tab eventKey="view" title={"Xem (" + selectNum + ")"}>
                    <ViewCard viewSelects={iSelects} handleValueCheck={handleValueCheck} setAcceptStatus={handleAcceptStatus} />
                </Tab>
            </Tabs>
        </>
    );
}

export default AppHeader;

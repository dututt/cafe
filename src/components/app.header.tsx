'use client'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ViewCard from './view.cards';
import useSWR from 'swr';
import DrinkCard from './drink.card';
import FoodCard from './food.card';
import TableMeal from './table.meal';
import { useEffect, useState } from 'react';

interface IProps {
    role: boolean
    useCustom: {
        user: IUser
    }
}

function AppHeader(props: IProps) {
    const { useCustom, role } = props

    const s: ISelections = { selections: [] }
    const [selects, setSelects] = useState<ISelections>(s)
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [acceptStatus, setAcceptStatus] = useState<boolean>(false)
    const [selectNum, setSelectNum] = useState<number>(0)
    const [iSelects, setISelects] = useState<ISelections>({ selections: [] })


    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(
        "/api/fetch",
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
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
                    {/* <ViewCard viewSelects={selects} setViewSelects={setSelects} showViewCard={showViewCard} setShowViewCard={setShowViewCard} /> */}
                </Tab>
                {role &&
                    (<Tab eventKey="admin" title="Admin">
                        {<TableMeal setAcceptStatus={setAcceptStatus} />}
                    </Tab>)}
            </Tabs>

            {/* {<ViewCard
                showViewCard={showViewCard}
                setShowViewCard={setShowViewCard}
                viewSelects={iSelects}
                setAcceptStatus={handleAcceptStatus}
            />} */}
        </>
    );
}

export default AppHeader;

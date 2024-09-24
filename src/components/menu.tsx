'use client'
import { useState } from 'react';
import { Accordion, Badge, ListGroup } from 'react-bootstrap';
import useSWR from 'swr';
import MenuView1 from './menu.view copy';


function Menu() {
    const [iSelects, setISelects] = useState<ISelections>({ selections: [] })

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(
        "/api/fetch",
        fetcher,
        {
            revalidateIfStale: true,
            refreshWhenHidden: true,
            refreshWhenOffline: true,
            revalidateOnFocus: true,
            revalidateOnMount: true,
            revalidateOnReconnect: true
        }
    );
    if (!data) {
        return <div>loading...</div>
    }

    const items: ICatalogPrice[] = data?.result?.rows
    items && items.map(val => {
        const iS: ISelection = {
            item: val,
            amount: 0,
            selected: false
        }
        iSelects?.selections.push(iS)
    })

    function handleValueCheck(value: ISelection): number {
        // setSelectNum((): number => {
        //     return iSelects?.selections.filter(item => item.selected === true).length
        // })
        // setAcceptStatus(value.selected)
        return value.item.id
    }

    function groupBy<T>(array: T[], keyGetter: (item: T) => string): Record<string, T[]> {
        return array.reduce((result, currentItem) => {
            const key = keyGetter(currentItem);
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(currentItem);
            return result;
        }, {} as Record<string, T[]>);
    }
    const groupedByContent = groupBy(iSelects.selections, select => select.item.content.toString());
    console.log(groupedByContent);


    const handleCheck = (ck: boolean, cat: ISelection) => { }
    const valueCheck = (value: ISelection) => { return 0 }
    return (
        <>
            <div>
                <Accordion defaultActiveKey={['Sinh Tố']} alwaysOpen>
                    {Object.entries(groupedByContent).map(([key, items]) => (

                        <Accordion.Item eventKey={key} key={key}>
                            <Accordion.Header>{key}
                                <Badge bg="primary" pill>
                                    {items.length}
                                </Badge>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="ms-2 me-auto">
                                    <MenuView1 iSelects={items} valueCheck={valueCheck} handleCheck={handleCheck} />
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                    ))}

                </Accordion>
            </div>


            {/* <ListGroup as="ol">
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Món ăn</div>
                        <GridCard iSelects={foodItems} valueCheck={handleValueCheck} />
                    </div>
                    <Badge bg="primary" pill>
                        {foodItems.selections.length}
                    </Badge>
                </ListGroup.Item>
            </ListGroup>

            <ListGroup as="ol">
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Món uống</div>
                        <GridCard iSelects={drinkItems} valueCheck={handleValueCheck} />
                    </div>
                    <Badge bg="primary" pill>
                        {drinkItems.selections.length}
                    </Badge>
                </ListGroup.Item>
            </ListGroup> */}
        </>
    );
}

export default Menu;
import { useState } from "react";
import GridCard from "./grid.cards";

interface IProps {
    iSelects: ISelections
    selects: ISelections;
    setSelects: (value: ISelections) => void
    acceptStatus: boolean
}

const FoodCard = (props: IProps) => {
    const { iSelects, selects, setSelects, acceptStatus } = props

    const foodItems: ISelections = { selections: iSelects.selections.filter(item => item.item.type === 1) }

    console.log(">>>>>>>>FoodCard un-check-acceptStatus: ", acceptStatus)
    if (acceptStatus) {
        selects.selections.map(item => {
            const newItem = iSelects.selections.find(cat => cat.item.id === item.item.id)
            if (newItem) {
                // item.selected = false
                console.log(">>>>>>>>un-check: ", newItem)
                handleValueCheck()
            }
        })
    }

    function handleValueCheck() {
        console.log(">>>>>>>>handleValueCheck: ")
        return 0
    }

    return (
        <>
            <GridCard iSelects={foodItems} selects={selects} setSelects={setSelects} valueCheck={handleValueCheck} />
        </>
    );
}

export default FoodCard;
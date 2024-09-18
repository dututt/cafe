import { useEffect } from "react";
import GridCard from "./grid.cards";

interface IProps {
    iSelects: ISelections
    handleValueCheck: (value: ISelection) => number
    trackingOrderTable: ITrackingOrderTable
}

const FoodCard = (props: IProps) => {
    const { iSelects, handleValueCheck, trackingOrderTable } = props

    const foodItems: ISelections = { selections: iSelects.selections.filter(item => item.item.type === 1) }

    return (
        <>
            <GridCard iSelects={foodItems} valueCheck={handleValueCheck} />
        </>
    );
}

export default FoodCard;
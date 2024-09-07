'use client'
import GridCard from "./grid.cards";

interface IProps {
    iSelects: ISelections
    handleValueCheck: (value: ISelection) => number
}

const DrinkCard = (props: IProps) => {
    const { iSelects, handleValueCheck } = props

    const drinkItems: ISelections = { selections: iSelects.selections.filter(item => item.item.type === 2) }

    return (
        <>
            <GridCard iSelects={drinkItems} valueCheck={handleValueCheck} />
        </>
    );
}

export default DrinkCard;
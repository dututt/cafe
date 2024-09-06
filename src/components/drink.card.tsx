'use client'
import GridCard from "./grid.cards";

interface IProps {
    iSelects: ISelections
    selects: ISelections;
    setSelects: (value: ISelections) => void
    acceptStatus: boolean
}

const DrinkCard = (props: IProps) => {
    const { iSelects, selects, setSelects, acceptStatus } = props

    const drinkItems: ISelections = { selections: iSelects.selections.filter(item => item.item.type === 2) }

    if (acceptStatus) {
        selects.selections.map(item => {
            drinkItems.selections.find(cat => {
                if (cat.item.id === item.item.id) {
                    cat.selected = false
                    handleValueCheck()
                }
            })

        })
    }

    function handleValueCheck() {
        return 0
    }

    return (
        <>
            <GridCard iSelects={drinkItems} selects={selects} setSelects={setSelects} valueCheck={handleValueCheck} />
        </>
    );
}

export default DrinkCard;
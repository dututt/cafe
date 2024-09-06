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

    if (acceptStatus) {
        selects.selections.map(item => {
            iSelects.selections.find(cat => {
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
            <GridCard iSelects={foodItems} selects={selects} setSelects={setSelects} valueCheck={handleValueCheck} />
        </>
    );
}

export default FoodCard;
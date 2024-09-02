'use client'
import GridCard from "./grid.cards";

interface IProps {
    items: ICatalogPrice[]
    selects: ISelections;
    setSelects: (value: ISelections) => void
}

const DrinkCard = (props: IProps) => {
    const { items, selects, setSelects } = props

    const cats = items.filter(cat => cat?.type === 1)
    return (
        <>
            <GridCard items={cats} selects={selects} setSelects={setSelects} />
        </>
    );
}

export default DrinkCard;
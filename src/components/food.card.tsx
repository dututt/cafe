import GridCard from "./grid.cards";

interface IProps {
    items: ICatalogPrice[]
    selects: ISelections;
    setSelects: (value: ISelections) => void
}

const FoodCard = (props: IProps) => {
    const { items, selects, setSelects } = props

    const cats = items.filter(cat => cat?.type === 2)

    return (
        <>
            <GridCard items={cats} selects={selects} setSelects={setSelects} />
        </>
    );
}

export default FoodCard;
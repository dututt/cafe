import GridCard from "./grid.cards";

interface IProps {
    catalogs: ICatalog[];
    selects: ISelections;
    setSelects: (value: ISelections) => void
}

const FoodCard = (props: IProps) => {
    const { catalogs, selects, setSelects } = props

    const cats = catalogs.filter(cat => cat.type === 2)

    return (
        <>
            <GridCard catalogs={cats} selects={selects} setSelects={setSelects} />
        </>
    );
}

export default FoodCard;
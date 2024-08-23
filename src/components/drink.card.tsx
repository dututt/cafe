'use client'
import GridCard from "./grid.cards";

interface IProps {
    catalogs: ICatalog[];
    selects: ISelections;
    setSelects: (value: ISelections) => void
}

const DrinkCard = (props: IProps) => {
    const { catalogs, selects, setSelects } = props

    const cats = catalogs.filter(cat => cat.type === 1)

    return (
        <>
            <GridCard catalogs={cats} selects={selects} setSelects={setSelects} />
        </>
    );
}

export default DrinkCard;
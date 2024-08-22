'use client'
import GridCard from "./grid.cards";

interface IProps {
    catalogs: ICatalog[];
    selects: ISelections;
}

const DrinkCard = (props: IProps) => {
    const { catalogs, selects } = props
    const cats = catalogs.filter(cat => cat.type === 1)
    console.log(">>>>Drink catalogs: ", cats)

    return (
        <>
            <GridCard catalogs={cats} selects={selects} />
        </>
    );
}

export default DrinkCard;
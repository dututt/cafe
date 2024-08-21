import GridCard from "./grid.cards";

interface IProps {
    catalogs: ICatalog[];
    selects: ISelections;
}

const FoodCard = (props: IProps) => {
    const { catalogs, selects } = props
    const cats = catalogs.filter(cat => cat.type === 2)
    console.log(">>>>Food catalogs: ", [cats])

    return (
        <>
            <GridCard catalogs={cats} selects={selects} />
        </>
    );
}

export default FoodCard;
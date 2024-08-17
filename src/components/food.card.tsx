import GridCard from "./grid.cards";

interface IProps {
    catalogs: ICatalog[];
}

const FoodCard = (props: IProps) => {
    const { catalogs } = props;
    const cats = catalogs.filter(cat => cat.type === 2)
    return (
        <>
            <GridCard catalogs={cats} />
        </>
    );
}

export default FoodCard;
import GridCard from "./grid.cards";

interface IProps {
    catalogs: ICatalog[];
}

const DrinkCard = (props: IProps) => {
    const { catalogs } = props;
    const cats = catalogs.filter(cat => cat.type === 1)
    return (
        <>
            <GridCard catalogs={cats} />
        </>
    );
}

export default DrinkCard;
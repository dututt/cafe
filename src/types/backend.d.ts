interface ICatalog {
    id: number
    content: string
    author: string
    title: string
    type: number
    image: string
}



interface IProps {
    catalogs: ICatalog[];
}
'user client'
import useSWR, { Fetcher } from "swr";

interface Props {
    params: { slug: number }
}

const DetailUserPage = ({ params: { slug } }: Props) => {

    const fetcher: Fetcher<IUser, string> = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `/api/users/${slug}`,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
        }
    );

    if (isLoading) {
        return <>loading...</>
    }

    return (
        <div>
            Detail User ID: {data?.id}
        </div>
    )
}

export default DetailUserPage;
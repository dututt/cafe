import { revalidatePath } from 'next/cache';

export async function fetchDataAndRevalidate(url: string) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>00data from: ", url)
    const response = await fetch(url);
    const data = await response.json();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>data from: ", url, data)

    // Revalidate the path
    revalidatePath('/api/order-list');

    return data;
}

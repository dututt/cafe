import { revalidatePath } from 'next/cache';

export async function fetchDataAndRevalidate(url: string) {
    const response = await fetch(url);
    const data = await response.json();

    // Revalidate the path
    revalidatePath('/api/order-list');

    return data;
}

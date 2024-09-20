export async function fetchData(url: string) {
    // Replace with your actual data fetching logic
    // const response = await fetch('https://api.example.com/data');
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
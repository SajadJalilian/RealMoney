export async function fetchData(location) {
    const response = await fetch(location);
    if (!response.ok) {
        throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data;
};

export function readInput(inputId) {
    let inputElement;
    inputElement = document.getElementById(inputId);
    return inputElement.value;
}
export function showData() {
    const rawData = fetchData('./asset/Gold24Carat_min.json')

    // Reference to the table body
    const tableBody = document.querySelector('#myTable tbody');

    // Function to create rows and populate data
    function populateTable(items) {
        items.forEach(item => {
            const row = document.createElement('tr');
            // Main item cell
            const mainItemCell = document.createElement('td');
            mainItemCell.textContent = item.name;
            row.appendChild(mainItemCell);
            // Subitems cell
            const subitemsCell = document.createElement('td');
            const subitemsList = document.createElement('ul');
            item.subitems.forEach(subitem => {
                const subitemLi = document.createElement('li');
                subitemLi.textContent = subitem;
                subitemsList.appendChild(subitemLi);
            });
            subitemsCell.appendChild(subitemsList);
            row.appendChild(subitemsCell);
            // Append row to the table body
            tableBody.appendChild(row);
        });
    }

    // Populate the table with data
    populateTable(items);

}
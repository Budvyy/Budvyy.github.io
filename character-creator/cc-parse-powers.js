// cc-parse-powers.js

// Specify the path to your TSV file
const tsvFilePath = 'powers.tsv'; // Adjust the path if your TSV is in a subfolder

// Function to fetch TSV data
async function fetchTSV(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tsvText = await response.text();
        return tsvText;
    } catch (error) {
        console.error('Error fetching TSV file:', error);
        document.getElementById('listContainer').innerHTML = `<p style="color: red;">Failed to load data.</p>`;
    }
}

// Function to parse TSV data
function parseTSV(tsv) {
    const lines = tsv.trim().split('\n');
    const headers = lines[0].split('\t');
    const data = lines.slice(1).map(line => {
        const values = line.split('\t');
        let obj = {};
        headers.forEach((header, index) => { // Include all headers
            obj[header.trim()] = values[index]?.trim() || ''; // Handle missing values and trim whitespace
        });
        return obj;
    });
    return data;
}

// Function to display parsed data as a list (optional)
// You can remove or modify this if not needed
function displayDataAsList(data) {
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = ''; // Clear existing content

    if (data.length === 0) {
        listContainer.innerHTML = '<p>No data available.</p>';
        return;
    }

    const ul = document.createElement('ul');

    data.forEach(row => {
        const li = document.createElement('li');
        
        // Create title element
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = row.title;
        li.appendChild(titleDiv);

        // Create categories list
        const categoriesUl = document.createElement('ul');

        Object.keys(row).forEach(key => {
            if (key !== 'title') { // Skip the title key
                const categoryLi = document.createElement('li');
                categoryLi.className = 'category';

                const categoryStrong = document.createElement('strong');
                categoryStrong.textContent = key + ':';
                categoryLi.appendChild(categoryStrong);

                const categoryText = document.createTextNode(' ' + row[key]);
                categoryLi.appendChild(categoryText);

                categoriesUl.appendChild(categoryLi);
            }
        });

        li.appendChild(categoriesUl);
        ul.appendChild(li);
    });

    listContainer.appendChild(ul);
}

// Initialize the parser and display on page load
document.addEventListener('DOMContentLoaded', async () => {
    const tsvData = await fetchTSV(tsvFilePath);
    if (tsvData) {
        const parsedData = parseTSV(tsvData);
        displayDataAsList(parsedData); // Optional
        window.powersData = parsedData; // Export parsed data to global scope
    }
});
async function fetchData(pname, params) {
    let url = `https://sql.lavro.ru/call.php?pname=${pname}&db=277446`;

    params.forEach((param, index) => {
        url += `&p${index + 1}=${param}`;
    });

    url += '&format=columns';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(
            'There has been a problem with your fetch operation:',
            error
        );
        throw error;
    }
}
const fs = require('fs').promises; // Assuming Node.js environment and fs is already imported

// Utility function to create a delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadAndAddIcons() {
    try {
        const data = await fs.readFile('iconNames.json', 'utf8');
        const iconNames = JSON.parse(data);

        for (const iconName of iconNames) {
            await fetchData('addSymbol', [iconName])
                .then(() => {
                    console.log(`${iconName} added successfully`);
                })
                .catch((err) => {
                    console.error(`Error adding ${iconName}:`, err);
                });
            await delay(1000); // Wait for 1 second before proceeding to the next iteration
        }
    } catch (error) {
        console.error('Failed to load icon names:', error);
    }
}

loadAndAddIcons();

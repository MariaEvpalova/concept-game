const fs = require('fs');
const path = require('path');

const iconsDir = './icons';
const outputFile = './iconNames.json';

fs.readdir(iconsDir, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        return;
    }

    const iconNames = files
        .filter((file) => path.extname(file).toLowerCase() === '.svg')
        .map((file) => path.basename(file, '.svg'));

    fs.writeFile(outputFile, JSON.stringify(iconNames, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('iconNames.json has been updated with SVG file names.');
        }
    });
});

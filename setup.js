const initSqlJs = require('sql.js');  // Import sql.js
const fs = require('fs');
const path = require('path');

// Get the current year
const currentYear = new Date().getFullYear();

// Initialize the SQL.js database
initSqlJs().then(SQL => {
    // Create a new database
    const db = new SQL.Database();

    // Create tables for 'years' and 'days'
    db.run(`
        CREATE TABLE years (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            year INTEGER, 
            folder_link TEXT
        );
        CREATE TABLE days (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            year_id INTEGER, 
            day INTEGER, 
            status TEXT, 
            folder_link TEXT,
            FOREIGN KEY(year_id) REFERENCES years(id)
        );
    `);

    console.log('Database and tables created successfully!');

    // Insert years into the 'years' table (2016 to current year)
    for (let year = 2016; year <= currentYear; year++) {
        const folderLink = `/${year}`;
        db.run(`INSERT INTO years (year, folder_link) VALUES (?, ?)`, [year, folderLink]);

        // Create folder for the year
        const yearFolderPath = path.join(__dirname, `${year}`);
        fs.mkdirSync(yearFolderPath, { recursive: true });
        console.log(`Folder created for year ${year}: ${yearFolderPath}`);

        // Insert days into the 'days' table for each year (1 to 25 days)
        for (let day = 1; day <= 25; day++) {
            // Pad days less than 10 with a leading zero
            const dayPadded = day < 10 ? `0${day}` : `${day}`;
            const dayFolderPath = path.join(yearFolderPath, `day${dayPadded}`);
            fs.mkdirSync(dayFolderPath, { recursive: true });

            // Create a placeholder file for each day
            fs.writeFileSync(path.join(dayFolderPath, `day${dayPadded}.txt`), `Day ${dayPadded} content for year ${year}`);

            // Insert day record into the database
            db.run(`INSERT INTO days (year_id, day, status, folder_link) VALUES (?, ?, ?, ?)`, 
                [year - 2015, day, 'pending', dayFolderPath]);
        }
    }

    console.log('Day folders and files created!');

    // Saving the database to a file
    const data = db.export();  // Export the database to a binary format
    const buffer = Buffer.from(data);  // Convert to Buffer
    fs.writeFileSync('advent_of_code.sqlite', buffer);  // Save to a file

    console.log('Database saved as advent_of_code.sqlite');
}).catch(err => {
    console.error('Error initializing SQL.js:', err);
});
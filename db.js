const initSqlJs = require('sql.js');  // Import sql.js
const fs = require('fs');             // File system module for reading the SQLite file

// Path to the SQLite database file
const dbPath = './advent_of_code.sqlite';

// Function to read the SQLite database and display the content
async function displayDbContent() {
    try {
        // Initialize sql.js
        const SQL = await initSqlJs();

        // Read the SQLite file as a binary buffer
        const fileBuffer = fs.readFileSync(dbPath);

        // Create a database instance from the file buffer
        const db = new SQL.Database(fileBuffer);

        // Function to display data from the 'years' table
        function displayYears() {
            const stmt = db.prepare('SELECT * FROM years ORDER BY year');
            console.log('\n--- Years ---');
            while (stmt.step()) {
                const row = stmt.getAsObject();
                console.log(`Year: ${row.year}, Folder Link: ${row.folder_link}`);
            }
        }

        // Function to display data from the 'days' table
        function displayDays() {
            const stmt = db.prepare(`
                SELECT d.day, d.status, d.folder_link, y.year
                FROM days d
                INNER JOIN years y ON d.year_id = y.id
                ORDER BY y.year, d.day
            `);
            console.log('\n--- Days ---');
            while (stmt.step()) {
                const row = stmt.getAsObject();
                console.log(`Year: ${row.year}, Day: ${row.day}, Status: ${row.status}, Folder Link: ${row.folder_link}`);
            }
        }

        // Display the data
        displayYears();
        displayDays();

        // Close the database instance
        db.close();
    } catch (err) {
        console.error('Error reading the database:', err);
    }
}

// Run the function to display the database content
displayDbContent();
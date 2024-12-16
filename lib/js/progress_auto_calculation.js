function countCompletedTasks() {
    const tableBody = document.getElementById("days-table");
    const rows = tableBody.getElementsByTagName("tr");
    let completedTasks = 0;
    let totalTasks = 0;

    // Iterate through each row
    for (let row of rows) {
        const part1Status = row.cells[2]?.textContent.trim();
        const part2Status = row.cells[4]?.textContent.trim();

        // Check if Part I is completed
        if (part1Status === "✅") {
            completedTasks++;
        }

        // Check if Part II is completed
        if (part2Status === "✅") {
            completedTasks++;
        }
    }

    // Calculate the percentage
    const percentage = Math.round((completedTasks / 50) * 100);

    return percentage + "%";
}

window.onload = function() {
    let count = countCompletedTasks();
    let progressValue = document.querySelector("#progressBar > p");
    let progressBar = document.querySelector("#progressBar");

    progressValue.innerText = count;
    progressBar.style.width = count;
};
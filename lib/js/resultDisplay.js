function resultDisplay(input, id = '#resultDisplay') {
    var resultDiv = document.querySelector(id);
    resultDiv.classList.add("updatedResult");

    // Clear existing content
    resultDiv.innerHTML = '';

    // Create a p element for the input content
    var result = document.createElement('pre');
    result.textContent = input;

    // Create a copy button
    var copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.classList.add('copyButton'); // Add optional styling class

    // Add event listener to the copy button
    copyButton.addEventListener('click', function () {
        // Create a temporary textarea to hold the text for copying
        var tempInput = document.createElement('textarea');
        tempInput.value = input; // Set the input value to the textarea
        document.body.appendChild(tempInput);
        tempInput.select(); // Select the text
        document.execCommand('copy'); // Copy the text to clipboard
        document.body.removeChild(tempInput); // Remove the textarea
        alert('Result copied to clipboard!'); // Notify user
    });

    // Append the p element and the button to the resultDiv
    resultDiv.appendChild(result);
    resultDiv.appendChild(copyButton);
}
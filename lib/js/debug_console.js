// Reference to the debug console div
const debugConsole = document.getElementById("debugConsole");

// Utility function to append log messages
function logToConsole(message, type = "log") {
    const msg = document.createElement("div");
    // Assign colors based on log type
    switch (type) {
        case "error":
            msg.style.color = "red";
            break;
        case "warn":
            msg.style.color = "yellow";
            break;
        case "info":
            msg.style.color = "blue";
            break;
        default:
            msg.style.color = "inherit";
    }
    msg.textContent = `[${type.toUpperCase()}]: ${message}`;
    debugConsole.appendChild(msg);
    debugConsole.scrollTop = debugConsole.scrollHeight; // Auto-scroll
}

// Overriding console methods
["log", "error", "warn", "info"].forEach((method) => {
    const originalMethod = console[method];
    console[method] = function (...args) {
        // Call the original console method
        originalMethod.apply(console, args);
        // Log to the custom console
        logToConsole(args.join(" "), method);
    };
});

// Global error handler for runtime errors
window.onerror = function (message, source, lineno, colno, error) {
    logToConsole(
        `Error: ${message} at ${source}:${lineno}:${colno}\n${error?.stack || ""}`,
        "error"
    );
    return true; // Prevent the default error handling (optional)
};

// Global handler for unhandled promise rejections
window.onunhandledrejection = function (event) {
    logToConsole(`Unhandled Rejection: ${event.reason}`, "error");
};

// Example function to test logging and error handling
function testFunction() {
    console.log("This is a log message.");
    console.warn("This is a warning.");
    console.error("This is an error!");
    console.info("Info messages are also logged.");

    // Trigger a runtime error
    nonExistentFunction();
}
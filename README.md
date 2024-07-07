
# GradualFade Payment Reminder

GradualFade is a JavaScript script designed to ensure timely payments from clients by gradually reducing the opacity of their website until payment is made. The script fetches due date, days deadline, and payment status from an external Google Sheet, making it easy to update and manage remotely.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [License](#license)

## Features

- **Automatic Opacity Reduction**: Gradually decreases website opacity based on overdue days.
- **Remote Management**: Fetches due date and payment status from a Google Sheet.
- **Visibility Restoration**: Restores full opacity once payment is marked as "paid" in the sheet.

## Installation

### Method 1: Directly in HTML File

1. **Open Your HTML File**: Open the HTML file of your website in a text editor.
2. **Add Script Before Closing `</body>` Tag**: Insert the script just before the closing `</body>` tag to ensure it runs after the entire page is loaded. This helps prevent any potential issues with elements not being available when the script runs.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <!-- Other head elements -->
</head>
<body>
    <!-- Your website content -->

    <!-- Add the script here -->
    <script>
        // Replace with your actual Sheet ID and API key
        const SHEET_ID = 'YOUR_SHEET_ID';
        const API_KEY = 'YOUR_API_KEY';

        // URL to fetch the data
        const url = `https://sheets.googleapis.com/v4/spreadsheets/\${SHEET_ID}/values/A1:C2?key=\${API_KEY}`;

        (function() {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const values = data.values;
                    const dueDate = new Date(values[1][0]);
                    const daysDeadline = parseInt(values[1][1]);
                    const status = values[1][2].toLowerCase();

                    if (status === 'paid') {
                        document.body.style.opacity = 1;
                        return;
                    }

                    const currentDate = new Date();
                    const daysPastDue = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24));

                    if (daysPastDue > 0) {
                        const daysRemaining = daysDeadline - daysPastDue;
                        const opacity = Math.max(0, Math.min(1, daysRemaining / daysDeadline));

                        document.body.style.opacity = opacity;
                    }
                })
                .catch(error => console.error('Error fetching configuration:', error));
        })();
    </script>
</body>
</html>
```

### Method 2: Using an External JavaScript File

1. **Create a JavaScript File**: Create a new JavaScript file (e.g., `gradualFade.js`) in your project's directory.
2. **Add Script to JavaScript File**: Copy the script into this file.

```javascript
// gradualFade.js

// Replace with your actual Sheet ID and API key
const SHEET_ID = 'YOUR_SHEET_ID';
const API_KEY = 'YOUR_API_KEY';

// URL to fetch the data
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:C2?key=${API_KEY}`;

(function() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const values = data.values;
            const dueDate = new Date(values[1][0]);
            const daysDeadline = parseInt(values[1][1]);
            const status = values[1][2].toLowerCase();

            if (status === 'paid') {
                document.body.style.opacity = 1;
                return;
            }

            const currentDate = new Date();
            const daysPastDue = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24));

            if (daysPastDue > 0) {
                const daysRemaining = daysDeadline - daysPastDue;
                const opacity = Math.max(0, Math.min(1, daysRemaining / daysDeadline));

                document.body.style.opacity = opacity;
            }
        })
        .catch(error => console.error('Error fetching configuration:', error));
})();
```

3. **Link JavaScript File in HTML**: Link the JavaScript file in your HTML file before the closing `</body>` tag.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <!-- Other head elements -->
</head>
<body>
    <!-- Your website content -->

    <!-- Link to the external JavaScript file -->
    <script src="path/to/your/gradualFade.js"></script>
</body>
</html>
```

## Usage

- The script calculates the difference between the current date and the specified due date.
- It then gradually decreases the opacity of the website's body based on the number of days past the due date.
- If the client does not pay within the specified deadline, the opacity will eventually reach 0, making the website invisible.
- If the client pays, the status in the Google Sheet should be updated to "paid", and the website will become fully visible again.

## Customization

- **Due Date**: Change the `dueDate` variable in the Google Sheet to the desired due date.
- **Days Deadline**: Change the `daysDeadline` variable in the Google Sheet to the number of days you want to allow before the site fully fades away.
- **Payment Status**: Change the `status` variable in the Google Sheet to "paid" once the client has made the payment.

Example:

| A          | B            | C       |
|------------|--------------|---------|
| dueDate    | daysDeadline | status  |
| 2024-07-01 | 60           | unpaid  |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

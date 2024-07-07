// Save this code in a file named gradualFade.js

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

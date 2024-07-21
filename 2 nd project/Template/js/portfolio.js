document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for each stock
    const stockData = {
        'APPL': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [150, 155, 160, 158],
            color: 'rgba(75, 192, 192, 1)'
        },
        'GOOGL': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [2730, 2740, 2720, 2750],
            color: 'rgba(54, 162, 235, 1)'
        },
        'AMZN': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [3300, 3320, 3310, 3330],
            color: 'rgba(255, 206, 86, 1)'
        },
        'MSFT': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [250, 252, 251, 255],
            color: 'rgba(153, 102, 255, 1)'
        }
    };

    // Calculate total profit/loss
    const portfolioTable = document.getElementById('portfolioTable');
    let totalProfitLoss = 0;
    if (portfolioTable) {
        for (const row of portfolioTable.rows) {
            const profitLoss = row.cells[5].textContent.replace('$', '');
            totalProfitLoss += parseFloat(profitLoss);
        }
        document.getElementById('totalProfitLoss').textContent = `$${totalProfitLoss}`;
    }

    // Show chart for each stock
    window.showChart = function(stockSymbol) {
        const chartSection = document.getElementById('chartSection');
        const chartTitle = document.getElementById('chartTitle');
        const stockChart = document.getElementById('stockChart').getContext('2d');

        chartTitle.textContent = `${stockSymbol} Stock Chart`;

        // Clear previous chart
        if (window.stockChartInstance) {
            window.stockChartInstance.destroy();
        }

        const data = stockData[stockSymbol];

        // Create new chart
        window.stockChartInstance = new Chart(stockChart, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: `${stockSymbol} Price`,
                    data: data.data,
                    borderColor: data.color,
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });

        chartSection.style.display = 'block';
    }
});

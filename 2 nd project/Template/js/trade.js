document.addEventListener('DOMContentLoaded', () => {
    const tradeForm = document.getElementById('tradeForm');
    const executedTradesTable = document.getElementById('executedTradesTable');
    const pendingTradesTable = document.getElementById('pendingTradesTable');

    tradeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const stockSymbol = event.target.tradeStock.value.toUpperCase();
        const tradeType = event.target.tradeType.value;
        const shares = parseInt(event.target.tradeShares.value);
        const price = parseFloat(event.target.tradePrice.value);
        const total = (shares * price).toFixed(2);
        const status = 'Pending';

        const newRow = `
            <tr>
                <td>${stockSymbol}</td>
                <td>${tradeType.charAt(0).toUpperCase() + tradeType.slice(1)}</td>
                <td>${shares}</td>
                <td>$${price}</td>
                <td>$${total}</td>
                <td class="${status.toLowerCase()}">${status}</td>
            </tr>
        `;

        pendingTradesTable.innerHTML += newRow;

        tradeForm.reset();
    });
});

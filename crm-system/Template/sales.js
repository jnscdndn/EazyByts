// Example data (replace with actual data handling logic)
let salesData = [
    { id: 1, name: 'Product A', amount: 1000, date: '2023-06-15' },
    { id: 2, name: 'Product B', amount: 1500, date: '2023-07-01' },
    { id: 3, name: 'Product C', amount: 2000, date: '2023-07-20' }
];

// Function to display sales
function displaySales() {
    const salesList = document.getElementById('salesList');
    salesList.innerHTML = '';

    salesData.forEach(sale => {
        const saleItem = document.createElement('div');
        saleItem.classList.add('sale-item');
        saleItem.innerHTML = `
            <h3>${sale.name}</h3>
            <p>Amount: $${sale.amount}</p>
            <p>Date: ${sale.date}</p>
            <div class="btn-group">
                <button class="btn" onclick="openEditSaleModal(${sale.id})">Edit</button>
                <button class="btn" onclick="deleteSale(${sale.id})">Delete</button>
            </div>
        `;
        salesList.appendChild(saleItem);
    });
}

// Function to open Add Sale modal
function openAddSaleModal() {
    document.getElementById('modalTitle').textContent = 'Add Sale';
    document.getElementById('saleForm').reset(); // Reset form fields
    document.getElementById('saleId').value = ''; // Ensure saleId is empty
    document.getElementById('saleModal').style.display = 'block';
}

// Function to open Edit Sale modal
function openEditSaleModal(id) {
    const sale = salesData.find(sale => sale.id === id);
    if (sale) {
        document.getElementById('modalTitle').textContent = 'Edit Sale';
        document.getElementById('saleId').value = sale.id;
        document.getElementById('name').value = sale.name;
        document.getElementById('amount').value = sale.amount;
        document.getElementById('date').value = sale.date;
        document.getElementById('saleModal').style.display = 'block';
    }
}

// Function to close modal
function closeSaleModal() {
    document.getElementById('saleModal').style.display = 'none';
}

// Function to add or edit a sale
function saveSale(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById('saleId').value;
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    if (id) {
        // Edit sale
        const index = salesData.findIndex(sale => sale.id === parseInt(id));
        if (index !== -1) {
            salesData[index] = { id: parseInt(id), name, amount, date };
        }
    } else {
        // Add new sale
        const newSale = {
            id: generateId(),
            name,
            amount,
            date
        };
        salesData.push(newSale);
    }

    closeSaleModal();
    displaySales();
}

// Function to delete a sale
function deleteSale(id) {
    salesData = salesData.filter(sale => sale.id !== id);
    displaySales();
}

// Function to generate a unique ID (example)
function generateId() {
    return salesData.length > 0 ? Math.max(...salesData.map(sale => sale.id)) + 1 : 1;
}

// Event listener for form submission
document.getElementById('saleForm').addEventListener('submit', saveSale);

// Initial display of sales
displaySales();

/*
Code adapted from samples provided by Oregon State University, CS 340 - Databases.
    - URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
    - Date Accessed:
        - Various dates
        - First Access: 2024/07/19
        - Most Recent Access: 2024/07/25
*/

'use strict';

// Get the objects we need to modify
let addTransactionForm = document.getElementById('add-transaction-form');

// Modify the objects we need
addTransactionForm.addEventListener("submit", (e) => {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBuyerID = document.getElementById("buyer_select_add");
    let inputPropertyID = document.getElementById("property_select_add");
    let inputDate = document.getElementById("input-date");
    let inputPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let buyerIDValue = parseInt(inputBuyerID.value);
    let propertyIDValue = parseInt(inputPropertyID.value);
    let dateValue = inputDate.value;
    let priceValue = parseInt(inputPrice.value);
    
    // Catch NULL-equivalent values for attributes with NOT NULL constraints
    // Prevents submission of form data and reloads page
    if (isNaN(buyerIDValue) ||
        isNaN(propertyIDValue) ||
        dateValue === "" ||
        isNaN(priceValue)) {

        location.reload(true);
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        buyerID: buyerIDValue,
        propertyID: propertyIDValue,
        date: dateValue,
        price: priceValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_transaction", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
    
            // Add the new data to the table
            addRowToTable(xhttp.response);
    
            // Clear the input fields for another transaction
            inputBuyerID.value = '';
            inputPropertyID.value = '';
            inputDate.value = '';
            inputPrice.value = '';

            location.reload(true);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        };
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Creates a single row from an Object representing a single record from Transactions
let addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("transaction-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and all data cells
    let row = document.createElement("TR");
    let transactionIDCell = document.createElement("TD");
    let buyerIDCell = document.createElement("TD");
    let buyerFirstNameCell = document.createElement("TD");
    let buyerLastNameCell = document.createElement("TD");
    let sellerIDCell = document.createElement("TD");
    let sellerFirstNameCell = document.createElement("TD");
    let sellerLastNameCell = document.createElement("TD");
    let propertyIDCell = document.createElement("TD");
    let propertyAddressCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let td_edit = document.createElement('TD');
    let td_delete = document.createElement('TD');

    // Fill the cells with correct data
    transactionIDCell.innerText = newRow.transactionID;
    dateCell.innerText = newRow["Date"];
    priceCell.innerText = newRow["Price"];
    propertyIDCell.innerText = newRow.propertyID;
    propertyAddressCell.innerText = newRow["Address"];
    sellerIDCell.innerText = newRow.sellerID;
    sellerFirstNameCell.innerText = newRow["Seller First Name"];
    sellerLastNameCell.innerText = newRow["Seller Last Name"];
    buyerIDCell.innerText = newRow.buyerID;
    buyerFirstNameCell.innerText = newRow["Buyer First Name"];
    buyerLastNameCell.innerText = newRow["Buyer Last Name"];
    td_edit.innerHTML = `<a href='#' onClick=\"updateTransaction(${newRow.transactionID})\">Edit</a>`;
    td_delete.innerHTML = `<a href='#' onclick=\"deleteTransaction(${newRow.transactionID})\">Delete</a>`;
    
    // Add the cells to the row 
    row.appendChild(td_edit);
    row.appendChild(td_delete);
    row.appendChild(transactionIDCell);
    row.appendChild(dateCell);
    row.appendChild(priceCell);
    row.appendChild(propertyIDCell);
    row.appendChild(propertyAddressCell);
    row.appendChild(sellerIDCell);
    row.appendChild(sellerFirstNameCell);
    row.appendChild(sellerLastNameCell);
    row.appendChild(buyerIDCell);
    row.appendChild(buyerFirstNameCell);
    row.appendChild(buyerLastNameCell);

    // Set row attributes for use in pre-filling data on edit / delete operations
    row.setAttribute('id', "transaction-" + `${newRow["transactionID"]}`);
    row.setAttribute('transactionID', newRow["transactionID"]);
    row.setAttribute('buyerID', newRow["buyerID"]);
    row.setAttribute('buyerName', newRow["Buyer First Name"] + " " + newRow["Buyer Last Name"]);
    row.setAttribute('sellerID', newRow["sellerID"]);
    row.setAttribute('sellerName', newRow["Seller First Name"] + " " + newRow["Seller Last Name"]);
    row.setAttribute('propertyID', newRow["propertyID"]);
    row.setAttribute('propertyAddress', newRow["Address"]);
    row.setAttribute('date', newRow["Date"]);
    row.setAttribute('price', newRow["Price"]);

    // Add the row to the table
    currentTable.appendChild(row);

};
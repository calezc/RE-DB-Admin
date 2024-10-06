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
let addPropertyForm = document.getElementById('add-property-form');

// Modify the objects we need
addPropertyForm.addEventListener("submit", (e) => {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSellerID = document.getElementById("seller_select_add");
    let inputAddress = document.getElementById("input-address");

    // Get the values from the form fields
    let sellerIDValue = parseInt(inputSellerID.value);
    let addressValue = inputAddress.value;
    
    // Catch NULL-equivalent values for attributes with NOT NULL constraints
    // Prevents submission of form data and reloads page
    if (isNaN(sellerIDValue) ||
        addressValue === "") {

        location.reload(true);
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        sellerID: sellerIDValue,
        address: addressValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_property", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
    
            // Add the new data to the table
            addRowToTable(xhttp.response);
    
            // Clear the input fields for another property
            inputSellerID.value = '';
            inputAddress.value = '';

            location.reload(true);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        };
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Creates a single row from an Object representing a single record from Properties
let addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("property-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and all data cells
    let row = document.createElement("TR");
    let propertyIDCell = document.createElement("TD");
    let propertyAddressCell = document.createElement("TD");
    let sellerIDCell = document.createElement("TD");
    let sellerFirstNameCell = document.createElement("TD");
    let sellerLastNameCell = document.createElement("TD");
    let td_edit = document.createElement('TD');
    let td_delete = document.createElement('TD');

    // Fill the cells with correct data
    propertyIDCell.innerText = newRow.propertyID;
    propertyAddressCell.innerText = newRow["Address"];
    sellerIDCell.innerText = newRow.sellerID;
    sellerFirstNameCell.innerText = newRow["Seller First Name"];
    sellerLastNameCell.innerText = newRow["Seller Last Name"];
    td_edit.innerHTML = `<a href='#' onClick=\"updateProperty(${newRow.propertyID})\">Edit</a>`;
    td_delete.innerHTML = `<a href='#' onclick=\"deleteProperty(${newRow.propertyID})\">Delete</a>`;
    
    // Add the cells to the row 
    row.appendChild(td_edit);
    row.appendChild(td_delete);
    row.appendChild(propertyIDCell);
    row.appendChild(propertyAddressCell);
    row.appendChild(sellerIDCell);
    row.appendChild(sellerFirstNameCell);
    row.appendChild(sellerLastNameCell);

    // Set row attributes for use in pre-filling data on edit / delete operations
    row.setAttribute('id', "property-" + `${newRow["propertyID"]}`);
    row.setAttribute('propertyID', newRow["propertyID"]);
    row.setAttribute('propertyAddress', newRow["Address"]);
    row.setAttribute('sellerID', newRow["sellerID"]);
    row.setAttribute('sellerName', newRow["Seller First Name"] + " " + newRow["Seller Last Name"]);

    // Add the row to the table
    currentTable.appendChild(row);

};
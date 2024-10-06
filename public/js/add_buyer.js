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
let addBuyerForm = document.getElementById('add-buyer-form');

// Modify the objects we need
addBuyerForm.addEventListener("submit", (e) => {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-firstName");
    let inputLastName = document.getElementById("input-lastName");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");
    let inputAgent = document.getElementById("agent_select_add");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let agentValue = inputAgent.value;
    
    // Catch NULL-equivalent values for attributes with NOT NULL constraints
    // Prevents submission of form data and reloads page
    if (firstNameValue === "" ||
        lastNameValue === "" ||
        emailValue === "" ||
        phoneValue === "") {

        location.reload(true);
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneValue,
        agent: agentValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_buyer", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
    
            // Add the new data to the table
            addRowToTable(xhttp.response);
    
            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputAgent.value = '';

            location.reload(true);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        };
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Creates a single row from an Object representing a single record from Buyers
let addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("buyer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and all data cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let agentIDCell = document.createElement("TD");
    let agentNameCell = document.createElement("TD");
    let td_edit = document.createElement('TD');
    let td_delete = document.createElement('TD');

    // Fill the cells with correct data
    idCell.innerText = newRow.buyerID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;
    agentIDCell.innerText = newRow.agentID;
    agentNameCell.innerText = newRow.Agent_Name;
    
    td_edit.innerHTML = `<a href='#' onClick=\"updateBuyer(${newRow.buyerID})\">Edit</a>`;
    td_delete.innerHTML = `<a href='#' onclick=\"deleteBuyer(${newRow.buyerID})\">Delete</a>`;
    
    // Add the cells to the row 
    row.appendChild(td_edit);
    row.appendChild(td_delete);
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(agentIDCell);
    row.appendChild(agentNameCell);

    // Set row attributes for use in pre-filling data on edit / delete operations
    row.setAttribute('buyerID', newRow.buyerID);
    row.setAttribute('buyerFirstName', newRow.firstName);
    row.setAttribute('buyerLastName', newRow.lastName);
    row.setAttribute('buyerEmail', newRow.email);
    row.setAttribute('buyerPhone', newRow.phone);

    // Add the row to the table
    currentTable.appendChild(row);

};
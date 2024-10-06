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
let deleteTransactionForm = document.getElementById('delete-transaction-form');

// Modify the objects we need
deleteTransactionForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTransactionID = document.getElementById("delete_transactionID");

    // Get the values from the form fields
    let transactionIDValue = inputTransactionID.value;

    // Put our data we want to send in a javascript object
    let data = {
        transactionID: transactionIDValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-transaction", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Delete record from table
            deleteRow(xhttp.response);

            location.reload(true);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function deleteRow(data) {
    let parsedData = JSON.parse(data);
    
    let delete_row = document.getElementById(`transaction-${parsedData}`);
    let row_parent = delete_row.parentElement;

    row_parent.removeChild(delete_row);
};

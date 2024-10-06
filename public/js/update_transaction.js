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
let updateTransactionForm = document.getElementById('update-transaction-form');

// Modify the objects we need
updateTransactionForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data 
    let inputTransactionID = document.getElementById("update_transactionID");
    let inputBuyerID = document.getElementById("buyer_select_update");
    let inputPropertyID = document.getElementById("property_select_update");
    let inputDate = document.getElementById("update-date");
    let inputPrice = document.getElementById("update-price");

    // Get the values from the form fields
    let transactionIDValue = parseInt(inputTransactionID.value);
    let buyerIDValue = parseInt(inputBuyerID.value);
    let propertyIDValue = parseInt(inputPropertyID.value);
    let dateValue = inputDate.value;
    let priceValue = parseInt(inputPrice.value);
    
    // If any required fields are blank, return without submitting.    
    if (isNaN(buyerIDValue) ||
        isNaN(propertyIDValue) ||
        dateValue === "" ||
        isNaN(priceValue)) {

        location.reload(true);
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        transactionID: transactionIDValue,
        buyerID: buyerIDValue,
        propertyID: propertyIDValue,
        date: dateValue,
        price: priceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-transaction", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update table with new data
            updateRow(xhttp.response);

            location.reload(true);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data) {
    let parsedData = JSON.parse(data);
    
    let update_row = document.getElementById(`transaction-${parsedData[0].transactionID}`);
    let td_date = update_row.getElementsByTagName("td")[3];
    let td_price = update_row.getElementsByTagName("td")[4];
    let td_propertyID = update_row.getElementsByTagName("td")[5];
    let td_address = update_row.getElementsByTagName("td")[6];
    let td_sellerID = update_row.getElementsByTagName("td")[7];
    let td_sellerFirstName = update_row.getElementsByTagName("td")[8];
    let td_sellerLastName = update_row.getElementsByTagName("td")[9];
    let td_buyerID = update_row.getElementsByTagName("td")[10];
    let td_buyerFirstName = update_row.getElementsByTagName("td")[11];
    let td_buyerLastName = update_row.getElementsByTagName("td")[12];

    td_date.innerText = parsedData[0]["Date"];
    td_price.innerText = parsedData[0]["Price"];
    td_propertyID.innerText = parsedData[0]["propertyID"];
    td_address.innerText = parsedData[0]["Address"];
    td_sellerID.innerText = parsedData[0]["sellerID"];
    td_sellerFirstName.innerText = parsedData[0]["Seller First Name"];
    td_sellerLastName.innerText = parsedData[0]["Seller Last Name"];
    td_buyerID.innerText = parsedData[0]["buyerID"];
    td_buyerFirstName.innerText = parsedData[0]["Buyer First Name"];
    td_buyerLastName.innerText = parsedData[0]["Buyer Last Name"];

    // Update row attributes for use in pre-filling data on edit / delete operations
    update_row.setAttribute('id', "transaction-" + `${parsedData[0]["transactionID"]}`);
    update_row.setAttribute('transactionID', parsedData[0]["transactionID"]);
    update_row.setAttribute('buyerID', parsedData[0]["buyerID"]);
    update_row.setAttribute('buyerName', parsedData[0]["Buyer First Name"] + " " + parsedData[0]["Buyer Last Name"]);
    update_row.setAttribute('sellerID', parsedData[0]["sellerID"]);
    update_row.setAttribute('sellerName', parsedData[0]["Seller First Name"] + " " + parsedData[0]["Seller Last Name"]);
    update_row.setAttribute('propertyID', parsedData[0]["propertyID"]);
    update_row.setAttribute('propertyAddress', parsedData[0]["Address"]);
    update_row.setAttribute('date', parsedData[0]["Date"]);
    update_row.setAttribute('price', parsedData[0]["Price"]);
};

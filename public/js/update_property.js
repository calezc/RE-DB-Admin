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
let updatePropertyForm = document.getElementById('update-property-form');

// Modify the objects we need
updatePropertyForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPropertyID = document.getElementById("update_propertyID");
    let inputSellerID = document.getElementById("seller_select_update");
    let inputAddress = document.getElementById("update-address");

    // Get the values from the form fields
    let propertyIDValue = parseInt(inputPropertyID.value);
    let sellerIDValue = parseInt(inputSellerID.value);
    let addressValue = inputAddress.value;
    
    // If any required fields are blank, return without submitting.    
    if (isNaN(propertyIDValue) ||
        isNaN(sellerIDValue) ||
        addressValue === "") {

        location.reload(true);
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        propertyID: propertyIDValue,
        sellerID: sellerIDValue,
        address: addressValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-property", true);
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

    let update_row = document.getElementById(`property-${parsedData[0].propertyID}`);
    let td_propertyID = update_row.getElementsByTagName("td")[2];
    let td_address = update_row.getElementsByTagName("td")[3];
    let td_sellerID = update_row.getElementsByTagName("td")[4];
    let td_sellerFirstName = update_row.getElementsByTagName("td")[5];
    let td_sellerLastName = update_row.getElementsByTagName("td")[6];

    td_propertyID.innerText = parsedData[0]["propertyID"];
    td_address.innerText = parsedData[0]["Address"];
    td_sellerID.innerText = parsedData[0]["sellerID"];
    td_sellerFirstName.innerText = parsedData[0]["Seller First Name"];
    td_sellerLastName.innerText = parsedData[0]["Seller Last Name"];

    // Update row attributes for use in pre-filling data on edit / delete operations
    update_row.setAttribute('id', "property-" + `${parsedData[0]["propertyID"]}`);
    update_row.setAttribute('propertyID', parsedData[0]["propertyID"]);
    update_row.setAttribute('propertyAddress', parsedData[0]["Address"]);
    update_row.setAttribute('sellerID', parsedData[0]["sellerID"]);
    update_row.setAttribute('sellerName', parsedData[0]["Seller First Name"] + " " + parsedData[0]["Seller Last Name"]);
};

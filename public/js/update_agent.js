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
let updateAgentForm = document.getElementById('update-agent-form');

// Modify the objects we need
updateAgentForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAgentID = document.getElementById("update_agentID")
    let inputFirstName = document.getElementById("update_firstName");
    let inputLastName = document.getElementById("update_lastName");
    let inputEmail = document.getElementById("update_email");
    let inputPhone = document.getElementById("update_phone");

    // Get the values from the form fields
    let agentIDValue = inputAgentID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    
    // If any required fields are blank, return without submitting.
    if (firstNameValue === "" ||
        lastNameValue === "" ||
        emailValue === "" ||
        phoneValue === "") {
        
        location.reload(true);
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        agentID: agentIDValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-agent", true);
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
    
    let update_row = document.getElementById(`agent-${parsedData[0].agentID}`);
    let td_firstName = update_row.getElementsByTagName("td")[3];
    let td_lastName = update_row.getElementsByTagName("td")[4];
    let td_email = update_row.getElementsByTagName("td")[5];
    let td_phone = update_row.getElementsByTagName("td")[6];

    td_firstName.innerText = parsedData[0]["First Name"];
    td_lastName.innerText = parsedData[0]["Last Name"];
    td_email.innerText = parsedData[0]["Email"];
    td_phone.innerText = parsedData[0]["Phone"];

    // Update row attributes for use in pre-filling data on edit / delete operations
    update_row.setAttribute('agentFirstName', parsedData[0]["First Name"]);
    update_row.setAttribute('agentLastName', parsedData[0]["Last Name"]);
    update_row.setAttribute('agentEmail', parsedData[0]["Email"]);
    update_row.setAttribute('agentPhone', parsedData[0]["Phone"]);
};

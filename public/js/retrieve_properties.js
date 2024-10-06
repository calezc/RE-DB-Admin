/*
Code was created with reference to sample material provided by Oregon State University, CS 290:
    - URL: https://canvas.oregonstate.edu/courses/1945984/pages/exploration-writing-asynchronous-code?module_item_id=23863238
    - Date Accessed: 2024/08/02
*/

'use strict';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Populate records table
        let response = await fetch('/properties');
        let rows = await response.json();

        const table_headers = document.getElementById("property-table-headers");
        const table_body =  document.getElementById("property-table-body");

        let cols = 0;
        
        // Create Table Headers
        for (const key in rows[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            table_headers.appendChild(th);
            cols += 1;
        };

        // Create rows for each record
        for (const row in rows) {
            const tr = document.createElement('tr');
            table_body.appendChild(tr);
            const current = table_body.lastElementChild
            const td_edit = document.createElement('td');
            const td_delete = document.createElement('td');
            td_edit.innerHTML = `<a href='#' onClick=\"updateProperty(${rows[row].propertyID})\">Edit</a>`;
            td_delete.innerHTML = `<a href='#' onclick=\"deleteProperty(${rows[row].propertyID})\">Delete</a>`;
            current.appendChild(td_edit);
            current.appendChild(td_delete);
            for (const key in rows[row]) {
                const td = document.createElement('td');
                td.innerText = rows[row][key];
                current.appendChild(td);
                current.id = "property-" + `${rows[row]["propertyID"]}`
            };

            tr.setAttribute('id', "property-" + `${rows[row]["propertyID"]}`);
            tr.setAttribute('propertyID', rows[row]["propertyID"]);
            tr.setAttribute('sellerID', rows[row]["sellerID"]);
            tr.setAttribute('sellerName', rows[row]["Seller First Name"] + " " + rows[row]["Seller Last Name"]);
            tr.setAttribute('address', rows[row]["Address"]);
        };

        // Create row for "Add" Button
        const tr = document.createElement('tr');
        const td_add = document.createElement('td');
        td_add.colSpan = cols + 2;
        td_add.innerHTML = `<button type="button" id="add_button" onClick=\"newProperty()\">ADD PROPERTY</button>`;
        tr.append(td_add);
        table_body.append(tr);
        
        // Populate Sellers Drop-Downs
        response = await fetch('/sellers');
        rows = await response.json();

        const seller_select_add = document.getElementById("seller_select_add");
        const seller_select_update = document.getElementById("seller_select_update");

        // Create options for each Buyer
        for (const row in rows) {
            const option_add = document.createElement('option');
            const option_update = document.createElement('option');
            option_add.value = rows[row].sellerID;
            option_update.value = rows[row].sellerID;
            option_add.innerText = rows[row]["First Name"] + " " + rows[row]["Last Name"];
            option_update.innerText = rows[row]["First Name"] + " " + rows[row]["Last Name"];
            seller_select_add.appendChild(option_add);
            seller_select_update.appendChild(option_update);
        };
    } catch (error) {
        console.log(error);
    };
});
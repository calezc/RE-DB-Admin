/*
Code was created with reference to sample material provided by Oregon State University, CS 290:
    - URL: https://canvas.oregonstate.edu/courses/1945984/pages/exploration-writing-asynchronous-code?module_item_id=23863238
    - Date Accessed: 2024/08/02
*/

'use strict';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Populate records table
        let response = await fetch('/transactions');
        let rows = await response.json();

        const table_headers = document.getElementById("transaction-table-headers");
        const table_body =  document.getElementById("transaction-table-body");

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
            td_edit.innerHTML = `<a href='#' onClick=\"updateTransaction(${rows[row].transactionID})\">Edit</a>`;
            td_delete.innerHTML = `<a href='#' onclick=\"deleteTransaction(${rows[row].transactionID})\">Delete</a>`;
            current.appendChild(td_edit);
            current.appendChild(td_delete);
            for (const key in rows[row]) {
                const td = document.createElement('td');
                td.innerText = rows[row][key];
                // Reformat Date Strings
                if (key === "Date") {
                    let date = new Date(rows[row][key]);
                    let dateText = date.toDateString();
                    dateText = dateText.slice(4, 15);
                    td.innerText = dateText;
                };
                // Reformat Price Strings
                if (key === "Price") {
                    let price = Number(rows[row][key]);
                    price = price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
                    td.innerText = price;
                };
                current.appendChild(td);
                current.id = "transaction-" + `${rows[row]["transactionID"]}`
            };

            tr.setAttribute('id', "transaction-" + `${rows[row]["transactionID"]}`);
            tr.setAttribute('transactionID', rows[row]["transactionID"]);
            tr.setAttribute('buyerID', rows[row]["buyerID"]);
            tr.setAttribute('buyerName', rows[row]["Buyer First Name"] + " " + rows[row]["Buyer Last Name"]);
            tr.setAttribute('sellerID', rows[row]["sellerID"]);
            tr.setAttribute('sellerName', rows[row]["Seller First Name"] + " " + rows[row]["Seller Last Name"]);
            tr.setAttribute('propertyID', rows[row]["propertyID"]);
            tr.setAttribute('propertyAddress', rows[row]["Address"]);
            tr.setAttribute('date', rows[row]["Date"]);
            tr.setAttribute('price', rows[row]["Price"]);
        };

        // Create row for "Add" Button
        const tr = document.createElement('tr');
        const td_add = document.createElement('td');
        td_add.colSpan = cols + 2;
        td_add.innerHTML = `<button type="button" id="add_button" onClick=\"newTransaction()\">ADD TRANSACTION</button>`;
        tr.append(td_add);
        table_body.append(tr);
        
        // Populate Buyers Drop-Downs
        response = await fetch('/buyers');
        rows = await response.json();

        const buyer_select_add = document.getElementById("buyer_select_add");
        const buyer_select_update = document.getElementById("buyer_select_update");
        
        // Create options for each Buyer
        for (const row in rows) {
            const option_add = document.createElement('option');
            const option_update = document.createElement('option');
            option_add.value = rows[row].buyerID;
            option_update.value = rows[row].buyerID;
            option_add.innerText = rows[row]["First Name"] + " " + rows[row]["Last Name"];
            option_update.innerText = rows[row]["First Name"] + " " + rows[row]["Last Name"];
            buyer_select_add.appendChild(option_add);
            buyer_select_update.appendChild(option_update);
        };
        
        // Populate Properties Drop-Downs
        response = await fetch('/properties');
        rows = await response.json();

        const property_select_add = document.getElementById("property_select_add");
        const property_select_update = document.getElementById("property_select_update");
        
        // Create options for each Property
        for (const row in rows) {
            const option_add = document.createElement('option');
            const option_update = document.createElement('option');
            option_add.value = rows[row].propertyID;
            option_update.value = rows[row].propertyID;
            option_add.innerText = rows[row]["Address"];
            option_update.innerText = rows[row]["Address"];
            property_select_add.appendChild(option_add);
            property_select_update.appendChild(option_update);
        };
    } catch (error) {
        console.log(error);
    };
});
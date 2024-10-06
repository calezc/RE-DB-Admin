/*
Code was created with reference to sample material provided by Oregon State University, CS 290:
    - URL: https://canvas.oregonstate.edu/courses/1945984/pages/exploration-writing-asynchronous-code?module_item_id=23863238
    - Date Accessed: 2024/08/02
*/

'use strict';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Populate records table
        let response = await fetch('/buyers');
        let rows = await response.json();

        const table_headers = document.getElementById("buyer-table-headers");
        const table_body =  document.getElementById("buyer-table-body");

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
            td_edit.innerHTML = `<a href='#' onClick=\"updateBuyer(${rows[row].buyerID})\">Edit</a>`;
            td_delete.innerHTML = `<a href='#' onclick=\"deleteBuyer(${rows[row].buyerID})\">Delete</a>`;
            current.appendChild(td_edit);
            current.appendChild(td_delete);
            for (const key in rows[row]) {
                const td = document.createElement('td');
                td.innerText = rows[row][key];
                current.appendChild(td);
                current.id = "buyer-" + `${rows[row]["buyerID"]}`
            };

            tr.setAttribute('id', "buyer-" + `${rows[row].buyerID}`);
            tr.setAttribute('buyerID', rows[row]["buyerID"]);
            tr.setAttribute('buyerFirstName', rows[row]["First Name"]);
            tr.setAttribute('buyerLastName', rows[row]["Last Name"]);
            tr.setAttribute('buyerEmail', rows[row]["Email"]);
            tr.setAttribute('buyerPhone', rows[row]["Phone"]);
        };

        // Create row for "Add" Button
        const tr = document.createElement('tr');
        const td_add = document.createElement('td');
        td_add.colSpan = cols + 2;
        td_add.innerHTML = `<button type="button" id="add_button" onClick=\"newBuyer()\">ADD BUYER</button>`;
        tr.append(td_add);
        table_body.append(tr);
        
        // Populate Agents Drop-Downs
        response = await fetch('/agents');
        rows = await response.json();

        const agent_select_add = document.getElementById("agent_select_add");
        const agent_select_update = document.getElementById("agent_select_update");
        
        // Create options for each Agent
        for (const row in rows) {
            const option_add = document.createElement('option');
            const option_update = document.createElement('option');
            option_add.value = rows[row].agentID;
            option_update.value = rows[row].agentID;
            option_add.innerText = rows[row]["First Name"] + " " + rows[row]["Last Name"];
            option_update.innerText = rows[row]["First Name"] + " " + rows[row]["Last Name"];
            agent_select_add.appendChild(option_add);
            agent_select_update.appendChild(option_update);
        };
    } catch (error) {
        console.log(error);
    };
});
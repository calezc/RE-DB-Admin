/*
Code was created with reference to sample material provided by Oregon State University, CS 290:
    - URL: https://canvas.oregonstate.edu/courses/1945984/pages/exploration-writing-asynchronous-code?module_item_id=23863238
    - Date Accessed: 2024/08/02
*/

'use strict';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Populate records table
        let response = await fetch('/agents');
        let rows = await response.json();

        const table_headers = document.getElementById("agent-table-headers");
        const table_body =  document.getElementById("agent-table-body");

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
            td_edit.innerHTML = `<a href='#' onClick=\"updateAgent(${rows[row].agentID})\">Edit</a>`;
            td_delete.innerHTML = `<a href='#' onclick=\"deleteAgent(${rows[row].agentID})\">Delete</a>`;
            current.appendChild(td_edit);
            current.appendChild(td_delete);
            for (const key in rows[row]) {
                const td = document.createElement('td');
                td.innerText = rows[row][key];
                current.appendChild(td);
                current.id = "agent-" + `${rows[row]["agentID"]}`
            };

            tr.setAttribute('id', "agent-" + `${rows[row].agentID}`);
            tr.setAttribute('agentID', rows[row]["agentID"]);
            tr.setAttribute('agentFirstName', rows[row]["First Name"]);
            tr.setAttribute('agentLastName', rows[row]["Last Name"]);
            tr.setAttribute('agentEmail', rows[row]["Email"]);
            tr.setAttribute('agentPhone', rows[row]["Phone"]);
        };

        // Create row for "Add" Button
        const tr = document.createElement('tr');
        const td_add = document.createElement('td');
        td_add.colSpan = cols + 2;
        td_add.innerHTML = `<button type="button" id="add_button" onClick=\"newAgent()\">ADD AGENT</button>`;
        tr.append(td_add);
        table_body.append(tr);

    } catch (error) {
        console.log(error);
    };
});
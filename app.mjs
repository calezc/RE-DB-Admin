/*
Code adapted from samples provided by Oregon State University, CS 340 - Databases.
    - URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
    - Date Accessed:
        - Various dates
        - First Access: 2024/07/19
        - Most Recent Access: 2024/07/25
*/

/*
    SETUP
*/
import express from 'express';
import pool from './database/db-connector.mjs';

'use strict';

// Express
var app         = express();
const PORT      = 50123;

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

/*
    ROUTES
*/

// Homepage
app.get('/', (req, res) => {
        res.redirect('/index.html')
});

// Buyers Routes
app.get('/buyers', (req, res) => {
    let query1 = `
        SELECT
            Buyers.buyerID,
            Buyers.firstName AS "First Name",
            Buyers.lastName AS "Last Name",
            Buyers.email AS "Email", 
            Buyers.phone AS "Phone",
            Agents.agentID,
            concat(Agents.firstName, " ", Agents.lastName)  AS "Agent Name"
        FROM Buyers
            LEFT JOIN Agents ON Buyers.agentID = Agents.agentID;
    `;
    pool.query(query1, (error, rows, fields) => {
        res.json(rows);
    });
});

app.post('/add_buyer', (req, res) => {
    let data = req.body;

    // Capture NULL values
    let agent = parseInt(data.agent);
    if (isNaN(agent)) {
        agent = 'NULL'
    };

    let query1 = `
        INSERT INTO Buyers (
            firstName,
            lastName,
            email,
            phone,
            agentID
        ) VALUES
        (
            '${data.firstName}',
            '${data.lastName}',
            '${data.email}',
            '${data.phone}',
            ${agent}
        );
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } else {
            // Retrieve new row to add to table in UI
            let query2 = `
                SELECT
                    Buyers.buyerID,
                    Buyers.firstName AS "First Name",
                    Buyers.lastName AS "Last Name",
                    Buyers.email AS "Email", 
                    Buyers.phone AS "Phone",
                    Agents.agentID,
                    concat(Agents.firstName, " ", Agents.lastName)  AS "Agent Name"
                FROM Buyers
                    LEFT JOIN Agents ON Buyers.agentID = Agents.agentID
                WHERE Buyers.firstName = '${data.firstName}' AND Buyers.lastName = '${data.lastName}';
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });

});

app.put('/put-buyer', (req, res) => {
    let data = req.body;

    // Capture NULL values
    let agent = parseInt(data.agent);
    if (isNaN(agent)) {
        agent = 'NULL'
    };

    let query1 = `
        UPDATE Buyers
        SET
            firstName = '${data.firstName}',
            lastName = '${data.lastName}',
            email = '${data.email}',
            phone = '${data.phone}',
            agentID = ${agent}
        WHERE buyerID = ${parseInt(data.buyerID)};
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            // Retrieve updated row to amend values in existing table row in UI
            let query2 = `
                SELECT
                    Buyers.buyerID,
                    Buyers.firstName AS "First Name",
                    Buyers.lastName AS "Last Name",
                    Buyers.email AS "Email", 
                    Buyers.phone AS "Phone",
                    Agents.agentID,
                    concat(Agents.firstName, " ", Agents.lastName)  AS "Agent Name"
                FROM Buyers
                    LEFT JOIN Agents ON Buyers.agentID = Agents.agentID
                WHERE Buyers.buyerID = ${parseInt(data.buyerID)};
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });
    
});

app.delete('/delete-buyer', function(req,res,next){
    let data = req.body;
    let buyerID = parseInt(data.buyerID);

    let query1 = `DELETE FROM Buyers WHERE buyerID = ${buyerID};`;
    
    pool.query(query1, (error, rows, fields) => {
          if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json(buyerID);
        };
    });
});

// Sellers Routes
app.get('/sellers', (req, res) => {
    let query1 = `
        SELECT
            Sellers.sellerID,
            Sellers.firstName AS "First Name",
            Sellers.lastName AS "Last Name",
            Sellers.email AS "Email", 
            Sellers.phone AS "Phone",
            Agents.agentID,
            concat(Agents.firstName, " ", Agents.lastName)  AS "Agent Name"
        FROM Sellers
            LEFT JOIN Agents ON Sellers.agentID = Agents.agentID;
    `;
    pool.query(query1, (error, rows, fields) => {
        res.json(rows);
    });
});

app.post('/add_seller', (req, res) => {
    let data = req.body;

    // Capture NULL values
    let agent = parseInt(data.agent);
    if (isNaN(agent)) {
        agent = 'NULL'
    };

    let query1 = `
        INSERT INTO Sellers (
            firstName,
            lastName,
            email,
            phone,
            agentID
        ) VALUES
        (
            '${data.firstName}',
            '${data.lastName}',
            '${data.email}',
            '${data.phone}',
            ${agent}
        );
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } else {
            // Retrieve new row to add to table in UI
            let query2 = `
                SELECT
                    Sellers.sellerID,
                    Sellers.firstName AS "First Name",
                    Sellers.lastName AS "Last Name",
                    Sellers.email AS "Email", 
                    Sellers.phone AS "Phone",
                    Agents.agentID,
                    concat(Agents.firstName, " ", Agents.lastName)  AS "Agent Name"
                FROM Sellers
                    LEFT JOIN Agents ON Sellers.agentID = Agents.agentID
                WHERE Sellers.firstName = '${data.firstName}' AND Sellers.lastName = '${data.lastName}';
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });

});

app.put('/put-seller', (req, res) => {
    let data = req.body;

    // Capture NULL values
    let agent = parseInt(data.agent);
    if (isNaN(agent)) {
        agent = 'NULL'
    };

    let query1 = `
        UPDATE Sellers
        SET
            firstName = '${data.firstName}',
            lastName = '${data.lastName}',
            email = '${data.email}',
            phone = '${data.phone}',
            agentID = ${agent}
        WHERE sellerID = ${parseInt(data.sellerID)};
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            // Retrieve updated row to amend values in existing table row in UI
            let query2 = `
                SELECT
                    Sellers.sellerID,
                    Sellers.firstName AS "First Name",
                    Sellers.lastName AS "Last Name",
                    Sellers.email AS "Email", 
                    Sellers.phone AS "Phone",
                    Agents.agentID,
                    concat(Agents.firstName, " ", Agents.lastName)  AS "Agent Name"
                FROM Sellers
                    LEFT JOIN Agents ON Sellers.agentID = Agents.agentID
                WHERE Sellers.sellerID = ${parseInt(data.sellerID)};
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });
    
});

app.delete('/delete-seller', function(req,res,next){
    let data = req.body;
    let sellerID = parseInt(data.sellerID);

    let query1 = `DELETE FROM Sellers WHERE sellerID = ${sellerID};`;
    
    pool.query(query1, (error, rows, fields) => {
          if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json(sellerID);
        };
    });
});

// Agents Routes
app.get('/agents', (req, res) => {
    let query1 = `
        SELECT
            Agents.agentID,
            Agents.firstName AS "First Name",
            Agents.lastName AS "Last Name",
            Agents.email AS "Email",
            Agents.phone AS "Phone"
        FROM Agents;
    `;
    pool.query(query1, (error, rows, fields) => {
        res.json(rows);
    });
});

app.post('/add_agent', (req, res) => {
    let data = req.body;

    let query1 = `
        INSERT INTO Agents (
            firstName,
            lastName,
            email,
            phone
        ) VALUES
        (
            '${data.firstName}',
            '${data.lastName}',
            '${data.email}',
            '${data.phone}'
        );
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } else {
            // Retrieve new row to add to table in UI
            let query2 = `
                SELECT
                    Agents.agentID,
                    Agents.firstName AS "First Name",
                    Agents.lastName AS "Last Name",
                    Agents.email AS "Email", 
                    Agents.phone AS "Phone"
                FROM Agents
                WHERE firstName = '${data.firstName}'
                    AND lastName = '${data.lastName}'
                    AND email = '${data.email}';
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });

});

app.put('/put-agent', (req, res) => {
    let data = req.body;

    let query1 = `
        UPDATE Agents
        SET
            firstName = '${data.firstName}',
            lastName = '${data.lastName}',
            email = '${data.email}',
            phone = '${data.phone}'
        WHERE agentID = ${parseInt(data.agentID)};
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            // Retrieve updated row to amend values in existing table row in UI
            let query2 = `
                SELECT
                    Agents.agentID,
                    Agents.firstName AS "First Name",
                    Agents.lastName AS "Last Name",
                    Agents.email AS "Email", 
                    Agents.phone AS "Phone"
                FROM Agents
                WHERE Agents.agentID = ${parseInt(data.agentID)};
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });
    
});

app.delete('/delete-agent', function(req,res,next){
    let data = req.body;
    let agentID = parseInt(data.agentID);

    let query1 = `DELETE FROM Agents WHERE agentID = ${agentID};`;
    
    pool.query(query1, (error, rows, fields) => {
          if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json(agentID);
        };
    });
});

// Properties Routes
app.get('/properties', (req, res) => {
    let query1 = `
        SELECT
            Properties.propertyID,
            Properties.address AS "Address",
            Sellers.sellerID,
            Sellers.firstName AS "Seller First Name",
            Sellers.lastName AS "Seller Last Name"
        FROM Properties
            LEFT JOIN Sellers ON Properties.sellerID = Sellers.sellerID;
    `;
    pool.query(query1, (error, rows, fields) => {
        res.json(rows);
    });
});

app.post('/add_property', (req, res) => {
    let data = req.body;

    // Capture NULL values
    let seller = parseInt(data.sellerID);

    let query1 = `
        INSERT INTO Properties (
            address,
            sellerID
        ) VALUES
        (
            '${data.address}',
            ${seller}
        );
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } else {
            // Retrieve new row to add to table in UI
            let query2 = `
                SELECT
                    Properties.propertyID,
                    Properties.address AS "Address",
                    Sellers.sellerID,
                    Sellers.firstName AS "Seller First Name",
                    Sellers.lastName AS "Seller Last Name"
                FROM Properties
                    LEFT JOIN Sellers ON Properties.sellerID = Sellers.sellerID
                WHERE Sellers.sellerID = ${seller}
                    AND Address = '${data.address}';
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });

});

app.put('/put-property', (req, res) => {
    let data = req.body;

    let query1 = `
        UPDATE Properties
        SET
            address = '${data.address}',
            sellerID = ${parseInt(data.sellerID)}
        WHERE propertyID = ${parseInt(data.propertyID)};
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            // Retrieve updated row to amend values in existing table row in UI
            let query2 = `
                SELECT
                    Properties.propertyID,
                    Properties.address AS "Address",
                    Sellers.sellerID,
                    Sellers.firstName AS "Seller First Name",
                    Sellers.lastName AS "Seller Last Name"
                FROM Properties
                    LEFT JOIN Sellers ON Properties.sellerID = Sellers.sellerID
                WHERE propertyID = ${parseInt(data.propertyID)};
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });
    
});

app.delete('/delete-property', function(req,res,next){
    let data = req.body;
    let propertyID = parseInt(data.propertyID);

    let query1 = `DELETE FROM Properties WHERE propertyID = ${propertyID};`;
    
    pool.query(query1, (error, rows, fields) => {
          if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json(propertyID);
        };
    });
});

// Transactions Routes
app.get('/transactions', (req, res) => {
    let query1 = `
        SELECT
            Transactions.transactionID,
            Transactions.date AS "Date",
            Transactions.price AS "Price",
            Properties.propertyID,
            Properties.address AS "Address",
            Sellers.sellerID,
            Sellers.firstName AS "Seller First Name",
            Sellers.lastName AS "Seller Last Name",
            Buyers.buyerID,
            Buyers.firstName AS "Buyer First Name",
            Buyers.lastName AS "Buyer Last Name"
        FROM Transactions
            LEFT JOIN Buyers ON Transactions.buyerID = Buyers.buyerID
            LEFT JOIN Properties ON Transactions.propertyID = Properties.propertyID
            LEFT JOIN Sellers ON Properties.sellerID = Sellers.sellerID;
    `;
    pool.query(query1, (error, rows, fields) => {
        res.json(rows);
    });
});

app.post('/add_transaction', (req, res) => {
    let data = req.body;

    let query1 = `
        INSERT INTO Transactions (
            buyerID,
            propertyID,
            date,
            price
        ) VALUES
        (
            ${parseInt(data.buyerID)},
            ${parseInt(data.propertyID)},
            '${data.date}', 
            ${parseInt(data.price)}
        );
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
        } else {
            // Retrieve new row to add to table in UI
            let query2 = `
                SELECT
                    Transactions.transactionID,
                    Transactions.date AS "Date",
                    Transactions.price AS "Price",
                    Properties.propertyID,
                    Properties.address AS "Address",
                    Sellers.sellerID,
                    Sellers.firstName AS "Seller First Name",
                    Sellers.lastName AS "Seller Last Name",
                    Buyers.buyerID,
                    Buyers.firstName AS "Buyer First Name",
                    Buyers.lastName AS "Buyer Last Name"
                FROM Transactions
                    LEFT JOIN Buyers ON Transactions.buyerID = Buyers.buyerID
                    LEFT JOIN Properties ON Transactions.propertyID = Properties.propertyID
                    LEFT JOIN Sellers ON Properties.sellerID = Sellers.sellerID
                WHERE Buyers.buyerID = ${parseInt(data.buyerID)}
                    AND Properties.propertyID = ${parseInt(data.propertyID)}
                    AND Transactions.date = '${data.date}';
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });

});

app.put('/put-transaction', (req, res) => {
    let data = req.body;

    let query1 = `
        UPDATE Transactions
        SET
            buyerID = ${parseInt(data.buyerID)},
            propertyID = ${parseInt(data.propertyID)},
            date = '${data.date}', 
            price = ${parseInt(data.price)}
        WHERE transactionID = ${parseInt(data.transactionID)};
    `;

    pool.query(query1, (error, rows, fields) => {
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            // Retrieve updated row to amend values in existing table row in UI
            let query2 = `
                SELECT
                    Transactions.transactionID,
                    Transactions.date AS "Date",
                    Transactions.price AS "Price",
                    Properties.propertyID,
                    Properties.address AS "Address",
                    Sellers.sellerID,
                    Sellers.firstName AS "Seller First Name",
                    Sellers.lastName AS "Seller Last Name",
                    Buyers.buyerID,
                    Buyers.firstName AS "Buyer First Name",
                    Buyers.lastName AS "Buyer Last Name"
                FROM Transactions
                    LEFT JOIN Buyers ON Transactions.buyerID = Buyers.buyerID
                    LEFT JOIN Properties ON Transactions.propertyID = Properties.propertyID
                    LEFT JOIN Sellers ON Properties.sellerID = Sellers.sellerID
                WHERE Buyers.buyerID = ${parseInt(data.buyerID)}
                    AND Properties.propertyID = ${parseInt(data.propertyID)}
                    AND Transactions.date = '${data.date}';
                `;
            pool.query(query2, (error, rows, fields) => {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows);
                };
            });
        };
    });
    
});

app.delete('/delete-transaction', function(req,res,next){
    let data = req.body;
    let transactionID = parseInt(data.transactionID);

    let query1 = `DELETE FROM Transactions WHERE transactionID = ${transactionID};`;
    
    pool.query(query1, (error, rows, fields) => {
          if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json(transactionID);
        };
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
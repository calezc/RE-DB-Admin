SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Agents (
    agentID int NOT NULL AUTO_INCREMENT,
    firstName varchar(45) NOT NULL,
    lastName varchar(45) NOT NULL,
    email varchar(45) NOT NULL,
    phone varchar(45) NOT NULL,
    PRIMARY KEY (agentID)
);

CREATE OR REPLACE TABLE Buyers (
    buyerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(45) NOT NULL,
    lastName varchar(45) NOT NULL,
    email varchar(45) NOT NULL,
    phone varchar(45) NOT NULL,
    agentID int DEFAULT NULL,
    PRIMARY KEY (buyerID),
    FOREIGN KEY (agentID)
        REFERENCES Agents (agentID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE OR REPLACE TABLE Sellers (
    sellerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(45) NOT NULL,
    lastName varchar(45) NOT NULL,
    email varchar(45) NOT NULL,
    phone varchar(45) NOT NULL,
    agentID int DEFAULT NULL,
    PRIMARY KEY (sellerID),
    FOREIGN KEY (agentID)
        REFERENCES Agents (agentID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE OR REPLACE TABLE Properties (
    propertyID int NOT NULL AUTO_INCREMENT,
    address varchar(100) NOT NULL,
    sellerID int NOT NULL,
    PRIMARY KEY (propertyID),
    FOREIGN KEY (sellerID)
        REFERENCES Sellers (sellerID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE OR REPLACE TABLE Transactions (
    transactionID int NOT NULL AUTO_INCREMENT,
    buyerID int NOT NULL,
    propertyID int NOT NULL,
    date date NOT NULL,
    price decimal(12, 2) NOT NULL,
    PRIMARY KEY (transactionID),
    FOREIGN KEY (buyerID)
        REFERENCES Buyers (buyerID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (propertyID)
        REFERENCES Properties (propertyID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO Agents (firstName, lastName, email, phone)
VALUES
('Evelyn', 'Dos Santos', 'evelyn.dossantos@aol.com', '333-444-5678'),
('Michel', 'Curren', 'michel.curren@gmail.com', '999-888-1234'),
('Jonas', 'Davidson', 'jonas.davidson@aol.com', '777-666-5555');

INSERT INTO Buyers (firstName, lastName, email, phone, agentID)
VALUES
('Emily', 'Rose', 'emily.rose@gmail.com', '555-111-2222',
    (SELECT Agents.agentID FROM Agents WHERE Agents.firstName = 'Jonas' AND Agents.lastName = 'Davidson')),
('Matthew', 'Evans', 'matthew.evans@gmail.com', '555-234-5678', DEFAULT),
('Eric', 'Myers', 'eric.myers@protonmail.com', '123-555-8888',
    (SELECT Agents.agentID FROM Agents WHERE Agents.firstName = 'Michel' AND Agents.lastName = 'Curren'));

INSERT INTO Sellers (firstName, lastName, email, phone, agentID)
VALUES
('John', 'Doe', 'john.doe@gmail.com', '123-456-7890', 1),
('Jane', 'Smith', 'jane.smith@yahoo.com', '987-654-3210', 1),
('Jack', 'Richards', 'jack.richards@gmail.com', '555-123-4567', 2);

INSERT INTO Properties (address, sellerID)
VALUES
('123 Windy Way, Chicago, Illinois 60652', 1),
('456 Hickory Lane, Bend, Oregon 12345', 1),
('45 Oceanview Boulevard, Los Angeles, California 98453', 3),
('900 Sunnyside Circle, Dayton, Ohio 34567', 2);

INSERT INTO Transactions (buyerID, propertyID, date, price)
VALUES
(1, 1, '2010-01-01', 100000),
(2, 1, '2015-12-31', 150000),
(2, 3, '2020-07-11', 5000000);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
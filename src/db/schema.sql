-- Create Database
CREATE DATABASE BookInventoryDB;
USE BookInventoryDB;

-- Authors Table
CREATE TABLE Authors (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Country VARCHAR(100)
);

-- Publishers Table
CREATE TABLE Publishers (
    PublisherID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Address VARCHAR(255),
    Phone VARCHAR(20),
    Email VARCHAR(100)
);

-- Categories Table
CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL UNIQUE
);

-- Books Table
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    AuthorID INT,
    PublisherID INT,
    CategoryID INT,
    ISBN VARCHAR(20) UNIQUE,
    Price DECIMAL(10, 2),
    PublishedDate DATE,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    FOREIGN KEY (PublisherID) REFERENCES Publishers(PublisherID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Inventory Table
CREATE TABLE Inventory (
    InventoryID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT NOT NULL,
    Quantity INT DEFAULT 0,
    Location VARCHAR(100),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- Sales Table
CREATE TABLE Sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT NOT NULL,
    QuantitySold INT NOT NULL,
    SaleDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

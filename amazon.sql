CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
id INT(10) auto_increment NOT  NULL,
item_id varchar(50) NOT NULL,
product_name varchar(30) NOT NULL,
department_name varchar(75) NOT NULL,
price decimal(10, 3),
stock_quantity INT(10) NULL,
PRIMARY KEY (id
);
select * from products;
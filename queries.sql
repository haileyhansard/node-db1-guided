-- SELECT

SELECT * from employees;

SELECT productId, productName FROM Products;

SELECT productName, price, unit from products;

SELECT * from customers where country = 'UK';
-- case sensitve in the W3 schools tool
-- database should tell you what the settings are in terms of case sensitive or not
-- if not, you can ask

SELECT * from customers where country = 'UK' or city = 'Berlin';
-- shows customers from country UK and city berlin

SELECT *
FROM CUSTOMERS
WHERE country
IN ('UK', 'USA');
-- IN is the new keyword here, it can be passed a list of the countries passed in separated by commas

SELECT * 
FROM Customers 
WHERE Country='UK' or Country = 'USA';
--this is same as above without using the IN clause

SELECT * 
FROM Customers 
WHERE Country 
NOT IN ('UK', 'USA');
-- excludes UK and USA

select country, city, * from customers;
-- lists country first, then city, then the rest of info for customers list

select country, city, * 
from customers
order by country, city, customerName;
-- default is ascending for everything, but you can add desc after country for example if you wanted the list to be ordered alphabetically from Z-A

-- list 5 cheapest products
SELECT * FROM Products
order by price
limit 5;




-- INSERT --

-- add a new shipping company
insert into shippers (phone, shipperName)
values ('(212)555-1212', 'Lambda Shipping');
-- values must follow the same order as the identified order of the columns you likst in the firt set of ()

insert into shippers (phone, shipperName)
values ('(212)555-1213', 'Clad Shipping'), ('(918)605-0619', 'Hailey Shipping');
-- inserts mulitple rows under the same two categories

-- UPDATE --
update shippers set shipperName = 'Lambda Ships', Phone = '(212)555-1211'
where shipperId = 4;
-- remember to TEST the WHERE condition with a select first!!!! People have lost their jobs by forgetting the where, writing the wrong where, and messing up the whole database because it CANNOT be REVERSED!!
-- companies have had to close, shut down, because they cannot undo updating or deleting. you MUST FIRST TEST, TEST, TEST on back-up databases without touching the master/production database until you and other eyes are SURE it will be correct

-- Delete a record
-- Select * from shippers
delete from shippers 
where shipperId = 4;
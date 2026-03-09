# 🐘 PostgreSQL Complete Practice Guide — Beginner to Advanced

> Practice all queries in **pgAdmin Query Tool**. Copy & paste each block and run it!

---

## 📋 TABLE OF CONTENTS

1. [Setup & First Steps](#1-setup--first-steps)
2. [Create Tables (DDL)](#2-create-tables-ddl)
3. [Insert Data (DML)](#3-insert-data-dml)
4. [SELECT Queries — Beginner](#4-select-queries--beginner)
5. [Filtering — WHERE, AND, OR, IN, BETWEEN, LIKE](#5-filtering)
6. [Sorting & Limiting](#6-sorting--limiting)
7. [Aggregate Functions](#7-aggregate-functions)
8. [GROUP BY & HAVING](#8-group-by--having)
9. [JOINS](#9-joins)
10. [Subqueries](#10-subqueries)
11. [UPDATE & DELETE](#11-update--delete)
12. [ALTER TABLE](#12-alter-table)
13. [Constraints](#13-constraints)
14. [Indexes](#14-indexes)
15. [Views](#15-views)
16. [CTEs (Common Table Expressions)](#16-ctes-common-table-expressions)
17. [Window Functions](#17-window-functions)
18. [Transactions](#18-transactions)
19. [Stored Procedures & Functions](#19-stored-procedures--functions)
20. [Triggers](#20-triggers)
21. [JSON in PostgreSQL](#21-json-in-postgresql)
22. [Advanced Tips](#22-advanced-tips)

---

## 1. Setup & First Steps

```sql
-- Check PostgreSQL version
SELECT version();

-- List all databases
SELECT datname FROM pg_database;

-- Create a new database (run in pgAdmin Object Browser or query tool)
CREATE DATABASE practice_db;

-- Create a schema to organize your tables
CREATE SCHEMA shop;
```

---

## 2. Create Tables (DDL)

> DDL = Data Definition Language. Used to CREATE, ALTER, DROP tables.

```sql
-- Create a customers table
CREATE TABLE customers (
    customer_id   SERIAL PRIMARY KEY,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) UNIQUE NOT NULL,
    phone         VARCHAR(20),
    city          VARCHAR(50),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a products table
CREATE TABLE products (
    product_id    SERIAL PRIMARY KEY,
    product_name  VARCHAR(100) NOT NULL,
    category      VARCHAR(50),
    price         NUMERIC(10, 2) NOT NULL,
    stock         INTEGER DEFAULT 0
);

-- Create an orders table (references customers)
CREATE TABLE orders (
    order_id      SERIAL PRIMARY KEY,
    customer_id   INTEGER REFERENCES customers(customer_id),
    order_date    DATE DEFAULT CURRENT_DATE,
    total_amount  NUMERIC(10, 2),
    status        VARCHAR(20) DEFAULT 'pending'
);

-- Create order_items table (many-to-many between orders and products)
CREATE TABLE order_items (
    item_id       SERIAL PRIMARY KEY,
    order_id      INTEGER REFERENCES orders(order_id),
    product_id    INTEGER REFERENCES products(product_id),
    quantity      INTEGER NOT NULL,
    unit_price    NUMERIC(10, 2) NOT NULL
);
```

**What this does:**

- `SERIAL` = auto-incrementing integer (1, 2, 3...)
- `PRIMARY KEY` = unique identifier, cannot be NULL
- `NOT NULL` = field is required
- `UNIQUE` = no duplicates allowed
- `REFERENCES` = foreign key (links tables together)
- `DEFAULT` = value used when nothing is provided

---

## 3. Insert Data (DML)

> DML = Data Manipulation Language. Used to INSERT, UPDATE, DELETE data.

```sql
-- Insert customers
INSERT INTO customers (first_name, last_name, email, phone, city) VALUES
('Alice',   'Smith',   'alice@email.com',   '555-0101', 'New York'),
('Bob',     'Johnson', 'bob@email.com',     '555-0102', 'Chicago'),
('Carol',   'Williams','carol@email.com',   '555-0103', 'New York'),
('David',   'Brown',   'david@email.com',   '555-0104', 'Houston'),
('Emma',    'Davis',   'emma@email.com',    '555-0105', 'Chicago'),
('Frank',   'Miller',  'frank@email.com',   '555-0106', 'New York'),
('Grace',   'Wilson',  'grace@email.com',   '555-0107', 'Seattle'),
('Henry',   'Moore',   'henry@email.com',   '555-0108', 'Boston');

-- Insert products
INSERT INTO products (product_name, category, price, stock) VALUES
('Laptop Pro',     'Electronics',  1299.99, 50),
('Wireless Mouse', 'Electronics',    29.99, 200),
('USB-C Hub',      'Electronics',    49.99, 150),
('Desk Chair',     'Furniture',     299.99, 30),
('Standing Desk',  'Furniture',     499.99, 20),
('Notebook',       'Stationery',      4.99, 500),
('Pen Set',        'Stationery',      9.99, 300),
('Monitor 27"',    'Electronics',   399.99, 40);

-- Insert orders
INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-10', 1329.98, 'completed'),
(2, '2024-01-12',   79.98, 'completed'),
(1, '2024-01-15',  299.99, 'completed'),
(3, '2024-02-01',  549.98, 'shipped'),
(4, '2024-02-05',   14.98, 'pending'),
(2, '2024-02-10',  399.99, 'shipped'),
(5, '2024-03-01',  499.99, 'pending'),
(6, '2024-03-05', 1699.98, 'completed');

-- Insert order_items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1299.99),
(1, 2, 1,   29.99),
(2, 2, 2,   29.99),
(2, 7, 2,    9.99),
(3, 4, 1,  299.99),
(4, 5, 1,  499.99),
(4, 6, 10,   4.99),
(5, 6, 2,    4.99),
(5, 7, 1,    9.99),
(6, 8, 1,  399.99),
(7, 5, 1,  499.99),
(8, 1, 1, 1299.99),
(8, 8, 1,  399.99);
```

---

## 4. SELECT Queries — Beginner

```sql
-- Get all customers
SELECT * FROM customers;

-- Get only specific columns
SELECT first_name, last_name, email FROM customers;

-- Give columns aliases (rename in output)
SELECT
    first_name AS "First Name",
    last_name  AS "Last Name",
    email      AS "Email Address"
FROM customers;

-- Combine columns
SELECT
    first_name || ' ' || last_name AS full_name,
    email
FROM customers;

-- Remove duplicate values
SELECT DISTINCT city FROM customers;

-- Count rows
SELECT COUNT(*) FROM customers;
```

---

## 5. Filtering

```sql
-- WHERE: Filter rows
SELECT * FROM customers WHERE city = 'New York';

-- AND: Multiple conditions (all must be true)
SELECT * FROM products WHERE category = 'Electronics' AND price < 100;

-- OR: At least one condition must be true
SELECT * FROM customers WHERE city = 'Chicago' OR city = 'Seattle';

-- NOT: Exclude condition
SELECT * FROM products WHERE NOT category = 'Stationery';

-- IN: Match any value in a list
SELECT * FROM customers WHERE city IN ('New York', 'Chicago', 'Boston');

-- NOT IN
SELECT * FROM products WHERE category NOT IN ('Furniture', 'Stationery');

-- BETWEEN: Range filter (inclusive)
SELECT * FROM products WHERE price BETWEEN 20 AND 100;

-- LIKE: Pattern matching
-- % = any number of characters
-- _ = exactly one character
SELECT * FROM customers WHERE email LIKE '%@email.com';
SELECT * FROM customers WHERE first_name LIKE 'A%';    -- starts with A
SELECT * FROM customers WHERE first_name LIKE '%e';    -- ends with e
SELECT * FROM customers WHERE first_name LIKE '_o%';   -- second letter is 'o'

-- ILIKE: Case-insensitive LIKE
SELECT * FROM customers WHERE first_name ILIKE 'alice';

-- IS NULL / IS NOT NULL
SELECT * FROM customers WHERE phone IS NOT NULL;
```

---

## 6. Sorting & Limiting

```sql
-- ORDER BY: Sort results
SELECT * FROM products ORDER BY price;              -- lowest to highest
SELECT * FROM products ORDER BY price DESC;         -- highest to lowest

-- Sort by multiple columns
SELECT * FROM customers ORDER BY city ASC, last_name ASC;

-- LIMIT: Get only N rows
SELECT * FROM products ORDER BY price DESC LIMIT 3;  -- top 3 most expensive

-- OFFSET: Skip rows (useful for pagination)
SELECT * FROM products ORDER BY product_id LIMIT 3 OFFSET 3;  -- page 2

-- Top 3 cheapest products
SELECT product_name, price
FROM products
ORDER BY price ASC
LIMIT 3;
```

---

## 7. Aggregate Functions

> Aggregate functions calculate a value from multiple rows.

```sql
-- COUNT: Number of rows
SELECT COUNT(*) AS total_customers FROM customers;
SELECT COUNT(phone) AS customers_with_phone FROM customers;  -- ignores NULLs

-- SUM: Add up values
SELECT SUM(total_amount) AS total_revenue FROM orders;

-- AVG: Average
SELECT AVG(price) AS average_price FROM products;
SELECT ROUND(AVG(price), 2) AS avg_price FROM products;  -- round to 2 decimals

-- MIN and MAX
SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive FROM products;

-- Multiple aggregates together
SELECT
    COUNT(*)          AS total_products,
    MIN(price)        AS min_price,
    MAX(price)        AS max_price,
    ROUND(AVG(price), 2) AS avg_price,
    SUM(stock)        AS total_stock
FROM products;
```

---

## 8. GROUP BY & HAVING

> GROUP BY groups rows with the same value so you can aggregate each group.

```sql
-- Count customers per city
SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city;

-- Total revenue per order status
SELECT status, SUM(total_amount) AS total_revenue
FROM orders
GROUP BY status;

-- Average price per category
SELECT category, ROUND(AVG(price), 2) AS avg_price, COUNT(*) AS product_count
FROM products
GROUP BY category
ORDER BY avg_price DESC;

-- HAVING: Filter groups (like WHERE but for GROUP BY)
-- Show only cities with more than 1 customer
SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city
HAVING COUNT(*) > 1;

-- Categories where avg price is over 100
SELECT category, ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;

-- WHERE vs HAVING:
-- WHERE filters individual rows BEFORE grouping
-- HAVING filters groups AFTER grouping
SELECT category, ROUND(AVG(price), 2) AS avg_price
FROM products
WHERE stock > 30           -- filter rows first
GROUP BY category
HAVING AVG(price) > 10;   -- then filter groups
```

---

## 9. JOINS

> JOINs combine rows from two or more tables based on a related column.

```sql
-- INNER JOIN: Only rows that match in BOTH tables
SELECT
    o.order_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    o.order_date,
    o.total_amount,
    o.status
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;

-- LEFT JOIN: All rows from left table + matched rows from right
-- Customers who may or may not have orders
SELECT
    c.first_name,
    c.last_name,
    COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_orders DESC;

-- RIGHT JOIN: All rows from right table + matched from left
SELECT
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM order_items oi
RIGHT JOIN products p ON oi.product_id = p.product_id;

-- FULL OUTER JOIN: All rows from both tables
SELECT
    c.first_name,
    o.order_id,
    o.total_amount
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;

-- Join 3 tables: orders + customers + order_items + products
SELECT
    c.first_name || ' ' || c.last_name AS customer,
    o.order_date,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total
FROM orders o
JOIN customers  c  ON o.customer_id  = c.customer_id
JOIN order_items oi ON o.order_id    = oi.order_id
JOIN products   p  ON oi.product_id  = p.product_id
ORDER BY o.order_date, customer;
```

---

## 10. Subqueries

> A subquery is a query inside another query.

```sql
-- Find customers who placed orders
SELECT first_name, last_name
FROM customers
WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);

-- Find customers who NEVER placed an order
SELECT first_name, last_name
FROM customers
WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL);

-- Find products more expensive than average price
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products)
ORDER BY price;

-- Subquery in FROM clause (derived table)
SELECT category, avg_price
FROM (
    SELECT category, ROUND(AVG(price), 2) AS avg_price
    FROM products
    GROUP BY category
) AS category_avg
WHERE avg_price > 50;

-- Correlated subquery: Find customers with orders above their average
SELECT c.first_name, o.order_id, o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.total_amount > (
    SELECT AVG(o2.total_amount)
    FROM orders o2
    WHERE o2.customer_id = c.customer_id
);
```

---

## 11. UPDATE & DELETE

```sql
-- UPDATE: Modify existing rows
UPDATE products SET price = 34.99 WHERE product_id = 2;

-- Update multiple columns
UPDATE customers
SET phone = '555-9999', city = 'Los Angeles'
WHERE customer_id = 4;

-- Update based on another table
UPDATE orders
SET status = 'completed'
WHERE customer_id IN (
    SELECT customer_id FROM customers WHERE city = 'Chicago'
)
AND status = 'shipped';

-- DELETE: Remove rows
DELETE FROM order_items WHERE item_id = 13;  -- delete specific row

-- Delete with condition
DELETE FROM orders WHERE status = 'pending' AND order_date < '2024-01-01';

-- TRUNCATE: Delete ALL rows fast (no rollback by default)
-- TRUNCATE TABLE some_table;  -- careful! deletes everything

-- Safe practice: always SELECT first before UPDATE/DELETE
SELECT * FROM orders WHERE status = 'pending';  -- preview rows
-- Then run DELETE...
```

---

## 12. ALTER TABLE

```sql
-- Add a new column
ALTER TABLE customers ADD COLUMN age INTEGER;

-- Drop a column
ALTER TABLE customers DROP COLUMN age;

-- Rename a column
ALTER TABLE customers RENAME COLUMN phone TO phone_number;

-- Change column data type
ALTER TABLE customers ALTER COLUMN phone_number TYPE VARCHAR(30);

-- Set a default value
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'pending';

-- Drop default
ALTER TABLE orders ALTER COLUMN status DROP DEFAULT;

-- Rename a table
ALTER TABLE customers RENAME TO client;
ALTER TABLE client RENAME TO customers;  -- rename back
```

---

## 13. Constraints

```sql
-- Add a CHECK constraint (validate data)
ALTER TABLE products ADD CONSTRAINT price_positive CHECK (price > 0);
ALTER TABLE products ADD CONSTRAINT stock_non_negative CHECK (stock >= 0);

-- Add UNIQUE constraint
ALTER TABLE customers ADD CONSTRAINT unique_email UNIQUE (email);

-- Add NOT NULL constraint
ALTER TABLE products ALTER COLUMN product_name SET NOT NULL;

-- Add a FOREIGN KEY after table creation
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
ON DELETE SET NULL;  -- if customer deleted, set order's customer_id to NULL

-- View all constraints on a table
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'orders';

-- Drop a constraint
ALTER TABLE products DROP CONSTRAINT price_positive;
```

---

## 14. Indexes

> Indexes speed up SELECT queries on large tables.

```sql
-- Create a basic index on a column we search often
CREATE INDEX idx_customers_city ON customers(city);

-- Index on email (already unique but explicit index can help)
CREATE INDEX idx_customers_email ON customers(email);

-- Composite index (multiple columns)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- Partial index (only index rows meeting a condition)
CREATE INDEX idx_orders_pending ON orders(order_date)
WHERE status = 'pending';

-- View all indexes
SELECT indexname, tablename, indexdef
FROM pg_indexes
WHERE schemaname = 'public';

-- Drop an index
DROP INDEX idx_customers_city;

-- EXPLAIN: See how PostgreSQL runs a query (check if index is used)
EXPLAIN SELECT * FROM customers WHERE city = 'New York';
EXPLAIN ANALYZE SELECT * FROM customers WHERE city = 'New York';
```

---

## 15. Views

> A View is a saved SQL query that acts like a virtual table.

```sql
-- Create a view: customer order summary
CREATE VIEW customer_order_summary AS
SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.city,
    COUNT(o.order_id)        AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.city;

-- Use the view like a table!
SELECT * FROM customer_order_summary;
SELECT * FROM customer_order_summary WHERE city = 'New York';
SELECT * FROM customer_order_summary ORDER BY total_spent DESC;

-- Create a view for product inventory
CREATE VIEW low_stock_products AS
SELECT product_name, category, price, stock
FROM products
WHERE stock < 50
ORDER BY stock ASC;

-- Check low stock
SELECT * FROM low_stock_products;

-- Update a view (replace it)
CREATE OR REPLACE VIEW low_stock_products AS
SELECT product_name, category, price, stock
FROM products
WHERE stock < 100
ORDER BY stock ASC;

-- Drop a view
DROP VIEW customer_order_summary;
```

---

## 16. CTEs (Common Table Expressions)

> CTEs are like temporary named result sets. Use `WITH` keyword. Cleaner than nested subqueries.

```sql
-- Basic CTE
WITH order_totals AS (
    SELECT
        customer_id,
        COUNT(*)         AS order_count,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
)
SELECT
    c.first_name,
    c.last_name,
    ot.order_count,
    ot.total_spent
FROM customers c
JOIN order_totals ot ON c.customer_id = ot.customer_id
ORDER BY ot.total_spent DESC;

-- Multiple CTEs chained together
WITH
high_value_orders AS (
    SELECT * FROM orders WHERE total_amount > 500
),
high_value_customers AS (
    SELECT DISTINCT customer_id FROM high_value_orders
)
SELECT c.first_name, c.last_name, c.email
FROM customers c
WHERE c.customer_id IN (SELECT customer_id FROM high_value_customers);

-- Recursive CTE: Generate a number sequence
WITH RECURSIVE numbers AS (
    SELECT 1 AS n           -- starting value
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 10  -- recursive step
)
SELECT * FROM numbers;

-- Recursive CTE: Employee hierarchy (useful for org charts)
-- First create an employees table:
CREATE TABLE employees (
    emp_id    SERIAL PRIMARY KEY,
    emp_name  VARCHAR(50),
    manager_id INTEGER REFERENCES employees(emp_id)
);
INSERT INTO employees (emp_name, manager_id) VALUES
('CEO',      NULL),
('VP Sales', 1),
('VP Tech',  1),
('Sales Rep',2),
('Developer',3),
('Designer', 3);

WITH RECURSIVE org_chart AS (
    -- Base: top-level (no manager)
    SELECT emp_id, emp_name, manager_id, 1 AS level, emp_name::TEXT AS path
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    -- Recursive: find direct reports
    SELECT e.emp_id, e.emp_name, e.manager_id, oc.level + 1,
           oc.path || ' → ' || e.emp_name
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.emp_id
)
SELECT level, emp_name, path FROM org_chart ORDER BY path;
```

---

## 17. Window Functions

> Window functions calculate values ACROSS related rows WITHOUT collapsing them like GROUP BY.

```sql
-- ROW_NUMBER: Assign row number within each group
SELECT
    product_name,
    category,
    price,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rank_in_category
FROM products;

-- RANK: Same as ROW_NUMBER but ties get same rank (with gaps)
-- DENSE_RANK: Same but no gaps
SELECT
    product_name,
    category,
    price,
    RANK()       OVER (ORDER BY price DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY price DESC) AS dense_rank
FROM products;

-- Get the most expensive product per category
SELECT product_name, category, price FROM (
    SELECT
        product_name, category, price,
        ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn
    FROM products
) ranked
WHERE rn = 1;

-- Running total (cumulative sum)
SELECT
    order_date,
    total_amount,
    SUM(total_amount) OVER (ORDER BY order_date) AS running_total
FROM orders
ORDER BY order_date;

-- Moving average (last 3 orders)
SELECT
    order_id,
    order_date,
    total_amount,
    ROUND(AVG(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg_3
FROM orders;

-- LAG and LEAD: Compare with previous/next row
SELECT
    order_id,
    order_date,
    total_amount,
    LAG(total_amount)  OVER (ORDER BY order_date) AS previous_order,
    LEAD(total_amount) OVER (ORDER BY order_date) AS next_order
FROM orders;

-- NTILE: Split into quartiles (4 equal groups)
SELECT
    product_name,
    price,
    NTILE(4) OVER (ORDER BY price) AS price_quartile
FROM products;
```

---

## 18. Transactions

> Transactions group SQL statements so they ALL succeed or ALL fail.

```sql
-- Basic transaction
BEGIN;
    UPDATE products SET stock = stock - 1 WHERE product_id = 1;
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES (1, 1, 1, 1299.99);
COMMIT;  -- Save changes permanently

-- Rollback: Undo if something goes wrong
BEGIN;
    UPDATE products SET stock = stock - 5 WHERE product_id = 2;
    UPDATE products SET stock = stock + 5 WHERE product_id = 99;  -- product 99 doesn't exist!
ROLLBACK;  -- Undo everything in this transaction

-- SAVEPOINT: Partial rollback
BEGIN;
    UPDATE products SET price = 25.00 WHERE product_id = 2;
    SAVEPOINT before_second_update;
    UPDATE products SET price = 999.00 WHERE product_id = 3;  -- oops, wrong price!
ROLLBACK TO before_second_update;  -- undo only the second update
    UPDATE products SET price = 45.00 WHERE product_id = 3;  -- correct price
COMMIT;
```

---

## 19. Stored Procedures & Functions

> **Functions** return a value and can be used in SELECT.  
> **Stored Procedures** perform actions (INSERT/UPDATE/DELETE) and don't need to return a value.

### 19.1 — Simple Function

```sql
-- Function: Calculate discount price
CREATE OR REPLACE FUNCTION get_discounted_price(
    original_price NUMERIC,
    discount_pct   NUMERIC
) RETURNS NUMERIC AS $$
BEGIN
    RETURN original_price - (original_price * discount_pct / 100);
END;
$$ LANGUAGE plpgsql;

-- Use the function
SELECT
    product_name,
    price,
    get_discounted_price(price, 10) AS price_after_10pct_discount
FROM products;
```

### 19.2 — Function Returning a Table

```sql
-- Function: Get orders for a specific customer
CREATE OR REPLACE FUNCTION get_customer_orders(p_customer_id INTEGER)
RETURNS TABLE (
    order_id      INTEGER,
    order_date    DATE,
    total_amount  NUMERIC,
    status        VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT o.order_id, o.order_date, o.total_amount, o.status
    FROM orders o
    WHERE o.customer_id = p_customer_id
    ORDER BY o.order_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Use it
SELECT * FROM get_customer_orders(1);
SELECT * FROM get_customer_orders(2);
```

### 19.3 — Function with IF / ELSE Logic

```sql
-- Function: Classify customer based on spending
CREATE OR REPLACE FUNCTION classify_customer(p_customer_id INTEGER)
RETURNS VARCHAR AS $$
DECLARE
    v_total_spent NUMERIC;
    v_tier        VARCHAR;
BEGIN
    SELECT COALESCE(SUM(total_amount), 0)
    INTO v_total_spent
    FROM orders
    WHERE customer_id = p_customer_id;

    IF v_total_spent >= 2000 THEN
        v_tier := 'Platinum';
    ELSIF v_total_spent >= 1000 THEN
        v_tier := 'Gold';
    ELSIF v_total_spent >= 500 THEN
        v_tier := 'Silver';
    ELSE
        v_tier := 'Bronze';
    END IF;

    RETURN v_tier;
END;
$$ LANGUAGE plpgsql;

-- Test it
SELECT
    customer_id,
    first_name,
    classify_customer(customer_id) AS tier
FROM customers;
```

### 19.4 — Function with LOOP

```sql
-- Function: Apply compound interest (loop example)
CREATE OR REPLACE FUNCTION compound_interest(
    principal    NUMERIC,
    rate_pct     NUMERIC,
    years        INTEGER
) RETURNS NUMERIC AS $$
DECLARE
    amount NUMERIC := principal;
    i      INTEGER := 0;
BEGIN
    WHILE i < years LOOP
        amount := amount + (amount * rate_pct / 100);
        i := i + 1;
    END LOOP;
    RETURN ROUND(amount, 2);
END;
$$ LANGUAGE plpgsql;

-- Test: $1000 at 5% for 10 years
SELECT compound_interest(1000, 5, 10);
```

### 19.5 — Stored Procedure

```sql
-- Procedure: Place a new order
CREATE OR REPLACE PROCEDURE place_order(
    p_customer_id  INTEGER,
    p_product_id   INTEGER,
    p_quantity     INTEGER
)
LANGUAGE plpgsql AS $$
DECLARE
    v_price       NUMERIC;
    v_order_id    INTEGER;
    v_stock       INTEGER;
BEGIN
    -- Get product price and stock
    SELECT price, stock INTO v_price, v_stock
    FROM products
    WHERE product_id = p_product_id;

    -- Check stock
    IF v_stock < p_quantity THEN
        RAISE EXCEPTION 'Not enough stock. Available: %', v_stock;
    END IF;

    -- Create the order
    INSERT INTO orders (customer_id, total_amount, status)
    VALUES (p_customer_id, v_price * p_quantity, 'pending')
    RETURNING order_id INTO v_order_id;

    -- Add order item
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES (v_order_id, p_product_id, p_quantity, v_price);

    -- Reduce stock
    UPDATE products SET stock = stock - p_quantity
    WHERE product_id = p_product_id;

    RAISE NOTICE 'Order % created successfully!', v_order_id;
END;
$$;

-- Call the procedure
CALL place_order(3, 2, 5);   -- Customer 3 orders 5 of product 2
CALL place_order(1, 1, 1);   -- Customer 1 orders 1 Laptop
```

### 19.6 — Function with EXCEPTION Handling

```sql
-- Function: Safe divide (handle divide by zero)
CREATE OR REPLACE FUNCTION safe_divide(a NUMERIC, b NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
    RETURN a / b;
EXCEPTION
    WHEN division_by_zero THEN
        RAISE NOTICE 'Cannot divide by zero, returning NULL';
        RETURN NULL;
END;
$$ LANGUAGE plpgsql;

SELECT safe_divide(10, 2);   -- returns 5
SELECT safe_divide(10, 0);   -- returns NULL safely
```

### 19.7 — List and Drop Functions

```sql
-- See all your functions
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public';

-- Drop a function
DROP FUNCTION IF EXISTS get_discounted_price(NUMERIC, NUMERIC);

-- Drop a procedure
DROP PROCEDURE IF EXISTS place_order(INTEGER, INTEGER, INTEGER);
```

---

## 20. Triggers

> A Trigger automatically runs a function BEFORE or AFTER an INSERT/UPDATE/DELETE.

```sql
-- Step 1: Create a log table
CREATE TABLE order_log (
    log_id     SERIAL PRIMARY KEY,
    order_id   INTEGER,
    action     VARCHAR(10),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(50) DEFAULT CURRENT_USER
);

-- Step 2: Create the trigger function
CREATE OR REPLACE FUNCTION log_order_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO order_log (order_id, action) VALUES (NEW.order_id, 'INSERT');
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO order_log (order_id, action) VALUES (NEW.order_id, 'UPDATE');
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO order_log (order_id, action) VALUES (OLD.order_id, 'DELETE');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Attach trigger to the orders table
CREATE TRIGGER orders_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION log_order_changes();

-- Test: insert a new order, then check log
INSERT INTO orders (customer_id, total_amount, status) VALUES (1, 99.99, 'pending');
SELECT * FROM order_log;

-- Update the order
UPDATE orders SET status = 'shipped' WHERE order_id = (SELECT MAX(order_id) FROM orders);
SELECT * FROM order_log;

-- Drop a trigger
DROP TRIGGER IF EXISTS orders_audit_trigger ON orders;
```

---

## 21. JSON in PostgreSQL

```sql
-- Create a table with JSON column
CREATE TABLE user_profiles (
    user_id  SERIAL PRIMARY KEY,
    username VARCHAR(50),
    data     JSONB  -- JSONB is binary JSON (faster than JSON type)
);

-- Insert JSON data
INSERT INTO user_profiles (username, data) VALUES
('alice', '{"age": 30, "skills": ["SQL", "Python"], "city": "New York"}'),
('bob',   '{"age": 25, "skills": ["Java", "SQL"],   "city": "Chicago"}');

-- Query JSON field
SELECT username, data->>'city' AS city FROM user_profiles;
SELECT username, data->>'age'  AS age  FROM user_profiles;

-- Query nested / array JSON
SELECT username, data->'skills'->0 AS first_skill FROM user_profiles;

-- Filter by JSON value
SELECT * FROM user_profiles WHERE data->>'city' = 'New York';

-- Update JSON field
UPDATE user_profiles
SET data = data || '{"email": "alice@test.com"}'
WHERE username = 'alice';

-- Check if JSON key exists
SELECT * FROM user_profiles WHERE data ? 'email';

-- Expand JSON array into rows
SELECT username, jsonb_array_elements_text(data->'skills') AS skill
FROM user_profiles;
```

---

## 22. Advanced Tips

```sql
-- COALESCE: Return first non-NULL value
SELECT first_name, COALESCE(phone_number, 'No phone') AS phone FROM customers;

-- NULLIF: Return NULL if two values are equal (avoid divide by zero)
SELECT total_amount / NULLIF(quantity, 0) FROM order_items;

-- CASE: Conditional logic in SELECT
SELECT
    product_name,
    price,
    CASE
        WHEN price < 10  THEN 'Budget'
        WHEN price < 100 THEN 'Mid-range'
        WHEN price < 500 THEN 'Premium'
        ELSE 'Luxury'
    END AS price_tier
FROM products;

-- CAST: Convert data types
SELECT CAST('2024-01-15' AS DATE);
SELECT '42'::INTEGER;          -- PostgreSQL shorthand for CAST
SELECT price::TEXT FROM products;

-- String functions
SELECT UPPER(first_name), LOWER(last_name) FROM customers;
SELECT LENGTH(email) FROM customers;
SELECT TRIM('  hello  ');
SELECT SUBSTRING(email FROM 1 FOR 5) FROM customers;
SELECT REPLACE(email, '@email.com', '@newdomain.com') FROM customers;

-- Date functions
SELECT CURRENT_DATE, CURRENT_TIMESTAMP, NOW();
SELECT AGE('2024-01-01');
SELECT EXTRACT(YEAR FROM order_date) AS year,
       EXTRACT(MONTH FROM order_date) AS month
FROM orders;
SELECT order_date + INTERVAL '7 days' AS due_date FROM orders;
SELECT TO_CHAR(order_date, 'Month DD, YYYY') FROM orders;

-- Generate series (very useful for date ranges)
SELECT generate_series(
    '2024-01-01'::DATE,
    '2024-12-01'::DATE,
    '1 month'::INTERVAL
) AS month;

-- COPY: Import CSV data (run in psql or pgAdmin)
-- COPY products FROM '/path/to/products.csv' CSV HEADER;
-- COPY customers TO '/path/to/export.csv' CSV HEADER;

-- Check table size
SELECT
    pg_size_pretty(pg_total_relation_size('orders')) AS total_size,
    pg_size_pretty(pg_relation_size('orders'))        AS table_size;
```

---

## 🎯 Practice Challenges

Try these on your own:

1. **Find the top 3 customers by total spending.**
2. **List products that have never been ordered.**
3. **Get monthly revenue for 2024.**
4. **Write a procedure to apply a 10% discount to all Electronics.**
5. **Create a view that shows each order with all its product names.**
6. **Write a function that returns TRUE if a customer email exists, FALSE otherwise.**
7. **Use a window function to rank products by price within each category.**
8. **Create a trigger that prevents stock from going below 0.**

---

## 📚 Quick Reference

| Command            | Purpose                |
| ------------------ | ---------------------- |
| `SELECT`           | Read data              |
| `INSERT`           | Add rows               |
| `UPDATE`           | Modify rows            |
| `DELETE`           | Remove rows            |
| `CREATE TABLE`     | Define new table       |
| `ALTER TABLE`      | Modify table structure |
| `DROP TABLE`       | Delete table           |
| `JOIN`             | Combine tables         |
| `GROUP BY`         | Aggregate by group     |
| `HAVING`           | Filter groups          |
| `WITH`             | CTE (named subquery)   |
| `OVER()`           | Window function        |
| `BEGIN/COMMIT`     | Transaction            |
| `CREATE FUNCTION`  | Reusable function      |
| `CREATE PROCEDURE` | Stored procedure       |
| `CREATE TRIGGER`   | Auto-run on events     |

---

_Happy learning! Run each section in pgAdmin step by step. 🚀_

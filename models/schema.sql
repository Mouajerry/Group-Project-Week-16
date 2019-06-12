DROP DATABASE IF EXISTS recipe_db;
CREATE DATABASE recipe_db;

USE recipte_db;

CREATE TABLE favoriteDishes (
    item_id INT AUTO_INCREMENT NOT NULL,
    dish_name VARCHAR(45) NOT NULL,
    primary key(item_id)
);

SELECT * FROM favoriteDishes;

INSERT INTO favoriteDishes (dish_name)
VALUES ("Chicken Paprikash"),
("Chicken Gravy"),
("Catalan Chicken");

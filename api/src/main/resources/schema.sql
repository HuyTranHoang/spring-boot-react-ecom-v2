SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS product_category;
CREATE TABLE IF NOT EXISTS product_category
(
    id            int(11)      NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS product;
CREATE TABLE IF NOT EXISTS product
(
    id             int(11) NOT NULL AUTO_INCREMENT,
    name           VARCHAR(255)   DEFAULT NULL,
    description    VARCHAR(1255)  DEFAULT NULL,
    unit_price     DECIMAL(13, 2) DEFAULT NULL,
    image_url      VARCHAR(255)   DEFAULT NULL,
    units_in_stock INT(11)        DEFAULT NULL,
    category_id    int(11)        DEFAULT NULL,
    brand          VARCHAR(255)   DEFAULT NULL,
    date_created   DATETIME(6)    DEFAULT NULL,
    last_updated   DATETIME(6)    DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES product_category (id)
);

DROP TABLE IF EXISTS basket;
CREATE TABLE IF NOT EXISTS basket
(
    id       BIGINT(20) NOT NULL AUTO_INCREMENT,
    buyer_id VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS basket_item;
CREATE TABLE IF NOT EXISTS basket_item
(
    id         BIGINT(20) NOT NULL AUTO_INCREMENT,
    quantity   INT(11)    DEFAULT NULL,
    basket_id  BIGINT(20) DEFAULT NULL,
    product_id int(11)    DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_basket_item_product FOREIGN KEY (product_id) REFERENCES product (id),
    CONSTRAINT fk_basket_item_basket FOREIGN KEY (basket_id) REFERENCES basket (id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user
(
    id         BIGINT(20) NOT NULL AUTO_INCREMENT,
    last_name  VARCHAR(255) DEFAULT NULL,
    first_name VARCHAR(255) DEFAULT NULL,
    username   VARCHAR(255) DEFAULT NULL,
    email      VARCHAR(255) DEFAULT NULL,
    password   VARCHAR(255) DEFAULT NULL,
    avatar     VARCHAR(255) DEFAULT NULL,
    is_active  TINYINT(1)   DEFAULT 1,
    is_locked  TINYINT(1)   DEFAULT 0,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE IF NOT EXISTS role
(
    id   BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS user_role;
CREATE TABLE IF NOT EXISTS user_role
(
    user_id BIGINT(20) NOT NULL,
    role_id BIGINT(20) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_role_user FOREIGN KEY (user_id) REFERENCES user (id),
    CONSTRAINT fk_user_role_role FOREIGN KEY (role_id) REFERENCES role (id)
);
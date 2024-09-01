CREATE DATABASE IF NOT EXISTS `mysql_sam_nodejs_example`;

USE `mysql_sam_nodejs_example`;

CREATE TABLE IF NOT EXISTS `books` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `pages` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
) ENGINE = InnoDB;

DROP DATABASE IF EXISTS `chat_db`;
CREATE DATABASE `chat_db`;

USE `chat_db`;

CREATE TABLE `users` (
    `id`    INT AUTO_INCREMENT PRIMARY KEY,
    `name`  VARCHAR(64) NOT NULL,
    `password` VARCHAR (64) NOT NULL,
    `salt` VARCHAR(64) NOT NULL
);

CREATE TABLE `messages` (
    `id`    INT AUTO_INCREMENT PRIMARY KEY,
    `user` VARCHAR (64) NOT NULL,
    `text` VARCHAR(512) NOT NULL,
    `date` DATETIME NOT NULL
 );

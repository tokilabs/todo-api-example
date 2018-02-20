CREATE DATABASE IF NOT EXISTS `todos`
CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `todos`;

DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `description` varchar(500) DEFAULT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

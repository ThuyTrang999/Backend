SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Cơ sở dữ liệu: `digitalartdb`
--

CREATE DATABASE IF NOT EXISTS `digitalartdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `digitalartdb`;

-- --------------------------------------------------------

CREATE TABLE `User`(
     `user_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `email` VARCHAR(64) NOT NULL UNIQUE,
     `username` VARCHAR(64) NOT NULL UNIQUE,
     `password` VARCHAR(12) NOT NULL,
     `phone` VARCHAR(10) NOT NULL UNIQUE,
     `fullname` VARCHAR(64) NOT NULL,
     `role` VARCHAR(10) NOT NULL,
     `gender` VARCHAR(10) NOT NULL,
     `address` VARCHAR(512) DEFAULT NULL,
     `avatar` VARCHAR(512) NOT NULL DEFAULT 'avatar-default.png',
     `joinDate` DATETIME DEFAULT NOW()
);
INSERT INTO `User` (`email`, `username`, `password`, `fullname`,`phone`, `role`, `gender`, `address`) VALUES
('lehienas2017@gmail.com', 'trang', '123456', 'Hoàng Thị Thùy Trang', '0395616763', 'Admin', 'Female', 'Vương quốc nhà bè');


CREATE TABLE `Product`(
     `product_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `product_name` VARCHAR(64) NOT NULL,
     `description` TEXT NOT NULL,
     `price` INT NOT NULL,
     `status` VARCHAR(10) DEFAULT 'Còn duyệt'
);


CREATE TABLE `Order`(
     `order_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     `order_date` DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE
);


CREATE TABLE `Payment`(
     `payment_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     `order_date` DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE,
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `Report`(
     `report_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `order_id` INT NOT NULL,
     `payment_method` VARCHAR(10) NOT NULL,
     FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE CASCADE
);



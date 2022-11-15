SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Cơ sở dữ liệu: `digitalartdb`
--
DROP DATABASE IF EXISTS `digitalartdb`;

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
('lehienas2017@gmail.com', 'trang', '123456', 'Hoàng Thị Thùy Trang', '0395616763', 'Admin', 'Female', 'Vương quốc nhà bè'),
('thinh@gmail.com', 'thinh', '123456', 'Trịnh Thịnh', '0395616060', 'Customer', 'Female', 'Quận 7 TPHCM');

CREATE TABLE `Product`(
     `product_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `product_image` VARCHAR(512) NOT NULL,
     `product_name` VARCHAR(64) NOT NULL,
     `description` TEXT NOT NULL,
     `price` INT NOT NULL,
     `status` VARCHAR(10) DEFAULT 'Chờ duyệt',
     `addTime` DATETIME DEFAULT NOW()
);

INSERT INTO `Product` (`product_image`, `product_name`, `description`, `price`, `status`) VALUES
('AI_Art.png', 'Không gian Nhà hát Thính phòng', 
'<p>Bức tranh c&oacute; t&ecirc;n Th&eacute;&acirc;tre D&apos;op&eacute;ra Spatial được trao giải nhất ở hạng mục nghệ thuật số h&ocirc;m 29/8 tại triển l&atilde;m bang Colorado (Mỹ). Ảnh: Jason Allen.</p>
<p>&quot;Bức tranh tr&ocirc;ng giống như từ một vở opera kh&ocirc;ng gian v&agrave; được ho&agrave;n thiện một c&aacute;ch 
đi&ecirc;u luyện. C&aacute;c h&igrave;nh ảnh mang n&eacute;t cổ điển ở một đại sảnh kiến tr&uacute;c Baroque c&ugrave;ng 
một &ocirc; tr&ograve;n trong một cảnh quan ngập tr&agrave;n &aacute;nh nắng v&agrave; rạng rỡ&quot;, c&acirc;y 
viết Matthew Gault của Vice nhận x&eacute;t.</p>', 10000000, 'Còn hàng'),

('nguoi_yeu_hoang_hon.jpg', 'Người yêu Hoàng Hôn', 
'<p>Một v&agrave;i giọt nắng ho&agrave;ng h&ocirc;n &uacute;a ngang bướng 
b&aacute;m m&igrave;nh tr&ecirc;n những c&agrave;nh c&acirc;y kh&ocirc;, ngu ngốc n&iacute;u k&eacute;o 
một điều g&igrave; đ&oacute; trong v&ocirc; vọng, để rồi &iacute;t l&acirc;u sau, nắng tắt, nắng t&agrave;n&hellip;
mang cả buổi chiều buồn h&ograve;a tan v&agrave;o kh&ocirc;ng kh&iacute;. C&oacute; những khi, lang thang tr&ecirc;n đường, 
bỗng dưng chạy thật chậm, cảm thấy b&igrave;nh y&ecirc;n v&ocirc; c&ugrave;ng, khi ngước l&ecirc;n gặp những c&aacute;nh 
diều rực rỡ sắc m&agrave;u thong thả chu du kh&aacute;m ph&aacute; bầu trời, b&igrave;nh thản v&agrave; nhẹ nh&otilde;m.</p>', 
9900000, 'Chờ duyệt');


CREATE TABLE `Cart`(
     `card_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE
);
INSERT INTO `Cart`(`user_id`, `product_id`) VALUES
(1, 1),
(1, 2);


CREATE TABLE `CommentRating`(
     `commentrating_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     `comment_content` VARCHAR(512) NOT NULL,
     `rating_point` INT NOT NULL,
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE
);
INSERT INTO `CommentRating`(`user_id` , `product_id`, `comment_content`, `rating_point`) VALUES
(1, 1, "So deep", 5);


CREATE TABLE `Order`(
     `order_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     `order_date` DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE
);

--Check again--
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




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
('luuquangthang2k@gmail.com', 'liam', '123456', 'Lưu Quang Thắng', '0379028110', 'Customer', 'Male', 'Quận bẩy TPHCM'),
('thinh@gmail.com', 'thinh', '123456', 'Trịnh Thịnh', '0395616060', 'Customer', 'Female', 'Quận 7 TPHCM'),
('hue@gmail.com', 'hue', '123456', 'Huệ', '0395616061', 'Seller', 'Female', 'Quận 7 TPHCM');


CREATE TABLE `SellerPending`(
     `pending_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `name_store` VARCHAR(64) NOT NULL,
     `status` VARCHAR(24) DEFAULT 'Chờ duyệt',
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);
INSERT INTO `SellerPending`(`user_id`, `name_store`) VALUES
(3, 'Tranh Phong Cảnh');


CREATE TABLE `Product`(
     `product_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `seller_id` INT NOT NULL,
     `product_image` VARCHAR(512) NOT NULL,
     `product_name` VARCHAR(64) NOT NULL,
     `description` TEXT NOT NULL,
     `price` INT NOT NULL,
     `status` VARCHAR(24) DEFAULT 'Chờ duyệt',
     `addTime` DATETIME DEFAULT NOW(),
     FOREIGN KEY (`seller_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);

INSERT INTO `Product` (`seller_id`, `product_image`, `product_name`, `description`, `price`, `status`) VALUES
(3, 'AI_Art.png', 'Không gian Nhà hát Thính phòng', 
'<p>Bức tranh c&oacute; t&ecirc;n Th&eacute;&acirc;tre D&apos;op&eacute;ra Spatial được trao giải nhất ở hạng mục nghệ thuật số h&ocirc;m 29/8 tại triển l&atilde;m bang Colorado (Mỹ). Ảnh: Jason Allen.</p>
<p>&quot;Bức tranh tr&ocirc;ng giống như từ một vở opera kh&ocirc;ng gian v&agrave; được ho&agrave;n thiện một c&aacute;ch 
đi&ecirc;u luyện. C&aacute;c h&igrave;nh ảnh mang n&eacute;t cổ điển ở một đại sảnh kiến tr&uacute;c Baroque c&ugrave;ng 
một &ocirc; tr&ograve;n trong một cảnh quan ngập tr&agrave;n &aacute;nh nắng v&agrave; rạng rỡ&quot;, c&acirc;y 
viết Matthew Gault của Vice nhận x&eacute;t.</p>', 10000000, 'Còn hàng'),

(3, 'nguoi_yeu_hoang_hon.jpg', 'Người yêu Hoàng Hôn', 
'<p>Một v&agrave;i giọt nắng ho&agrave;ng h&ocirc;n &uacute;a ngang bướng 
b&aacute;m m&igrave;nh tr&ecirc;n những c&agrave;nh c&acirc;y kh&ocirc;, ngu ngốc n&iacute;u k&eacute;o 
một điều g&igrave; đ&oacute; trong v&ocirc; vọng, để rồi &iacute;t l&acirc;u sau, nắng tắt, nắng t&agrave;n&hellip;
mang cả buổi chiều buồn h&ograve;a tan v&agrave;o kh&ocirc;ng kh&iacute;. C&oacute; những khi, lang thang tr&ecirc;n đường, 
bỗng dưng chạy thật chậm, cảm thấy b&igrave;nh y&ecirc;n v&ocirc; c&ugrave;ng, khi ngước l&ecirc;n gặp những c&aacute;nh 
diều rực rỡ sắc m&agrave;u thong thả chu du kh&aacute;m ph&aacute; bầu trời, b&igrave;nh thản v&agrave; nhẹ nh&otilde;m.</p>', 
9900000, 'Chờ duyệt'),

(3, 'co_gai_nhiem_mau.jpg', 'Cô gái nhiệm màu', 
'<p>Một c&ocirc; g&aacute;i đầy trắc ẩn, gi&agrave;u l&ograve;ng thương người v&agrave; đồng cảm.</p>
<p>Dẫu t&iacute;nh c&aacute;ch lu&ocirc;n c&aacute; t&iacute;nh v&agrave; mạnh mẽ. Nhưng c&ocirc; lại dễ mủi l&ograve;ng v&agrave; cảm động.</p>
<p>C&ocirc; lu&ocirc;n tin v&agrave;o vẻ đẹp của ph&eacute;p m&agrave;u ở thế giới n&agrave;y.</p>', 
9500000, 'Chờ duyệt'),

(3, 'nu_hon_mau_neon.jpg', 'Nụ hôn màu neon', 
'<p><span>Nụ h&ocirc;n đầu đ&ocirc;i l&uacute;c đến rất bất ngờ, khiến bạn chỉ biết đứng như trời trồng, taу ch&acirc;n luống cuống kh&ocirc;ng biết phải l&agrave;m ѕao. </span></p>
<p><span>Cũng đ&ocirc;i l&uacute;c, nụ h&ocirc;n ấу đến một c&aacute;ch thật tự nhi&ecirc;n, từ một đối tượng bạn cũng thầm thương trộm nhớ. </span></p>
<p><span>N&oacute;i chung l&agrave;, nụ h&ocirc;n đầu ấу m&agrave;,d&ugrave; gắn ᴠới kỉ niệm ngọt ng&agrave;o haу buồn b&atilde; th&igrave; chắc chắn ᴠẫn l&agrave; một k&iacute; ức kh&ocirc;ng thể qu&ecirc;n.</span></p>', 
9200000, 'Chờ duyệt'),

(3, 'thanh_pho_trong_mo.jpg', 'Thành phố của những giấc mơ', 
'<p><span>Khi bạn cảm thấy bế tắc trước thực tại cuộc sống th&igrave; bạn sẽ l&agrave;m g&igrave;?</span></p>
<p><span>Khi bạn cảm thấy m&igrave;nh lạc l&otilde;ng với những người xung quanh, bạn sống trong một thế giới đ&ocirc;ng đ&uacute;c nhưng chẳng t&igrave;m được ai bầu bạn th&igrave; bạn sẽ l&agrave;m g&igrave;?</span></p>
<p><span>C&acirc;u trả lời c&oacute; ở Th&agrave;nh phố của những giấc mơ</span></p>', 
9900000, 'Chờ duyệt');


CREATE TABLE `Cart`(
     `cart_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE
);
INSERT INTO `Cart`(`user_id`, `product_id`) VALUES
(3, 1),
(3, 2);


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
(2, 1, "So deep", 5);


CREATE TABLE `Order`(
     `order_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `order_status` VARCHAR(24) NOT NULL,
     `payment_method` VARCHAR(48) NOT NULL,
     `order_change_date` DATETIME NOT NULL DEFAULT NOW(),
     `order_date` DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);
INSERT INTO `Order`(`user_id`, `order_status`, `payment_method`) VALUES
(2, "Đã thanh toán", "Ví digital");

CREATE TABLE `OrderProduct`(
     `order_id` INT NOT NULL,
     `product_id` INT NOT NULL,
     FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE CASCADE,
     FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE
);
INSERT INTO `OrderProduct`(`order_id`, `product_id`) VALUES
(1, 4),
(1, 5);


CREATE TABLE `Transaction`(
     `transaction_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `amount` INT NOT NULL DEFAULT 0,
     `type` VARCHAR(24) DEFAULT 'Thanh toán',
     `transaction_content` VARCHAR(512) NOT NULL,
     `transaction_date` DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);
INSERT INTO `Transaction`(`user_id`, `amount`, `transaction_content`) VALUES
(2, 191000000, 'Thanh toán đơn hàng');


CREATE TABLE `TransactionOrder`(
     `transaction_id` INT NOT NULL,
     `order_id` INT NOT NULL,
     FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`transaction_id`) ON DELETE CASCADE,
     FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE CASCADE
);
INSERT INTO `TransactionOrder`(`transaction_id`, `order_id`) VALUES
(1, 1);


CREATE TABLE `DigitalPay`(
     `digitalpay_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     `user_id` INT NOT NULL,
     `balance` INT NOT NULL DEFAULT 0,
     `create_at` DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE
);
INSERT INTO `DigitalPay`(`user_id`, `balance`) VALUES
(1, 200000000),
(2, 20000000),
(3, 100000),
(4, 20000000);

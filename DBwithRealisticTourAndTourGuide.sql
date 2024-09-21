-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2024 at 04:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourbuzz1`
--

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_status` enum('pending','completed','failed') NOT NULL DEFAULT 'completed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `amount`, `payment_date`, `payment_status`) VALUES
(6, 6, 1145.00, '2024-09-21 14:34:11', 'completed'),
(7, 7, 5000.00, '2024-09-21 14:34:39', 'completed'),
(8, 8, 2392.00, '2024-09-21 14:35:46', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `available_seats` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `guide_id` int(11) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('available','booked') NOT NULL DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `title`, `description`, `location`, `price`, `available_seats`, `start_date`, `end_date`, `image_url`, `guide_id`, `featured`, `status`, `created_at`) VALUES
(17, 'Cox\'s Bazar', 'One of the best places to visit in Bangladesh for beach holidays. Cox\'s Bazar is the longest unbroke sandy beach in the world, 125 km in length. It is the most popular tourist spot among the locals in Bangladesh. Perfect place to relax at the end of a long trip.', 'Beach', 299.00, 30, '2024-09-23', '2024-09-25', 'cox2.jpg', 28, 1, 'available', '2024-09-21 14:15:32'),
(18, 'Bandarban', 'Best place to visit in Bangladesh for tribal life. Bandarban in the Chittagong Hill Tracts area is a naturally beautiful place full of beautiful hills. This is the only hilly region in Bangladesh, home to many tribal groups of the country.', 'Mountain', 229.00, 45, '2024-09-25', '2024-09-27', 'bandarban.jpg', 26, 1, 'available', '2024-09-21 14:17:40'),
(19, 'Sreemangal', 'One of the top places to visit in Bangladesh for nature. Sreemangal is the tea capital of Bangladesh, located in the northeastern part of the country. You\'ll find lush green tea plantations anywhere you go here. ', 'Mountain', 366.00, 25, '2024-09-28', '2024-09-30', 'sreemangal.jpg', 25, 1, 'available', '2024-09-21 14:21:19'),
(20, 'Discover Nepal', 'Nepal with rich ancient cultures set against the most dramatic scenery in the world is a land of discovery and unique experience. For broad minded individuals who value an experience that is authentic and mesmerizing, Nepal is the ideal destination. Come and revel in the untouched and the undiscovered and uncover yourself.', 'Mountain', 5000.00, 19, '2024-09-28', '2024-10-04', 'nepal.jpg', 27, 1, 'available', '2024-09-21 14:23:34'),
(21, 'Kaptai Lake', 'Kaptai Lake the largest man-made freshwater body in Bangladesh. Though created primarily for hydroelectric power generation, it contributes to produce significant quantity of freshwater fishes, navigation, flood control and agriculture, etc. ', 'Lake', 199.00, 30, '2024-09-21', '2024-09-21', 'kaptai.jpg', 24, 1, 'available', '2024-09-21 14:31:31');

-- --------------------------------------------------------

--
-- Table structure for table `tour_bookings`
--

CREATE TABLE `tour_bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `booking_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `seats_booked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour_bookings`
--

INSERT INTO `tour_bookings` (`id`, `user_id`, `tour_id`, `booking_date`, `seats_booked`) VALUES
(6, 42, 18, '2024-09-21 14:34:11', 5),
(7, 43, 20, '2024-09-21 14:34:39', 1),
(8, 49, 17, '2024-09-21 14:35:46', 8);

-- --------------------------------------------------------

--
-- Table structure for table `tour_guides`
--

CREATE TABLE `tour_guides` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `availability_status` enum('available','unavailable') NOT NULL DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour_guides`
--

INSERT INTO `tour_guides` (`id`, `name`, `email`, `phone_number`, `experience_years`, `availability_status`, `created_at`) VALUES
(24, 'Md. Affan Hossain Rakib', 'affan@guide.com', '01722201936', 1, 'unavailable', '2024-09-21 14:04:40'),
(25, 'A. K. M. Shahadat Hossain', 'shahadat@guide.com', '01722201727', 3, 'unavailable', '2024-09-21 14:05:46'),
(26, 'Arnab Ghosh', 'arnab@guide.com', '01922201795', 4, 'unavailable', '2024-09-21 14:07:07'),
(27, 'Rudaba Tabassum', 'rudaba@guide.com', '01522299125', 2, 'unavailable', '2024-09-21 14:07:40'),
(28, 'Eftekhar Tanvir Efti', 'efti@guide.com', '01822201289', 3, 'unavailable', '2024-09-21 14:08:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `user_type`, `created_at`) VALUES
(20, 'Admin1', 'admin1@admin.com', '$2b$10$EOsbjnTpJcGAHAfdv5FxgeVxJDJfzmGUpxurnMJxEJ3I4rc7Ukp6C', 'admin', '2024-09-19 16:21:07'),
(42, 'USER1', 'user1@user.com', '$2b$10$yxdFwrzhhUHnmvap/AeJguWPiMlAr1S2lAbEXKOaxwMx.NW63zHA.', 'user', '2024-09-19 20:44:39'),
(43, 'USER2', 'user2@user.com', '$2b$10$Qw9zrZs3FQgnZx44iyLd7OWjPTeNocI2.piaPqY0F1hQS3fg0FMGS', 'user', '2024-09-19 20:44:53'),
(44, 'USER3', 'user3@user.com', '$2b$10$wNpr7eSNsQo5rVt.RSNPief0nT/yueCFYXgqNRBiO1fZWqrXn0HxK', 'user', '2024-09-19 20:45:11'),
(45, 'USER4', 'user4@user.com', '$2b$10$T.nBplqEtnr80fk/HdENL.ijVVh1X8YnT8ud.XrogxF4/1vpzsmU6', 'user', '2024-09-19 20:45:39'),
(47, 'USER5', 'user5@user.com', '$2b$10$OithFIG6tX5WU4NrhUbZP.SG0m/iz3MjH7OJKD.egoMc0w5yWwQTO', 'user', '2024-09-19 20:46:38'),
(48, 'USER6', 'user6@user.com', '$2b$10$YQK0wBalBSInsdLyCzb4fOe19tMCGX0nmnSogtp/LdcQENMsRFBcW', 'user', '2024-09-20 04:05:12'),
(49, 'Admin2', 'admin2@admin.com', '$2b$10$33GaILh.Y0dxQuDm2G18lemltTbfEGvYPVP3coHmiGM4oKecqLDJG', 'admin', '2024-09-20 17:03:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guide_id` (`guide_id`);

--
-- Indexes for table `tour_bookings`
--
ALTER TABLE `tour_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tour_id` (`tour_id`);

--
-- Indexes for table `tour_guides`
--
ALTER TABLE `tour_guides`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tour_bookings`
--
ALTER TABLE `tour_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tour_guides`
--
ALTER TABLE `tour_guides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `tour_bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `tours_ibfk_1` FOREIGN KEY (`guide_id`) REFERENCES `tour_guides` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `tour_bookings`
--
ALTER TABLE `tour_bookings`
  ADD CONSTRAINT `tour_bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tour_bookings_ibfk_2` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

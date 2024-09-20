-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 10:47 PM
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
(7, 'Tropical Beach Getaway', 'Enjoy a relaxing trip to a serene beach with crystal clear waters.', 'Beach', 1500.00, 25, '2024-10-01', '2024-10-04', 'cox2.jpg', 18, 1, 'available', '2024-09-19 20:18:59'),
(8, 'Mountain Hiking Adventure', 'Embark on an exhilarating hiking adventure through scenic mountain trails.', 'Mountain', 1200.00, 15, '2024-09-25', '2024-09-28', 'sajek1 copy.png', 19, 1, 'available', '2024-09-19 20:18:59'),
(9, 'Lakeside Retreat', 'Experience the tranquility of a peaceful lakeside retreat.', 'Lake', 800.00, 10, '2024-10-05', '2024-10-08', 'haor.jpg', 20, 1, 'available', '2024-09-19 20:18:59'),
(10, 'Sunny Beach Vacation', 'Bask in the sun and enjoy beachside activities at this top vacation spot.', 'Beach', 1800.00, 35, '2024-09-30', '2024-10-02', 'cox1.jpg', 21, 1, 'available', '2024-09-19 20:18:59'),
(11, 'Mountain Climbing Expedition', 'Challenge yourself with a mountain climbing expedition suited for adventure seekers.', 'Mountain', 2000.00, 12, '2024-09-27', '2024-09-30', 'sajek2.png', 22, 1, 'available', '2024-09-19 20:18:59'),
(15, 'Going to Haor', 'Hakaluki haro tour for 3 days 2 night.', 'Lake', 5000.00, 25, '2024-09-26', '2024-09-29', 'hakaluki.jpg', 23, 1, 'available', '2024-09-19 20:37:22');

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
(18, 'Guide 1', 'guide1@example.com', '123-456-7890', 5, 'unavailable', '2024-09-19 16:17:34'),
(19, 'Guide 2', 'guide2@example.com', '234-567-8901', 7, 'unavailable', '2024-09-19 16:17:34'),
(20, 'Guide 3', 'guide3@example.com', '345-678-9012', 10, 'unavailable', '2024-09-19 16:17:34'),
(21, 'Guide 4', 'guide4@example.com', '456-789-0123', 2, 'unavailable', '2024-09-19 16:17:34'),
(22, 'Guide 5', 'guide5@example.com', '567-890-1234', 8, 'unavailable', '2024-09-19 16:17:34'),
(23, 'Guide 6', 'guide6@guide.com', '012345678999', 2, 'unavailable', '2024-09-19 20:34:04');

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
(47, 'USER5', 'user5@user.com', '$2b$10$OithFIG6tX5WU4NrhUbZP.SG0m/iz3MjH7OJKD.egoMc0w5yWwQTO', 'user', '2024-09-19 20:46:38');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tour_bookings`
--
ALTER TABLE `tour_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tour_guides`
--
ALTER TABLE `tour_guides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

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

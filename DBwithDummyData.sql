-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 06:28 PM
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
-- Table structure for table `admin_tour_creations`
--

CREATE TABLE `admin_tour_creations` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_assets`
--

CREATE TABLE `media_assets` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(18, 'Guide 1', 'guide1@example.com', '123-456-7890', 5, 'available', '2024-09-19 16:17:34'),
(19, 'Guide 2', 'guide2@example.com', '234-567-8901', 7, 'available', '2024-09-19 16:17:34'),
(20, 'Guide 3', 'guide3@example.com', '345-678-9012', 10, 'available', '2024-09-19 16:17:34'),
(21, 'Guide 4', 'guide4@example.com', '456-789-0123', 2, 'available', '2024-09-19 16:17:34'),
(22, 'Guide 5', 'guide5@example.com', '567-890-1234', 8, 'unavailable', '2024-09-19 16:17:34');

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
(20, 'Admin 1', 'admin1@admin.com', '$2b$10$EOsbjnTpJcGAHAfdv5FxgeVxJDJfzmGUpxurnMJxEJ3I4rc7Ukp6C', 'admin', '2024-09-19 16:21:07'),
(21, 'Lionel Messi', 'lionel.messi@example.com', '$2b$10$nx6PAYD9l0PcIfGTfO9AieWHnmJMRTb/aPxh/waYxj1pPqgguT0YK', 'user', '2024-09-19 16:22:15'),
(22, 'Cristiano Ronaldo', 'cristiano.ronaldo@example.com', '$2b$10$ae6TjYsGoC7aaCjj6lDNm.hJoKW1lxy3llH7tMDtsFZwrBz8cTbL.', 'user', '2024-09-19 16:22:16'),
(23, 'Neymar Jr', 'neymar.jr@example.com', '$2b$10$CoJweg2dj3ufetmVQ664ke7bOXoynviNU/wJPoB96yNQJJe0yBf2i', 'user', '2024-09-19 16:22:16'),
(24, 'Kylian Mbappe', 'kylian.mbappe@example.com', '$2b$10$vpGLSjVa386lCECKiwhHBOjCt4xzrHnlE2.ok2LuJ7o8GRfIp9Zcq', 'user', '2024-09-19 16:22:16'),
(25, 'Mohamed Salah', 'mohamed.salah@example.com', '$2b$10$i6yoDREf1KtVGqHCuUZBVunJmRZYNB1/aUVaceM3jYiVCaO1g1p5S', 'user', '2024-09-19 16:22:16'),
(26, 'Kevin De Bruyne', 'kevin.debruyne@example.com', '$2b$10$v1eJDLnkh.T9WCTeC4TJU.E9h.chRRf/oJLvg47iaycxF5t1N9jOW', 'user', '2024-09-19 16:22:16'),
(27, 'Virgil van Dijk', 'virgil.vandijk@example.com', '$2b$10$oo7XyoIdUrGoFouDILVM8uWq3qOMf.MCZDo8MPHSoktB5ir4mfiXi', 'user', '2024-09-19 16:22:16'),
(28, 'Sadio Mane', 'sadio.mane@example.com', '$2b$10$uGxVBLeN6Bg0TiMIQyh9ue0UCSLfHB7xNexjEdiWijJEKW54YRFuW', 'user', '2024-09-19 16:22:16'),
(29, 'Robert Lewandowski', 'robert.lewandowski@example.com', '$2b$10$lNC2J/md84GzV5ZncOJvM.MWH5WRffbDF0S1MpRQr5fUX/fSQnAxm', 'user', '2024-09-19 16:22:17'),
(30, 'Eden Hazard', 'eden.hazard@example.com', '$2b$10$fHhUx5KFrLMMPKYee8u6G.R2ZkVAGT2YmSm4..89laejaDagpZtnq', 'user', '2024-09-19 16:22:17'),
(31, 'Paul Pogba', 'paul.pogba@example.com', '$2b$10$lYOrea577hTjST0MfiRDyeixomh5dpR42tVPA5xCqtx04BTqh1s/C', 'user', '2024-09-19 16:22:17'),
(32, 'Antoine Griezmann', 'antoine.griezmann@example.com', '$2b$10$z5QgEuZ9ePyJtfoHTfAyOunJbiYpA/R7FINpNTsjwSKhhuywUkuKe', 'user', '2024-09-19 16:22:17'),
(33, 'Zlatan Ibrahimovic', 'zlatan.ibrahimovic@example.com', '$2b$10$dZnSLrwfy.sHFn6UEQdRsO4T16UwxSUMECyT6skqTcp0.JEVmHDVG', 'user', '2024-09-19 16:22:17'),
(34, 'Gareth Bale', 'gareth.bale@example.com', '$2b$10$WtUnrwMlM.ZgOeba.unmSekfYYgNNG7g5fmXUSdtP9HfYXaeZl4hS', 'user', '2024-09-19 16:22:17'),
(35, 'Luka Modric', 'luka.modric@example.com', '$2b$10$PAmmni0k1LR4pUb/2Xfz7exrUnxWEzhm9jnAdS86M3tjOuTGZWOtC', 'user', '2024-09-19 16:22:17'),
(36, 'Sergio Ramos', 'sergio.ramos@example.com', '$2b$10$N.OjF2J1XfEO1DprpDBGwe5XYOTXnSB1E6M4E474tDCVwUZQCWc7u', 'user', '2024-09-19 16:22:18'),
(37, 'Karim Benzema', 'karim.benzema@example.com', '$2b$10$WHjYe0HvLYHQyUSiix3PmOo7ma5II3enu4hv.VpRk6FEEnDnybSTa', 'user', '2024-09-19 16:22:18'),
(38, 'Gerard Pique', 'gerard.pique@example.com', '$2b$10$eminCJHZZLzgL/b.9iITzOcw6Aq0rh7hPg8GhCrf7WWP1zbIEkg9u', 'user', '2024-09-19 16:22:18'),
(39, 'Thiago Silva', 'thiago.silva@example.com', '$2b$10$ewIw7aL6tYIJYkBT17OqXO864ilgK7BLZiU8WX3V8Kami7ZL3EDJe', 'user', '2024-09-19 16:22:18'),
(40, 'Manuel Neuer', 'manuel.neuer@example.com', '$2b$10$8bWwOAquw1Im6MgL5qmq/esxsfkSV6wQEg/LeM1M9yobcdYCecOv.', 'user', '2024-09-19 16:22:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_tour_creations`
--
ALTER TABLE `admin_tour_creations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `tour_id` (`tour_id`);

--
-- Indexes for table `media_assets`
--
ALTER TABLE `media_assets`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `admin_tour_creations`
--
ALTER TABLE `admin_tour_creations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media_assets`
--
ALTER TABLE `media_assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tour_bookings`
--
ALTER TABLE `tour_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tour_guides`
--
ALTER TABLE `tour_guides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_tour_creations`
--
ALTER TABLE `admin_tour_creations`
  ADD CONSTRAINT `admin_tour_creations_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `admin_tour_creations_ibfk_2` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE;

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

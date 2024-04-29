-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 02:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servicehub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `lastName`, `phone`, `email`, `username`, `password`, `role`, `refreshToken`) VALUES
('admin1000', 'admin1', 'admin1', '9876543210', 'admin1@gmail.com', 'admin1', '1234', 'regular', NULL),
('admin1002', 'admin2', 'admin2', '9876543210', 'admin2@gmail.com', 'admin2', '1234', 'manager', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_post`
--

CREATE TABLE `event_post` (
  `id` int(11) NOT NULL,
  `creator` varchar(191) NOT NULL,
  `date_created` varchar(191) NOT NULL,
  `time_created` varchar(191) NOT NULL,
  `scheduled_date` varchar(191) NOT NULL,
  `scheduled_time` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `event_title` varchar(191) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `imagefiles` varchar(100) NOT NULL,
  `target_group` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_post`
--

INSERT INTO `event_post` (`id`, `creator`, `date_created`, `time_created`, `scheduled_date`, `scheduled_time`, `location`, `event_title`, `description`, `imagefiles`, `target_group`) VALUES
(55, 'admin1000', '2024-4-22', '21:26:18', '2024-04-22', '21:25', 'somewhere else', 'sample event posting', 'sample event description', '\"uploadImages-1713792378889-914555134.jpg,uploadImages-1713792378893-594647784.png\"', '\"Disability 3\"');

-- --------------------------------------------------------

--
-- Table structure for table `event_post_hist`
--

CREATE TABLE `event_post_hist` (
  `id` int(11) NOT NULL,
  `creator` varchar(191) NOT NULL,
  `date_created` varchar(191) NOT NULL,
  `time_created` varchar(191) NOT NULL,
  `event_title` varchar(191) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `imagefiles` varchar(100) NOT NULL,
  `target_group` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `event_registry`
--

CREATE TABLE `event_registry` (
  `registration_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `job_post`
--

CREATE TABLE `job_post` (
  `id` int(11) NOT NULL,
  `creator` varchar(191) NOT NULL,
  `date_created` varchar(191) NOT NULL,
  `time_created` varchar(191) NOT NULL,
  `scheduled_date` varchar(191) NOT NULL,
  `scheduled_time` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `event_title` varchar(191) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `imagefiles` varchar(100) NOT NULL,
  `target_group` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_post`
--

INSERT INTO `job_post` (`id`, `creator`, `date_created`, `time_created`, `scheduled_date`, `scheduled_time`, `location`, `event_title`, `description`, `imagefiles`, `target_group`) VALUES
(8, 'admin1000', '2024-4-22', '13:07:17', '2024-04-22', '13:06', 'somewhere else', 'sample job poxting', 'sample description', '\"uploadImages-1713762437386-879674370.jpg,uploadImages-1713762437388-425798596.png\"', '\"Disability 5\"'),
(9, 'admin1000', '2024-4-22', '13:08:22', '2024-04-22', '13:08', 'somewhere else again', 'sample job posting second', 'sample description again', '\"uploadImages-1713762502957-898583104.jpg,uploadImages-1713762502957-479226225.jpg\"', '\"Disability 2\"');

-- --------------------------------------------------------

--
-- Table structure for table `job_post_hist`
--

CREATE TABLE `job_post_hist` (
  `id` int(11) NOT NULL,
  `creator` int(11) NOT NULL,
  `date_createad` varchar(191) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `imgaefiles` varchar(100) NOT NULL,
  `target` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `job_registry`
--

CREATE TABLE `job_registry` (
  `registration_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middleName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int(11) NOT NULL,
  `birthdate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthplace` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `citizenship` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `civil` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `landline` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseno` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barangay` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `elementary` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attain` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `highschool` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attain1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senior` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attain2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `college` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attain3` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `occupation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `yearEmploy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blood` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disability` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `made_disabled` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `device` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specificDevice` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medicine` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specificMedicine` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `others` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refreshToken` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `createdAt`, `firstName`, `middleName`, `lastName`, `suffix`, `age`, `birthdate`, `birthplace`, `gender`, `religion`, `citizenship`, `civil`, `email`, `phone`, `landline`, `houseno`, `street`, `barangay`, `district`, `city`, `province`, `zipcode`, `elementary`, `attain`, `highschool`, `attain1`, `senior`, `attain2`, `college`, `attain3`, `employment`, `occupation`, `yearEmploy`, `skill1`, `skill2`, `blood`, `height`, `weight`, `disability`, `visibility`, `made_disabled`, `status`, `device`, `specificDevice`, `medicine`, `specificMedicine`, `others`, `password`, `refreshToken`, `role`) VALUES
('1000', '2024-03-26 23:02:49.826', 'sample1000', '', '', NULL, 0, '', '', '', '', '', '', 'sample1000@gmail.com', '', NULL, NULL, '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', NULL, '', '1234', NULL, ''),
('1001', '2024-03-27 01:02:43.313', 'Second1001', '', '', NULL, 0, '', '', '', '', '', '', 'second1001@gmail.com', '', NULL, NULL, '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', NULL, '', '1234', NULL, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event_post`
--
ALTER TABLE `event_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_post`
--
ALTER TABLE `job_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_post_hist`
--
ALTER TABLE `job_post_hist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_post`
--
ALTER TABLE `event_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `job_post`
--
ALTER TABLE `job_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

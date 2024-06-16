-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2024 at 05:24 AM
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
  `refreshToken` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `lastName`, `phone`, `email`, `username`, `password`, `role`, `refreshToken`, `status`) VALUES
('admin1000', 'admin1', 'admin1', '9876543210', 'admin1@gmail.com', 'admin1', '1234', 'regular', NULL, 1),
('admin1002', 'admin2', 'admin2', '9876543210', 'admin2@gmail.com', 'admin2', '1234', 'manager', NULL, 1),
('admin1003', 'admin3', 'admin3', '9757371746', 'admin3@gmail.com', 'admin3', '1234', 'regular', NULL, 1),
('admin1004', 'admin4', 'admin4', '9757987746', 'admin4@gmail.com', 'admin4', '1234', 'regular', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin_active`
--

CREATE TABLE `admin_active` (
  `adminId` varchar(191) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_active`
--

INSERT INTO `admin_active` (`adminId`, `status`) VALUES
('admin1000', 1),
('admin1002', 0);

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
  `target_group` varchar(1000) NOT NULL,
  `post_type` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_post`
--

INSERT INTO `event_post` (`id`, `creator`, `date_created`, `time_created`, `scheduled_date`, `scheduled_time`, `location`, `event_title`, `description`, `imagefiles`, `target_group`, `post_type`) VALUES
(66, 'admin1000', '2024-5-20', '16:01:27', '2024-05-31', '08:00', 'somwhere else', 'sample event posting pago post', 'sample event posting. lorem ipsum blah blahblah', '\"uploadImages-1716192087762-377921277.jpg,uploadImages-1716192087764-291662646.jpg\"', '\"Disability 2\"', 'event_post'),
(67, 'admin1000', '2024-5-20', '23:04:32', '2024-05-26', '16:00', '', 'second event posting para sa mga senior pwd', 'lkngjdfl;adfdlkff;ksd;fkf;aksf;lfdna;ksflkAKSDHLKAhfhDLHFLKSFLKhkfhaFAksfnsLKNFLKSAnflknaskNFKASNFKNASknflkSANFASknflkASNFLKNasknflkasnFKNSNKASNCCLKASNFLKNALKNFLASFLKNAKNFASFNLKANSF ASFALKSNFFLKASNFLKNASKFNKASNFKANSFNA;JFLKANTNUOAHTA,BFAIHTABFANSHRAJRAJFLKALKTALURBFMBSdgbgfnsdmnfkjasl;fjalsjram fknqlksjfalhfam,bfabflkaskfaskjcanaskf;asra,mdalksnljfalskjflasfasnclksskfsfksnkdalksfdlkasflkanvaritgakfnsnanvewfnaslfpafamfnlkansopramc kewhglkafagkdnfnajfmqwmasdnvkankndfasjfj;agamfiodwfbeiognlkenfvkanegnawkeg', '\"uploadImages-1716217472542-298328458.png,uploadImages-1716217472577-167915135.jpg\"', '\"Disability 4\"', 'event_post');

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
  `target_group` varchar(1000) NOT NULL,
  `post_type` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_post`
--

INSERT INTO `job_post` (`id`, `creator`, `date_created`, `time_created`, `scheduled_date`, `scheduled_time`, `location`, `event_title`, `description`, `imagefiles`, `target_group`, `post_type`) VALUES
(24, 'admin1000', '2024-5-20', '16:02:53', '2024-05-31', '10:00', 'somewhere else you cant find', 'sample job posting post from pago', 'sample job description, lorem ipsum blah blah', '\"uploadImages-1716192173051-801293362.jpg,uploadImages-1716192173053-84407517.png\"', '\"Disability 3\"', 'job_post'),
(25, 'admin1000', '2024-6-6', '16:36:56', '2024-06-29', '09:00', 'Somewhere else again', 'New Job Posting', 'Sample event Description', '\"uploadImages-1717663016066-399287589.jpg,uploadImages-1717663016078-729685571.jpg\"', '\"Disability 3\"', 'job_post'),
(26, 'admin1000', '2024-6-7', '08:15:05', '2024-06-23', '10:00', 'somewhere else', 'third job posting', 'sample description', '\"uploadImages-1717719305883-890553705.jpg,uploadImages-1717719305890-344821725.jpg\"', '\"Disability 2\"', 'job_post');

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
-- Table structure for table `mail_sent`
--

CREATE TABLE `mail_sent` (
  `send_id` int(10) NOT NULL,
  `senderID` varchar(191) NOT NULL,
  `date_sent` varchar(191) NOT NULL,
  `time_sent` varchar(191) NOT NULL,
  `receiverID` varchar(191) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `body` varchar(5000) NOT NULL,
  `documentfile` varchar(1500) NOT NULL,
  `imagefile` varchar(1500) NOT NULL,
  `read_status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mail_sent`
--

INSERT INTO `mail_sent` (`send_id`, `senderID`, `date_sent`, `time_sent`, `receiverID`, `subject`, `body`, `documentfile`, `imagefile`, `read_status`) VALUES
(137, 'admin1000', '2024-6-7', '08:28:47', '1000', 'sdadsa', 'asdasdasd', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(138, 'admin1000', '2024-6-7', '08:30:29', '1000', 'sdadsa', 'asdasdasd', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(139, 'admin1000', '2024-6-7', '08:47:41', '1000', 'dasdasda', 'dasdasdasdasdas', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(140, 'admin1000', '2024-6-7', '08:50:04', '1000', 'dasdasda', 'dasdasdasdasdas', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(141, 'admin1000', '2024-6-7', '08:53:48', '1000', 'dasdasda', 'kljfkjsdfsdfkghklsdf', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(142, 'admin1000', '2024-6-7', '08:56:26', '1000', 'dasdasda', 'kljfkjsdfsdfkghklsdf', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(143, 'admin1000', '2024-6-7', '08:59:26', '1000', 'sdadas', 'asdasdas', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(144, 'admin1000', '2024-6-7', '09:02:24', '1000', 'sdada', 'dasdasdasdasdasdas', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(145, 'admin1000', '2024-6-7', '09:03:42', '1000', 'sdasdasda', 'dsadasdasdasd', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(146, 'admin1000', '2024-6-7', '09:05:46', '1000', 'sdsadasdasd', 'asdasdasdasdasdas', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(147, 'admin1000', '2024-6-7', '09:29:03', '100', '147', 'gdfkajsHFbdfadfadfbkjasbfjhdafhkajsdhfjkhasdhfjkahsdf', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(148, 'admin1000', '2024-6-7', '09:38:02', '1000', 'jknvbknsdfklgfnsdgnksdfg', '.ksndfgkl;dsgnm sgnsdflkg;lfsdjgmsdf;lmg', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(149, '1000', '2024-6-8', '08:34:15', 'admin1000', 'subject for admin1000', 'sample content', 'sample.pdf', 'img5.jpg,img6.png', 'unread'),
(150, 'admin1000', '2024-6-8', '14:12:28', '1000', 'REQUEST', 'asdgasjdhfa sjkdhfas dghjafs hgfasd ghfasd ghjafsd ghjasfd ajhsgdfa sghjdf asghjdf ashjgdf ahjgsdfa hjsgfda hjsgfdashjgf ', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread'),
(151, '1000', '2024-6-8', '14:30:50', 'admin1000', 'trytrytyr', 'asdasdas asdasd asd asd as das das das ads dasd ', 'sample.pdf', 'img5.jpg,img6.png', 'unread'),
(152, 'admin1003', '2024-6-11', '14:48:40', '1000', 'sample mail from admin 3', 'body body body body', 'docu.pdf,docu1.docx', 'img7.png,img8.jpg', 'unread');

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
('1000', '2024-03-26 23:02:49.826', 'sample1000', 'sample1000s', 'sample1000smax', NULL, 24, '01/01/2001', 'qc', 'male', 'catholic', 'filipino', '', 'sample1000@gmail.com', '09191859313', NULL, '15', 'mabilis', 'pinyahan', 'second district', 'quezon city', NULL, '1100', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1001', '2024-03-27 01:02:43.313', 'Second1001', 'AA', 'AA', 'AA', 0, '01/01/1999', 'marikina', 'female', 'catholic', 'filipino', '', 'second1001@gmail.com', '09191919131', NULL, '111', 'bago', 'luma', 'district 3', 'qc', NULL, '1119', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', NULL, '', '1234', NULL, ''),
('1002', '2024-03-26 23:02:49.826', 'A', 'A', 'A', NULL, 24, '01/01/2002', 'qc', 'Female', 'christian', 'filipino', '', 'sample1002@gmail.com', '09192939411', NULL, '15', 'A', 'New', 'second district', 'quezon city', NULL, '1111', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1003', '2024-03-26 23:02:49.826', 'AAA', 'AAA', 'AAA', NULL, 24, '01/01/2002', 'qc', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1004', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1005', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1006', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1007', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1008', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1009', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1010', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1011', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1012', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1013', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1014', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1015', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1016', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1017', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1018', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1019', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1020', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1021', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1022', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1023', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1024', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1025', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1026', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1027', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1028', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1029', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1030', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1031', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1032', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1033', '2024-03-27 01:02:43.313', 'Second1001', 'AA', 'AA', 'AA', 0, '01/01/1999', 'marikina', 'female', 'catholic', 'filipino', '', 'second1001@gmail.com', '09191919131', NULL, '111', 'bago', 'luma', 'district 3', 'qc', NULL, '1119', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', NULL, '', '1234', NULL, ''),
('1034\r\n', '2024-03-26 23:02:49.826', 'sample1000', 'sample1000s', 'sample1000smax', NULL, 24, '01/01/2001', 'qc', 'male', 'catholic', 'filipino', '', 'sample1000@gmail.com', '09191859313', NULL, '15', 'mabilis', 'pinyahan', 'second district', 'quezon city', NULL, '1100', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1035', '2024-03-26 23:02:49.826', 'sample1000', 'sample1000s', 'sample1000smax', NULL, 24, '01/01/2001', 'qc', 'male', 'catholic', 'filipino', '', 'sample1000@gmail.com', '09191859313', NULL, '15', 'mabilis', 'pinyahan', 'second district', 'quezon city', NULL, '1100', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1036', '2024-03-26 23:02:49.826', 'sample1000', 'sample1000s', 'sample1000smax', NULL, 24, '01/01/2001', 'qc', 'male', 'catholic', 'filipino', '', 'sample1000@gmail.com', '09191859313', NULL, '15', 'mabilis', 'pinyahan', 'second district', 'quezon city', NULL, '1100', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1037', '2024-03-26 23:02:49.826', 'sample1000', 'sample1000s', 'sample1000smax', NULL, 24, '01/01/2001', 'qc', 'male', 'catholic', 'filipino', '', 'sample1000@gmail.com', '09191859313', NULL, '15', 'mabilis', 'pinyahan', 'second district', 'quezon city', NULL, '1100', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1038', '2024-03-27 01:02:43.313', 'Second1001', 'AA', 'AA', 'AA', 0, '01/01/1999', 'marikina', 'female', 'catholic', 'filipino', '', 'second1001@gmail.com', '09191919131', NULL, '111', 'bago', 'luma', 'district 3', 'qc', NULL, '1119', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', NULL, '', '1234', NULL, ''),
('1039', '2024-03-26 23:02:49.826', 'sample1000', 'sample1000s', 'sample1000smax', NULL, 24, '01/01/2001', 'qc', 'male', 'catholic', 'filipino', '', 'sample1000@gmail.com', '09191859313', NULL, '15', 'mabilis', 'pinyahan', 'second district', 'quezon city', NULL, '1100', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, ''),
('1040', '2024-03-26 23:02:49.826', 'AAAA', 'AAAA', 'AAAA', NULL, 24, '01/01/2004', 'AAAA', 'MALE', 'CATHOLIC', 'filipino', '', 'sample1003@gmail.com', '09191949191', NULL, '15', 'B', 'BAS', 'first district', 'quezon city', NULL, '1151', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '1', '', NULL, '', NULL, '', '1234', NULL, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `mail_sent`
--
ALTER TABLE `mail_sent`
  ADD PRIMARY KEY (`send_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_post`
--
ALTER TABLE `event_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `job_post`
--
ALTER TABLE `job_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `mail_sent`
--
ALTER TABLE `mail_sent`
  MODIFY `send_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

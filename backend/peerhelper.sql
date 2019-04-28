-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2019 at 06:06 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peerhelper`
--

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `community_id` int(5) NOT NULL,
  `community_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`community_id`, `community_name`) VALUES
(1, 'LostAndFound'),
(2, 'Education'),
(3, 'Colabs'),
(4, 'tech');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `community_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_moderator` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`community_id`, `user_id`, `is_moderator`) VALUES
(1, 2, 1),
(2, 2, 1),
(3, 2, 1),
(4, 2, 1),
(1, 1, 0),
(3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts_data`
--

CREATE TABLE `posts_data` (
  `post_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `comments` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts_data`
--

INSERT INTO `posts_data` (`post_id`, `title`, `text`, `score`, `comments`) VALUES
(1, 'test1', 'test1', 0, 0),
(2, 'test2', 'test1', 0, 0),
(3, 'test3', 'test', 0, 0),
(4, 'test4', 'test', 0, 0),
(5, 'test5', 'test', 0, 0),
(6, 'test6', 'test', 0, 0),
(7, 'test7', 'test', 0, 0),
(8, 'test8', 'test', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts_info`
--

CREATE TABLE `posts_info` (
  `post_id` int(11) NOT NULL,
  `community` int(11) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts_info`
--

INSERT INTO `posts_info` (`post_id`, `community`, `user`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 3, 1),
(4, 3, 1),
(5, 1, 2),
(6, 1, 2),
(7, 3, 2),
(8, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `reaction_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'root@root.com', 'R00troot'),
(2, 'admi', 'root@root.co', 'R00troot'),
(3, 'shaan007', 'shantanu.pandey47@gmail.com', 'Dandupur1');

-- --------------------------------------------------------

--
-- Table structure for table `user_score`
--

CREATE TABLE `user_score` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`community_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD KEY `members.community` (`community_id`),
  ADD KEY `members.users` (`user_id`);

--
-- Indexes for table `posts_data`
--
ALTER TABLE `posts_data`
  ADD UNIQUE KEY `post_id` (`post_id`) USING BTREE;

--
-- Indexes for table `posts_info`
--
ALTER TABLE `posts_info`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post.community` (`community`),
  ADD KEY `post.user` (`user`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`reaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_username` (`username`),
  ADD UNIQUE KEY `user_email` (`email`);

--
-- Indexes for table `user_score`
--
ALTER TABLE `user_score`
  ADD UNIQUE KEY `score` (`post_id`,`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `community`
--
ALTER TABLE `community`
  MODIFY `community_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts_info`
--
ALTER TABLE `posts_info`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members.community` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `members.users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts_data`
--
ALTER TABLE `posts_data`
  ADD CONSTRAINT `posts.info` FOREIGN KEY (`post_id`) REFERENCES `posts_info` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts_info`
--
ALTER TABLE `posts_info`
  ADD CONSTRAINT `post.community` FOREIGN KEY (`community`) REFERENCES `community` (`community_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post.user` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

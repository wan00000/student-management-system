
CREATE DATABASE IF NOT EXISTS `CollegeCo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `CollegeCo`;


CREATE TABLE IF NOT EXISTS `LoginDetails` (
  `username` varchar(200) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(150) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE UserInfo(
  regNo varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  tutor varchar(50) NOT NULL,
  department varchar(50) NOT NULL,
  year varchar(50) NOT NULL,
  address text NOT NULL,
  phone varchar(50) NOT NULL
);

ALTER TABLE UserInfo ADD PRIMARY KEY (email);


CREATE TABLE StudentAttendance (email varchar(50),absent text,OD text,month varchar (20));

CREATE TABLE StudentMarks(email varchar(50),testname varchar(20), graphics varchar(5), iot varchar(5), webtech varchar(5), stlab varchar(5), project varchar(5));

CREATE TABLE StudentLibrary(email varchar(50),bookName text,issueDate varchar(200) default '',returnDate varchar(200));



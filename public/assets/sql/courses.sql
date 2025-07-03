CREATE TABLE `courses` (
  `course_id` varchar(10) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `english_name` varchar(255) NOT NULL,
  `child_management` varchar(255) NOT NULL,
  `managing_department` varchar(255) NOT NULL,
  `weight` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(20) NOT NULL,
  `thumbnail` text DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `courses_adder` (`author`);

ALTER TABLE `courses`
  ADD CONSTRAINT `courses_adder` FOREIGN KEY (`author`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

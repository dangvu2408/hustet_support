CREATE TABLE `user_like_courses` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `course_id` varchar(10) NOT NULL,
  `liked_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `user_like_courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`course_id`),
  ADD KEY `course_id` (`course_id`);

ALTER TABLE `user_like_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `user_like_courses`
  ADD CONSTRAINT `user_like_courses_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_like_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

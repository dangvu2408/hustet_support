CREATE TABLE `documents` (
  `doc_id` int(11) NOT NULL,
  `course` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `upload_date` datetime NOT NULL DEFAULT current_timestamp(),
  `type_doc` varchar(255) DEFAULT NULL,
  `doc_author` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `documents`
  ADD PRIMARY KEY (`doc_id`),
  ADD KEY `document_course` (`course`);

ALTER TABLE `documents`
  MODIFY `doc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;


ALTER TABLE `documents`
  ADD CONSTRAINT `document_course` FOREIGN KEY (`course`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

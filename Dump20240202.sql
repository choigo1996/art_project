-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: art
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_type` enum('ROLE_USER','ROLE_ADMIN','ROLE_TEACHER') NOT NULL,
  PRIMARY KEY (`authority_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES ('ROLE_USER'),('ROLE_ADMIN'),('ROLE_TEACHER');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_type` enum('WEBTOON','COOMICBOOK','NOVEL','LIGHTNOVEL','ILLUSTRATION') NOT NULL,
  PRIMARY KEY (`category_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('WEBTOON'),('COOMICBOOK'),('NOVEL'),('LIGHTNOVEL'),('ILLUSTRATION');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL,
  `text` varchar(1500) NOT NULL,
  `question_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7e8oxffbryj1h60f1mqggxqut` (`question_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK7e8oxffbryj1h60f1mqggxqut` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture`
--

DROP TABLE IF EXISTS `lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(1500) NOT NULL,
  `price` int NOT NULL,
  `teacher` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
INSERT INTO `lecture` VALUES (1,'https://lh3.googleusercontent.com/pw/ABLVV85phkNAXSLRbR9ac1vBEanXDn7g5eiKREjtE32-ijPEXjl-2Y8Klk2ENWiKSdCeMYAIPPZ3O6t71T4tQ9WtAvEuA0bX6W2ot7YVij-jFGPzRpxOVpB-aYJ4hlyA5JCS_6Cynl7kPXocSZftXH258TFHH6Hc66NNzOg1mPBy2h0BHgJ2E6GrnlOAqNe7DbDgC5_gnUCFxUam1gUNpjONKn2ms2ATJl74YeIMIVg9aMD6vGZePBLtLbRw3VSQurKRDPtFJtebftvwLyaA6T5ch4ENUCU8EzzWxZ5joqTGJi29lf2chKhvlNVjYUSWpH733jNymj_7M9hjx06_CgqdChBV9q3Z7xndo2S4AgZWZaPAve3Bah2Fw378n_FqI8AA3FfWsGvrdSwT_avHyEB5jAt5vuuJ4bDh3vAJad3otN3m48TDruHNXP9ULDSvb3kzvrWeguGDstQFpMRC_aG0H2YOySoc5q9YybUQvnbN4gyGYbnwLBHUIvXCAZTZP6_566ugH0hKADW2QsdXynwlvRp-3AeLKzekY-uV9BZw1_Zw2PZ5saz-Dkdrwgv1PiL9-mdblAoLdVetgPSQmO-uI1qk-EhOlgnPddjhjuOKoHRo1dN60d2UtyR2t77WwPXWpx8fRJGSV4UReTdspUKnVD2sqT3LI4WWXVWKCw_cKYyngC386NS-PjCWmsm7_4nWkskpXa7J6XlOXadogSiEYYto0kXcn4XLA9G4xVPb7wnXy89T7nQzAxN5D-bbymCp2uQC21yVV_nYXBFZwvvb1qweRCNhftS8B8_nSxe7Av8ijQvkzQhzI_SMfBavv4NSwXHJgjwdy1MSmam-XtNQzkEQa9bwKlft5tuYSh0fYB3vQFMAYjRX6j1tU4L50kxF9usnEA=w730-h754-s-no-gm?authuser=0',15500,'이택기','웹툰의 정석'),(2,'https://lh3.googleusercontent.com/pw/ABLVV85phkNAXSLRbR9ac1vBEanXDn7g5eiKREjtE32-ijPEXjl-2Y8Klk2ENWiKSdCeMYAIPPZ3O6t71T4tQ9WtAvEuA0bX6W2ot7YVij-jFGPzRpxOVpB-aYJ4hlyA5JCS_6Cynl7kPXocSZftXH258TFHH6Hc66NNzOg1mPBy2h0BHgJ2E6GrnlOAqNe7DbDgC5_gnUCFxUam1gUNpjONKn2ms2ATJl74YeIMIVg9aMD6vGZePBLtLbRw3VSQurKRDPtFJtebftvwLyaA6T5ch4ENUCU8EzzWxZ5joqTGJi29lf2chKhvlNVjYUSWpH733jNymj_7M9hjx06_CgqdChBV9q3Z7xndo2S4AgZWZaPAve3Bah2Fw378n_FqI8AA3FfWsGvrdSwT_avHyEB5jAt5vuuJ4bDh3vAJad3otN3m48TDruHNXP9ULDSvb3kzvrWeguGDstQFpMRC_aG0H2YOySoc5q9YybUQvnbN4gyGYbnwLBHUIvXCAZTZP6_566ugH0hKADW2QsdXynwlvRp-3AeLKzekY-uV9BZw1_Zw2PZ5saz-Dkdrwgv1PiL9-mdblAoLdVetgPSQmO-uI1qk-EhOlgnPddjhjuOKoHRo1dN60d2UtyR2t77WwPXWpx8fRJGSV4UReTdspUKnVD2sqT3LI4WWXVWKCw_cKYyngC386NS-PjCWmsm7_4nWkskpXa7J6XlOXadogSiEYYto0kXcn4XLA9G4xVPb7wnXy89T7nQzAxN5D-bbymCp2uQC21yVV_nYXBFZwvvb1qweRCNhftS8B8_nSxe7Av8ijQvkzQhzI_SMfBavv4NSwXHJgjwdy1MSmam-XtNQzkEQa9bwKlft5tuYSh0fYB3vQFMAYjRX6j1tU4L50kxF9usnEA=w730-h754-s-no-gm?authuser=0',15500,'오쿠다 히데오','소설의 정석');
/*!40000 ALTER TABLE `lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_category`
--

DROP TABLE IF EXISTS `lecture_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_category` (
  `lecture_id` bigint NOT NULL,
  `category_type` enum('WEBTOON','COOMICBOOK','NOVEL','LIGHTNOVEL','ILLUSTRATION') NOT NULL,
  PRIMARY KEY (`lecture_id`,`category_type`),
  KEY `FKp6leucg5ydlvndwd7qhgy62jj` (`category_type`),
  CONSTRAINT `FKncj1juoc47d0mimo7b858upw` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`),
  CONSTRAINT `FKp6leucg5ydlvndwd7qhgy62jj` FOREIGN KEY (`category_type`) REFERENCES `category` (`category_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_category`
--

LOCK TABLES `lecture_category` WRITE;
/*!40000 ALTER TABLE `lecture_category` DISABLE KEYS */;
INSERT INTO `lecture_category` VALUES (1,'WEBTOON'),(2,'NOVEL');
/*!40000 ALTER TABLE `lecture_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_intro`
--

DROP TABLE IF EXISTS `lecture_intro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_intro` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `lecture_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_l7gnu6r7ah7xbdq2m1l7w74jl` (`lecture_id`),
  CONSTRAINT `FKpkmryc8txd8aqk44pt32cyls5` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_intro`
--

LOCK TABLES `lecture_intro` WRITE;
/*!40000 ALTER TABLE `lecture_intro` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture_intro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_list`
--

DROP TABLE IF EXISTS `lecture_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_list` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `duration` varchar(255) DEFAULT NULL,
  `teacher` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `lecture_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1ymlunccemqowicw3c68udiwt` (`lecture_id`),
  CONSTRAINT `FK1ymlunccemqowicw3c68udiwt` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_list`
--

LOCK TABLES `lecture_list` WRITE;
/*!40000 ALTER TABLE `lecture_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL,
  `text` varchar(1500) NOT NULL,
  `title` varchar(50) NOT NULL,
  `admin_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsobdu7xwna27ygsaju5ab30h5` (`admin_id`),
  CONSTRAINT `FKsobdu7xwna27ygsaju5ab30h5` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `login_id` varchar(255) DEFAULT NULL,
  `lecture_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd8gfypla7usdoswtdum5td1mq` (`lecture_id`),
  CONSTRAINT `FKd8gfypla7usdoswtdum5td1mq` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL,
  `text` varchar(1500) NOT NULL,
  `title` varchar(50) NOT NULL,
  `lecture_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsha43xl21krak98dl5uyol64d` (`lecture_id`),
  KEY `FK4ekrlbqiybwk8abhgclfjwnmc` (`user_id`),
  CONSTRAINT `FK4ekrlbqiybwk8abhgclfjwnmc` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKsha43xl21krak98dl5uyol64d` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL,
  `rating` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `lecture_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKriucnk3m7hsvjnwtdxxoqp5l8` (`lecture_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKriucnk3m7hsvjnwtdxxoqp5l8` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activated` bit(1) DEFAULT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `login_id` varchar(50) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `purchase_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_6ntlp6n5ltjg6hhxl66jj5u0l` (`login_id`),
  KEY `FK6lpf6pu7cis0lurcmm82wyumv` (`purchase_id`),
  CONSTRAINT `FK6lpf6pu7cis0lurcmm82wyumv` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '','1996-12-26','admin@naver.com','admin','관리자','$2a$10$PcX5.C.tfKEYBjbyf/9DOemTSXVUmUvAdR5jBfsj2f3/kAXwTlTZm',NULL),(2,_binary '','1982-11-11','rere1996@naver.com','rere1996','kimdoe','$2a$10$2xN6Jq9Y4gUz0DkRG4zF6eEV/Df5vBifNLO5HzifwTLjbnmha9b3u',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authority`
--

DROP TABLE IF EXISTS `user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authority` (
  `user_id` bigint NOT NULL,
  `authority_type` enum('ROLE_USER','ROLE_ADMIN','ROLE_TEACHER') NOT NULL,
  PRIMARY KEY (`user_id`,`authority_type`),
  KEY `FKgu18l5ieoq9a8nl7osscvnyib` (`authority_type`),
  CONSTRAINT `FKgu18l5ieoq9a8nl7osscvnyib` FOREIGN KEY (`authority_type`) REFERENCES `authority` (`authority_type`),
  CONSTRAINT `FKpqlsjpkybgos9w2svcri7j8xy` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authority`
--

LOCK TABLES `user_authority` WRITE;
/*!40000 ALTER TABLE `user_authority` DISABLE KEYS */;
INSERT INTO `user_authority` VALUES (2,'ROLE_USER'),(1,'ROLE_ADMIN');
/*!40000 ALTER TABLE `user_authority` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-02  9:37:44

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
  `title` varchar(255) NOT NULL,
  `teacher_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhagxssgwojseae2bdfwex3sg8` (`teacher_id`),
  CONSTRAINT `FKhagxssgwojseae2bdfwex3sg8` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
INSERT INTO `lecture` VALUES (1,'https://lh3.googleusercontent.com/pw/ABLVV85CXwQKWUwmM6YwCfERIdeji16RD9VKWRQfXwBd5uEurz4MUcABVlGhrpCqcgkNsMKc2jrP4EpQLiOgG53Ho_DHUq5ibqeMH2qH1GekuY98DwtzV42MGFCG1M4N2Y4Ed24QiSCflAbP-cgab5sdyJFYXzI3tmun6Dutmwdi5HDvSbNjtXrF9tqH1dX3LOgKGz4llI1durfTBEwejHs0Q5yw-LGm1byjNQ5Y22KNWVADPeLiGFJdQD5920OEPXRA1Xz1rPIjfZ6SNqilIwSDlgSHrC1DztkieQOdH_HHbJkHsejaGbEdYGOG5YnyI6U1e_rjypBfFB0EHUdF-Q5TrB1Lul011ynntG-8IH_LWkm3Jop0hwwz42gZ1naySAem1D9YDMLn10GGsa6LHukM9GHJAgiIt25tP7MEVqLqV7SjNR4LiJF_Of27FV4igjydtcesmTKNlvg6l5Q6huBSn97Qf7ah3pIbr96kDvlHjdU5ZtrPLEt_uOVwN4WjOMzlvUohT0gszT8l8Yk_S_e4jZfVUBh7dafzpkyMFA-OMrtNPCFhTas4J-c9QupbUcvlEWUsar7tNsLcbWMNOyv1pKt7lx6cw3og_ShaMmh8TSDemGplb-eCe8v0hEhgtCM1j0XiSGTjp_0LZDwDRzvhQmte1eohIk2p_pGS-6OHZgWHpNsyDcxl3LYtH_LMJCu8GmWKK5xjNR4WcPanly7rqraCxaCmykwen2xV-YgH9s9mgqEiwRw72LVQuGIq4ZvfXkAwBOItwGPY5Wd7z3ddsHXPjZue-C6vG_582_Ax6LGnZAjva2-NMfRjTvac2pp1UYOy7iblVlW8yb32M1QPduUEXCBlpQk_TvR3Ado1KXBLaiD2c5WihIB7yLm0QG8wtxMYESDy6oqpobejZg805FhWq1k=w730-h754-s-no-gm?authuser=0',15500,'웹툰의 정석',2),(2,'https://lh3.googleusercontent.com/pw/ABLVV85CXwQKWUwmM6YwCfERIdeji16RD9VKWRQfXwBd5uEurz4MUcABVlGhrpCqcgkNsMKc2jrP4EpQLiOgG53Ho_DHUq5ibqeMH2qH1GekuY98DwtzV42MGFCG1M4N2Y4Ed24QiSCflAbP-cgab5sdyJFYXzI3tmun6Dutmwdi5HDvSbNjtXrF9tqH1dX3LOgKGz4llI1durfTBEwejHs0Q5yw-LGm1byjNQ5Y22KNWVADPeLiGFJdQD5920OEPXRA1Xz1rPIjfZ6SNqilIwSDlgSHrC1DztkieQOdH_HHbJkHsejaGbEdYGOG5YnyI6U1e_rjypBfFB0EHUdF-Q5TrB1Lul011ynntG-8IH_LWkm3Jop0hwwz42gZ1naySAem1D9YDMLn10GGsa6LHukM9GHJAgiIt25tP7MEVqLqV7SjNR4LiJF_Of27FV4igjydtcesmTKNlvg6l5Q6huBSn97Qf7ah3pIbr96kDvlHjdU5ZtrPLEt_uOVwN4WjOMzlvUohT0gszT8l8Yk_S_e4jZfVUBh7dafzpkyMFA-OMrtNPCFhTas4J-c9QupbUcvlEWUsar7tNsLcbWMNOyv1pKt7lx6cw3og_ShaMmh8TSDemGplb-eCe8v0hEhgtCM1j0XiSGTjp_0LZDwDRzvhQmte1eohIk2p_pGS-6OHZgWHpNsyDcxl3LYtH_LMJCu8GmWKK5xjNR4WcPanly7rqraCxaCmykwen2xV-YgH9s9mgqEiwRw72LVQuGIq4ZvfXkAwBOItwGPY5Wd7z3ddsHXPjZue-C6vG_582_Ax6LGnZAjva2-NMfRjTvac2pp1UYOy7iblVlW8yb32M1QPduUEXCBlpQk_TvR3Ado1KXBLaiD2c5WihIB7yLm0QG8wtxMYESDy6oqpobejZg805FhWq1k=w730-h754-s-no-gm?authuser=0',15000,'만화의 정석',2),(3,'https://lh3.googleusercontent.com/pw/ABLVV85CXwQKWUwmM6YwCfERIdeji16RD9VKWRQfXwBd5uEurz4MUcABVlGhrpCqcgkNsMKc2jrP4EpQLiOgG53Ho_DHUq5ibqeMH2qH1GekuY98DwtzV42MGFCG1M4N2Y4Ed24QiSCflAbP-cgab5sdyJFYXzI3tmun6Dutmwdi5HDvSbNjtXrF9tqH1dX3LOgKGz4llI1durfTBEwejHs0Q5yw-LGm1byjNQ5Y22KNWVADPeLiGFJdQD5920OEPXRA1Xz1rPIjfZ6SNqilIwSDlgSHrC1DztkieQOdH_HHbJkHsejaGbEdYGOG5YnyI6U1e_rjypBfFB0EHUdF-Q5TrB1Lul011ynntG-8IH_LWkm3Jop0hwwz42gZ1naySAem1D9YDMLn10GGsa6LHukM9GHJAgiIt25tP7MEVqLqV7SjNR4LiJF_Of27FV4igjydtcesmTKNlvg6l5Q6huBSn97Qf7ah3pIbr96kDvlHjdU5ZtrPLEt_uOVwN4WjOMzlvUohT0gszT8l8Yk_S_e4jZfVUBh7dafzpkyMFA-OMrtNPCFhTas4J-c9QupbUcvlEWUsar7tNsLcbWMNOyv1pKt7lx6cw3og_ShaMmh8TSDemGplb-eCe8v0hEhgtCM1j0XiSGTjp_0LZDwDRzvhQmte1eohIk2p_pGS-6OHZgWHpNsyDcxl3LYtH_LMJCu8GmWKK5xjNR4WcPanly7rqraCxaCmykwen2xV-YgH9s9mgqEiwRw72LVQuGIq4ZvfXkAwBOItwGPY5Wd7z3ddsHXPjZue-C6vG_582_Ax6LGnZAjva2-NMfRjTvac2pp1UYOy7iblVlW8yb32M1QPduUEXCBlpQk_TvR3Ado1KXBLaiD2c5WihIB7yLm0QG8wtxMYESDy6oqpobejZg805FhWq1k=w730-h754-s-no-gm?authuser=0',30000,'그림의 정석',2),(4,'https://lh3.googleusercontent.com/pw/ABLVV841daM8IHGrHjo1be5aAchovDUFD1L8ynVqhKQ5TXPX4f6teHyX-vGXIIdccvrMO7JYKsCTS_9L-RTt3bNitf5SjsKOwMHIiFS2JCOmwdQkxiFK_4XPPoBPUZWmBK80OMSLSVkut5mAvXcp3HwCQObR3y67e94A0gB5hHAWkqfD9VApd40_9J6k8ST87cv4tabGU-YQIC6TOiUNSYoSeG89LoYTEm_mTBrkTT6EqqSPRVY2m8nINZSzTo928TjY6NNIcRqx5-cOcLRCeXAz7MxG31hrWqbwrzFqhzri0MUdUdLqoZM3dNtw6oE4_6vMIDQpD0z7GRZWJzy7szFUd2NW12iaRDUbAjHQUWaV4y8wWQrFCsAB2NxLh2RU9YSRmboimCwKosF7n1NmhZDzYQ_D2Ur5hODI80pqQibcDvUPYUUwS18Qbu8-c29GgvayErJTxWs0sZ3fGNvm6jO4lkCGfnmHHOKPxsgBMJLr99cNFbWbXc__9NyXijc_FjNEwaLA4AH38EF0CfxeUZ3RUKgsFWq2nQcykLs_tMUbR2m4MnDJbxx3tyWTLe1HcDRAnGaLDURr6pqab_xdwqA3V6zS_UkD3v3XT8EJBcMyN_ZBZGk4BZTwQJ9TBulBPeZGYRUlFZqFNxhI7DGC6TGaEOBkVMrncy8x_M5WhAq87aD1N4RfLXaFmokKw4L_5PSlPFVm-NgwHhZ5gM5dFK-JuFOQ9m1zuCBSCRw7-wBSFI3yfn8ZwD9bt5HlAXGfHHPfOIddL7Z8GxqDUtobHYxGXCeO_aWisOWu-pJT2nT5UHUNkBVtSfCkB_NVXqwG79abQNBVP5nu8uqZN4ZmacZpGZB7-QtmtvndrDaZw22YB0K7YCIQIL192X2UlksveT8QJg_qmxFrWtz_V-VnRhqCE6Ew274=w500-h655-s-no-gm?authuser=0',250000,'소설과 시인',3),(5,'https://lh3.googleusercontent.com/pw/ABLVV847JCiLga32H7DY64OVT4yXLpd7-SYei_wmI4QZLx9B1Dh9dwsxDiI_B8Vc4UBfmK9INz3qOShrc6YucEJc-8lGRmA5jBqXylsVwbhzHuf4Tc7Y0FYIQKLz0fZ0vrO3_vtu8HX41UkM1Y_IwzKwlsUE0vR3OZbBEQ0RKl1paCemhgbXLMFpiJGLPKVqSxegDYxBl2wHn8H4I1ETmcP4CE4A42awW68ctb7oUlUU5jf6jfY9l9_YO4FlUBjQXnIvyLNNkwpOuvUlbE4I1TbvE2XKwATW6hyjaltn_2oI9dqX1koFC_hbKei8I_DL4uNir-HBTWUQMWmthdqw8WmlxZuYrN2XrknfwKmrZEfXrvtuV3MI7hn8iA_8a6D9jnJKRC4cmyk7Q2hL2-7toGNj4hTpaaBPQfTU037yiqg-z95czrB_084df1fkExsrnfHEmgqq2B_cGkb7Ia4bJOkdQUEYdUZzgSbQzN0ICJATjcF_PJFcbISQ7jTA2w2mOT0mFI1Pzz-4qC0yeWRjQMA3kO2cW4zxJYTgMqTnws9G4gnZ0u3FWhBKudb7jJeitT90NNOPF0k1ZS0dPsFo1_0w5UJjgDlAf1JREKa6AS2nWWnrKRDPd7b13R3UQFVQKDkRNA6P9Up2h-j5KvBg3vA4PfhCwGqaBhmze8DakZYeQxHplnPSLOvPFU-XoKj3XS0tz0Jac3zwMNfpS3FBuvl-hMmc0RiPmA4kgvC-IXEkpw9Yicv_1vtwgfHiXQ1HzUR8vuTncFjuWFQrf_Xp_6XAnbuVg90FvpAoyaGTQnvwWIvhZhi1VxQyWCrIsomeVIOc5vqVrcWUUhut5MoCQ68YdkBArf0-ELno5bQVEuYVCUziZ-Kx_-hNrshOdncyz21mgqIQ3xNlXOhdCu5vdo1OydxQPx4=w500-h738-s-no-gm?authuser=0',30000,'라이트 노벨 좀 더 쉽게 쓰는 방법',4),(6,'https://lh3.googleusercontent.com/pw/ABLVV847JCiLga32H7DY64OVT4yXLpd7-SYei_wmI4QZLx9B1Dh9dwsxDiI_B8Vc4UBfmK9INz3qOShrc6YucEJc-8lGRmA5jBqXylsVwbhzHuf4Tc7Y0FYIQKLz0fZ0vrO3_vtu8HX41UkM1Y_IwzKwlsUE0vR3OZbBEQ0RKl1paCemhgbXLMFpiJGLPKVqSxegDYxBl2wHn8H4I1ETmcP4CE4A42awW68ctb7oUlUU5jf6jfY9l9_YO4FlUBjQXnIvyLNNkwpOuvUlbE4I1TbvE2XKwATW6hyjaltn_2oI9dqX1koFC_hbKei8I_DL4uNir-HBTWUQMWmthdqw8WmlxZuYrN2XrknfwKmrZEfXrvtuV3MI7hn8iA_8a6D9jnJKRC4cmyk7Q2hL2-7toGNj4hTpaaBPQfTU037yiqg-z95czrB_084df1fkExsrnfHEmgqq2B_cGkb7Ia4bJOkdQUEYdUZzgSbQzN0ICJATjcF_PJFcbISQ7jTA2w2mOT0mFI1Pzz-4qC0yeWRjQMA3kO2cW4zxJYTgMqTnws9G4gnZ0u3FWhBKudb7jJeitT90NNOPF0k1ZS0dPsFo1_0w5UJjgDlAf1JREKa6AS2nWWnrKRDPd7b13R3UQFVQKDkRNA6P9Up2h-j5KvBg3vA4PfhCwGqaBhmze8DakZYeQxHplnPSLOvPFU-XoKj3XS0tz0Jac3zwMNfpS3FBuvl-hMmc0RiPmA4kgvC-IXEkpw9Yicv_1vtwgfHiXQ1HzUR8vuTncFjuWFQrf_Xp_6XAnbuVg90FvpAoyaGTQnvwWIvhZhi1VxQyWCrIsomeVIOc5vqVrcWUUhut5MoCQ68YdkBArf0-ELno5bQVEuYVCUziZ-Kx_-hNrshOdncyz21mgqIQ3xNlXOhdCu5vdo1OydxQPx4=w500-h738-s-no-gm?authuser=0',200000,'소설의 시작과 끝',4),(7,'https://lh3.googleusercontent.com/pw/ABLVV84cqD58afsTeCZ3Zzo5KZeyw1TOGHC5zyAoKQLtLtbrHHanoYz9plYGab_PZKL-VxcAJkVkUA_ctx8mLQnXxFKVvpKjnDzR4A9j58FunE3tSx91vNQGr7uYgE6bBfyboY8eVyDLDr1s37UvBTsh3ITUzXeT_rZKn0Adb0665vsxJSWMgpyc6ffS9fXbYI4DO4jUgKiEblwp4IJJPeEfWlnpCaQOuRgG0MxN8Vsal3F9VJbeO4sI6Am_nyNNY9RfMJHQQaI4TuQB5l-swxMNqAkzS8YSPPxtMBVOkjXY9dIdv-xsdgYQMibkIaaUlh_auObgZ8SnXcsCAqbNLUcaYAepVmbh1xzkr08lSMe0I37tIc9xx0IHrvZDSVWojhopRm6pLjfwYGRZ7Lxdly005cZz53Nq4aISHl-f9vb0HGxIuFjG4JI4BPSNv6WN-oFCCwcMm_9Hrb88MzQFZ2OJmuRIxePR568Eoa24NkCMQsBAK52fS6_Gz7yji1RqB3QzrQwva6dvvtUZvT0QJx8E86WrnS-QebShkjtslyKUkxtYOWwb8lOaqYLE6NwgNUjA6Ocr5salcnmrjmA3q5vN-IQPsvLhqDlgd-Owc-PRWQqf_-CI9Fv3BjoKOwSL0AHG36z2kxQi9VDGv59acUldGTQNZeMXC_WcPbbVmofBEbfARC1OpagzJGTm4eaIbj8Bk_coRMQuuxuVo1N9tDn1jVD_ubucdmc2ApURACQ_3a7_qRsDVaPhUeofYYz4sXnBow-VEbdsyZN_7jTbBMTXr6GQ9CIe4XQSf7-s9Dnuix2m8F0cqLl0Vp-hrB8sYhbvwkboKdImnl5B2iDjmNBEUMOCY-c5y6O6wZ5bx56bWWbWNQkTmUTIVCGT3GGgHQeyca7bCj0cUp_Zh0Qb7XRDKy5shkU=w333-h499-s-no-gm?authuser=0',20000,'공중그네 작가의 소설 작문법',5),(8,'https://lh3.googleusercontent.com/pw/ABLVV85RTO_GIGopYOpBZghUIRj1t7rchVNq6Bzz45YwvNxmyx-jWSd8myWkv2T_Qe22uVg7r02pIDZZAiOIBSY2JEB9Wqei7vs9wi3rBkQsDWf0Pba2zc7L4JKMkUWcSvMsAXl_Ra_9Z9Vs2OPVciGz81alR_WdFstzYTmK_uSyX9iiwBLIKz2SaDJ5ANZ2_LoMdsq4zl4OzcmVvlS3qnDpi5vrPPog9ojuoR4FQCl-m86S8SXP7gKWmZCKM_9FLelJ6CO_PYuZJrF_XEU-DAk8n5R0fTxCKTbbFVf8V4VJQej-tJYpz_mjEDgIONYcsIQysLO3XqB4xTqOtWPv1EJ3GzMb4D9k-D4ypuM47rB5oTwdwGNCkXmAH_8ONBKy50374tqfz08NUDrU9ePmXge3zNnAlQOHnvEGi0DU8axyvxUBQgwlHqAjKQRJBcsh1M5am3jyuQJbK34JIQMskCglvd4pJEX9Dc4YGiqJlqL8hvQHjRfqNNqBsV9F9OIQsunKrFi45IuXrAWYsjVXPfia8An3-QShFCRtMd_vfY0VCCNuhUiD6aDwiZS4S8_BZfYbjRWVS_tcaeJBlTYniBErzcTKdxS9kNjJdp1Eq73PziXDKm-vhzuynwoGcBQBbRJgk292SEbaF_YEf-TkQMRusNkuflu8d9kS2KtFyvLOmWIRPpMJhQzl7y1X__lLfbA9egTDviQZSvMQadHtlq-nJgoNbB0CAiTziRoo4ryitYanEdY4GTy_hREFhDx8bx1QI5hYuLMZexfo4BjbxabD-oWxygdXmZknwdKEpM8n2rW5-y3OTHdFbUOmuiEi9xnIto00YJEyz_BYT1pMnlFL8VOncldAVl1Pwr3kI5wR4rotc1q9y_9J9uyFMDU1n6GzcMGk5hMDgJwT1ykyKJb1fxjMLgw=w480-h694-s-no-gm?authuser=0',150000,'추리 만화의 정석',6),(9,'https://lh3.googleusercontent.com/pw/ABLVV85RTO_GIGopYOpBZghUIRj1t7rchVNq6Bzz45YwvNxmyx-jWSd8myWkv2T_Qe22uVg7r02pIDZZAiOIBSY2JEB9Wqei7vs9wi3rBkQsDWf0Pba2zc7L4JKMkUWcSvMsAXl_Ra_9Z9Vs2OPVciGz81alR_WdFstzYTmK_uSyX9iiwBLIKz2SaDJ5ANZ2_LoMdsq4zl4OzcmVvlS3qnDpi5vrPPog9ojuoR4FQCl-m86S8SXP7gKWmZCKM_9FLelJ6CO_PYuZJrF_XEU-DAk8n5R0fTxCKTbbFVf8V4VJQej-tJYpz_mjEDgIONYcsIQysLO3XqB4xTqOtWPv1EJ3GzMb4D9k-D4ypuM47rB5oTwdwGNCkXmAH_8ONBKy50374tqfz08NUDrU9ePmXge3zNnAlQOHnvEGi0DU8axyvxUBQgwlHqAjKQRJBcsh1M5am3jyuQJbK34JIQMskCglvd4pJEX9Dc4YGiqJlqL8hvQHjRfqNNqBsV9F9OIQsunKrFi45IuXrAWYsjVXPfia8An3-QShFCRtMd_vfY0VCCNuhUiD6aDwiZS4S8_BZfYbjRWVS_tcaeJBlTYniBErzcTKdxS9kNjJdp1Eq73PziXDKm-vhzuynwoGcBQBbRJgk292SEbaF_YEf-TkQMRusNkuflu8d9kS2KtFyvLOmWIRPpMJhQzl7y1X__lLfbA9egTDviQZSvMQadHtlq-nJgoNbB0CAiTziRoo4ryitYanEdY4GTy_hREFhDx8bx1QI5hYuLMZexfo4BjbxabD-oWxygdXmZknwdKEpM8n2rW5-y3OTHdFbUOmuiEi9xnIto00YJEyz_BYT1pMnlFL8VOncldAVl1Pwr3kI5wR4rotc1q9y_9J9uyFMDU1n6GzcMGk5hMDgJwT1ykyKJb1fxjMLgw=w480-h694-s-no-gm?authuser=0',150000,'추리 소설 쓰는 법',6),(10,'https://lh3.googleusercontent.com/pw/ABLVV84bymrZHENz3TDyws9kgMPG8MPsdmOm_IoPD0k8cZdCcL3NWrzjQyTfkp8TGOrcjOBGSvq0I6JxGZ6_3selFH7cHdrxO3nz0QSBBFQKTIzTLbQD_wSPMQffj27u0ESEUGLw1wAswvS2RzQYKdxJ5vzZg8OH8zx3yJ1f1IT5QYeoH4XUc1u6snSaW1cqeSEml37NKPQJYbmUfNuIYDkhOiNLjIULjRp8kE43zx6lQus3HulKziWLSxsTdVTNYp5adKFScMIjhOL8evpum_FVn1C5lQAiqw0yXxDowTTIwtgQsQ_RRScz8LOwxsHRFvv6pqTRV3gQXkIs8gduYmBlegDUjDJmEyrJFT4T-pgbkspEsPF28tlbbvkCO7U2spbGk4hceO5eKtJbiWhyBfyevkJg5O_0VxVJp__FX8jIHhzNweOZ493quRv_If5loH4F9g-LFFf4S-cnqWofEFUHLLRluOH5dGuxfLdzUDD2YbgKy_gn2KRbaqjS3kBqvbsEfsAe0EwyFXysOmulo8vPDBkkfKFKp5cbUxXvQldMqNg8CqcEJGuROQlnxGqBOwdN-3Ds6aawiLRje0usAl3pcXs6AH1TwwkHfdBQn8Sk5-pBdQFLlZhg4eAaR7q-hcll7eKQv0brSy0ylPuolYQulmlQFTVgQaOnMOYYR8N-9RW_TnW41Wmvskvq-fCLs9Kr3b1UG74mW5ngX4wMNiwR02Ia1JIA6pm0ZfUaYRGRyYjAHM7-nSuwQ6d4SmCIB9fU6lAqJa_grZyuzX_blCrXxwTr3DxxlWgrduFmPcs8rZ7yR14txGZh-mS0zroSM0EbUtWp7CisUZxOrsBtHpG4rUPJPqEluqUbtD_6U1x9-q1wqO7ESqmiS4k1_nNnGuDc1G5x9ktEd6vRbtY7seFGqqaz288=w850-h850-s-no-gm?authuser=0',200000,'귀여운 동물 일러스트 그리기',7);
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
INSERT INTO `lecture_category` VALUES (1,'WEBTOON'),(2,'COOMICBOOK'),(8,'COOMICBOOK'),(4,'NOVEL'),(6,'NOVEL'),(7,'NOVEL'),(9,'NOVEL'),(5,'LIGHTNOVEL'),(3,'ILLUSTRATION'),(10,'ILLUSTRATION');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_intro`
--

LOCK TABLES `lecture_intro` WRITE;
/*!40000 ALTER TABLE `lecture_intro` DISABLE KEYS */;
INSERT INTO `lecture_intro` VALUES (1,'이택기 강사님이 알려주는 웹툰의 정석!모두가 웹툰을 그릴 수 있다!나도이제 웹툰작가',1),(2,'이택기 선생님의 만화의 정석!웹툰과는 다른 상업만화를 만들어보자!잡지 연재를 꿈꾸는 젊은 만화가 지망생들에게 인기절정!지금바로 수강신청!',2),(3,'이택기 선생님의 그림의 정석!큐라레 일러스트레이터 출신 김도 선생님의 상업적 그림그리기!',3),(4,'소설과 시인의 마음으로 한 점 부끄럼이 없는 윤동주 선생님의 시와 소설에 관한 이야기들을 재미있고, 쉽게 다가설 수 있도록 만들었습니다.',4),(5,'Link! Like!러브 라이브의 시나리오 집필가 이자, 라이트 노벨 \'아빠는 있잖아, 데스게임 운영으로 먹고 살고 있어\',\'내가 연인이 될 수 있을 리 없잖아, 무리무리!\n(※무리가 아니었다?!)\'를 집필한 라이트 노벨계의 대가 미카미 테렌 선생님의 라이트노벨 쉽게 쓰는 법!',5),(6,'미카미 테렌 선생님의 소설의 기승전결!시작과 끝을 보다 완벽하고 깔끔하게!',6),(7,'\'공중그네\',\'최악\',\'한밤중의 행진\'등의 소설을 작문한 천재 소설가 오쿠다 히데오의 소설 작문법!',7),(8,'\'Q.E.D 증명종료\',\'C.M.B 박물관 사건목록\',\'소라의 그리프터스~1조 엔의 사기꾼들~\'등등을 연재한 추리만화의 대가 카토 모토히로 선생님의 추리 만화 트릭 짜기와 플룻 짜기!',8),(9,'만화가 이자, 소설가인 카토 모토히로 선생님의 추리소설 쓰는 법!',9),(10,'봇제비 일러스트를 그린 일러스트레이터 후모의 귀여운 동물 일러스트 그리는 방법 대공개!',10);
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
  `title` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `lecture_id` bigint DEFAULT NULL,
  `teacher_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1ymlunccemqowicw3c68udiwt` (`lecture_id`),
  KEY `FKaabxhynwwkhprsn7undn2so6p` (`teacher_id`),
  CONSTRAINT `FK1ymlunccemqowicw3c68udiwt` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`),
  CONSTRAINT `FKaabxhynwwkhprsn7undn2so6p` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_list`
--

LOCK TABLES `lecture_list` WRITE;
/*!40000 ALTER TABLE `lecture_list` DISABLE KEYS */;
INSERT INTO `lecture_list` VALUES (1,'48분56초','오리엔테이션','https://www.youtube.com/watch?v=3UU4X3HjEdw',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'2024-02-13 09:31:37.307605','안녕하세요, 여러분! 관리자입니다.\n\n우리는 문학을 사랑하는 모든 분들을 위해 준비된 새로운 온라인 플랫폼을 소개하게 되어 기쁩니다. 오늘부터, Art가 문학과 테크놀로지의 만남으로 탄생하며 여러분 앞에 나서게 되었습니다.\n\nArt는 문학을 통해 즐거움과 영감을 전하는 것을 목표로 합니다. 우리는 소설, 웹툰, 시 등 다양한 문학 장르를 다루는 강사들과 함께하여, 학습자들에게 흥미로운 이야기를 제공하고 문학의 매력을 느낄 수 있는 기회를 만들어내고자 합니다.\n\n우리의 강사들은 각자의 전문 분야에서 경험이 풍부한 전문가들로 구성되어 있습니다. 그들은 유저들에게 새로운 시각과 통찰력을 제공하며, 문학의 다양한 측면을 탐구하고 함께 나누어 나갈 것입니다.\n\n여러분의 문학적 호기심과 탐구정신을 충족시킬 Art에서 함께해주세요. 우리는 여러분과 함께 문학의 세계를 더욱 풍요롭게 만들어 나갈 것입니다.\n\n감사합니다.\n\n관리자 드림','Art - 문학을 더 가까이, 더 재미있게',1),(2,'2024-02-13 09:38:45.260820','앞으로는 더욱더 발전하는 Art가 되도록 노력하겠습니다.','혼란을 끼쳐드려서 죄송합니다.',1),(3,'2024-02-13 09:53:26.842167','관심이 있으신, 여러분께서는 이택기 선생님의 강의를 신청하시면 만나 보실 수 있습니다. ','이택기 선생님이 이번에 새롭게 오셨습니다.',1);
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
  `lecture_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd8gfypla7usdoswtdum5td1mq` (`lecture_id`),
  KEY `FK86i0stm7cqsglqptdvjij1k3m` (`user_id`),
  CONSTRAINT `FK86i0stm7cqsglqptdvjij1k3m` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKd8gfypla7usdoswtdum5td1mq` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,2,8),(2,4,8);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2024-02-13 12:38:36.695662',10,'윤동주 선생님께서 만드신 아름다운 소설과 시인의 마음이 잘 묻어난 강의 였습니다.',4,8);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_6ntlp6n5ltjg6hhxl66jj5u0l` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '','1996-12-26','admin@naver.com','admin','관리자','$2a$10$68TJTCyyOSL54uqbbjOGbeF6oIgFquZXsKyx5bC/Jh63VmeSwyoh2'),(2,_binary '','1982-11-11','rere1996@naver.com','rere1996','이택기','$2a$10$zjcmTfKyCnI/0IBdQ5z8IeXZyci/wydCTCdvgJFBO8Nt5ULaxLqsy'),(3,_binary '','1917-12-30','rere1992@naver.com','rere1992','윤동주','$2a$10$Nb.bVGbvpbf6WfKSL/3D/ePu17xSOvSCvpPldqddCCqHQh/WsvC6a'),(4,_binary '','1999-11-11','rere1995@naver.com','rere1995','미카미 테렌','$2a$10$rrX.SzCB/2Lj9RZgi9P/pOBvmpx/sGQwnMMyacE1Ea138jtVvpU6K'),(5,_binary '','1959-10-23','rere1994@naver.com','rere1994','오쿠타 히데오','$2a$10$zGXaySj7n0LqEtl6MQo7h.L.XsNWT2.UgWD2TlLDLEtlcnW4Oc/ee'),(6,_binary '','1987-11-28','rere1997@naver.com','rere1997','카토 모토히로','$2a$10$qMAFWtRMZlbkMdeyo7bDmePHDxKDtBUv3nwtlIjtU8eWQjsdXcIDa'),(7,_binary '','1999-11-14','rere1964@naver.com','rere1964','후모','$2a$10$abebMmxU2y1LQUNl/6tzZ.oxUjCnNh7qE5DY9KhSfnCgy3RTg0enC'),(8,_binary '','2001-12-26','kimdoe1996@naver.com','kimdoe1996','이커비','$2a$10$tQPoujFPm0Nma.pyuCUha.8M1vE2r9cu5ZBX2OTOL3t9crlDi8RmC');
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
INSERT INTO `user_authority` VALUES (8,'ROLE_USER'),(1,'ROLE_ADMIN'),(2,'ROLE_TEACHER'),(3,'ROLE_TEACHER'),(4,'ROLE_TEACHER'),(5,'ROLE_TEACHER'),(6,'ROLE_TEACHER'),(7,'ROLE_TEACHER');
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

-- Dump completed on 2024-02-13 13:14:46

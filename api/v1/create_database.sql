-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: incompany
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alternativa`
--

DROP TABLE IF EXISTS `alternativa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alternativa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `texto` varchar(500) NOT NULL,
  `questao_id` int(11) NOT NULL,
  `ordem` int(11) NOT NULL,
  `correta` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alternativa_questao1_idx` (`questao_id`),
  CONSTRAINT `fk_alternativa_questao1` FOREIGN KEY (`questao_id`) REFERENCES `questao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativa`
--

LOCK TABLES `alternativa` WRITE;
/*!40000 ALTER TABLE `alternativa` DISABLE KEYS */;
INSERT INTO `alternativa` VALUES (46,' b) armazenar o endereço da última posição ocupada da pilha (topo da pilh.',37,0,'\0'),(47,' a) receber a instrução que estava armazenada na memória e gerar os códigos do micro programa que realizará a tarefa definida por ela. Implementar as operações lógicas (NOT, AND, OR, XOR) e aritméticas (geralmente adição, subtração, multiplicação, divisão, dependendo do microprocessador).',37,0,''),(48,' c) participar da maioria das operações lógicas e aritméticas, além de participar das operações de entrada e saída de dados, é o principal registrador dentro de um microprocessador.',37,0,'\0'),(49,' d) retirar cada instrução da memória, interpretando-a e fornecendo os sinais de controle necessários à sua execução.',37,0,'\0'),(50,' e) servir de memória auxiliar durante a execução de instruções dos programas.',37,0,'\0'),(51,' a) 86 e 1100101',38,0,''),(52,' b) 105 e 01010101',38,0,'\0'),(53,' c) 122 e 10001000',38,0,'\0'),(54,' d) 148 e 11011010',38,0,'\0'),(55,' e) 198 e 11000110',38,0,'\0'),(56,'a) X Y Z S X Y Z S  0 1 1 1 1 0 1 1',39,0,'\0'),(57,' b) X Y Z S X Y Z S  1 1 0 1 0 0 0 1',39,0,''),(58,'c) X Y Z S X Y Z S  0 1 1 1 1 0 1 0',39,0,'\0'),(59,'d) X Y Z S X Y Z S  1 0 0 1 0 0 0 1',39,0,'\0'),(60,'e) X Y Z S X Y Z S  0 1 0 1 1 1 1 1',39,0,'\0'),(63,' a) máxima de entrada que um bloco lógico entende como nível lógico baixo.',40,0,''),(64,' b) máxima de entrada que um bloco lógico entende como nível lógico alto.',40,0,'\0'),(65,'ínima de entrada que um bloco lógico entende como nível lógico baixo.',40,0,'\0'),(66,'d) máxima de saída que um bloco lógico fornece como nível lógico baixo.',40,0,'\0'),(67,' e) mínima de saída que um bloco lógico fornece como nível lógico alto.',40,0,'\0'),(68,'a) Motor  acionado desacionado  12,5 s 18,3 s',41,0,'\0'),(69,' b) Motor  acionado desacionado  32,0 s 48,0 s',41,0,'\0'),(70,'c) Motor  acionado desacionado  12,5 s 8,6 s',41,0,''),(71,' d) Motor  acionado desacionado  18,5 s 15,3 s',41,0,'\0'),(72,' e) Motor  acionado desacionado  16,9 s 16,9 s',41,0,'\0'),(73,'Certo',53,0,''),(74,'Errado',53,0,'\0'),(75,'((B * 4) >= (A + A * 2) AND (5 + 5) >= (A)) ',54,0,'\0'),(76,'(A + 3) > (B + C) ',54,0,''),(77,'((B + A) > (C + C) AND (A ! C) < (B ! A))',54,0,'\0'),(78,'((A + C) < (B * 2) OR (C + B * 3) < (A * 3)) ',54,0,'\0'),(79,'(C * 3) <= (3 + C * 2)',54,0,'\0'),(82,'(a <= b);',56,0,''),(83,'(a >= b);',56,0,'\0'),(84,'(a < b);',56,0,'\0'),(85,'(a > b);',56,0,'\0'),(86,'NÃO (a = b).',56,0,'\0'),(89,'Certo',57,0,''),(90,'Errado',57,0,'\0'),(91,'Certo',58,0,'\0'),(92,'Errado',58,0,''),(93,'Certo',59,0,''),(94,'Errado',59,0,'\0'),(95,'Certo',60,0,'\0'),(96,'Errado',60,0,'');
/*!40000 ALTER TABLE `alternativa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nota` int(11) NOT NULL,
  `comentario` varchar(500) DEFAULT NULL,
  `inscricao_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_avaliacao_inscricao1_idx` (`inscricao_id`),
  CONSTRAINT `fk_avaliacao_inscricao1` FOREIGN KEY (`inscricao_id`) REFERENCES `inscricao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (7,1,'Curso era ruin depois ficou bom mas depois parece que pirou',12),(8,2,'Parabéns pelo curso! \nObrigado !',14);
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (52,'Desenvolvimento de Software'),(54,'Eletrônica e Hardware');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(500) NOT NULL,
  `nome_tutor` varchar(200) NOT NULL,
  `ativo` bit(1) NOT NULL,
  `publicado` bit(1) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_curso_categoria_idx` (`categoria_id`),
  KEY `fk_curso_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_curso_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_curso_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Introdução a Eletrônica Digital 1','José de Souza Melo','','',54,5),(11,'Lógica de Programação','Ronaldo Argélio','','',52,5);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscricao`
--

DROP TABLE IF EXISTS `inscricao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscricao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscricao`
--

LOCK TABLES `inscricao` WRITE;
/*!40000 ALTER TABLE `inscricao` DISABLE KEYS */;
INSERT INTO `inscricao` VALUES (11,'2019-09-04 00:28:07'),(12,'2019-09-04 21:20:47'),(13,'2019-09-07 13:10:12'),(14,'2019-09-08 10:27:31');
/*!40000 ALTER TABLE `inscricao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscricao_dados`
--

DROP TABLE IF EXISTS `inscricao_dados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscricao_dados` (
  `usuario_id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `inscricao_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`curso_id`),
  KEY `fk_inscricao_dados_curso1_idx` (`curso_id`),
  KEY `fk_inscricao_dados_inscricao1_idx` (`inscricao_id`),
  CONSTRAINT `fk_inscricao_dados_curso1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_inscricao_dados_inscricao1` FOREIGN KEY (`inscricao_id`) REFERENCES `inscricao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_inscricao_dados_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscricao_dados`
--

LOCK TABLES `inscricao_dados` WRITE;
/*!40000 ALTER TABLE `inscricao_dados` DISABLE KEYS */;
INSERT INTO `inscricao_dados` VALUES (9,11,11),(9,1,12),(5,1,13),(11,11,14);
/*!40000 ALTER TABLE `inscricao_dados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interacao`
--

DROP TABLE IF EXISTS `interacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `percentual` int(11) NOT NULL,
  `inscricao_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_interacao_inscricao1_idx` (`inscricao_id`),
  KEY `fk_interacao_material1_idx` (`material_id`),
  CONSTRAINT `fk_interacao_inscricao1` FOREIGN KEY (`inscricao_id`) REFERENCES `inscricao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_interacao_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interacao`
--

LOCK TABLES `interacao` WRITE;
/*!40000 ALTER TABLE `interacao` DISABLE KEYS */;
INSERT INTO `interacao` VALUES (981,80,12,27),(982,100,12,28),(995,100,12,24),(996,100,12,25),(997,100,14,33),(998,100,14,34),(999,100,14,38),(1000,100,14,41),(1001,100,14,39),(1002,100,14,40),(1005,100,14,42);
/*!40000 ALTER TABLE `interacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) NOT NULL,
  `tipo` varchar(2) NOT NULL,
  `ativo` bit(1) NOT NULL,
  `unidade_id` int(11) NOT NULL,
  `ordem` int(11) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `final` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_material_unidade1_idx` (`unidade_id`),
  CONSTRAINT `fk_material_unidade1` FOREIGN KEY (`unidade_id`) REFERENCES `unidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (24,'Introdução','V','\0',1,0,'https://www.youtube.com/watch?v=Fe6jf0DE9vs','\0'),(25,'Circuitos','V','\0',1,0,'https://www.youtube.com/watch?v=aYVz0l3ZMWc','\0'),(27,'Avaliação da Unidade','Q','',1,0,'',''),(28,'Material de apoio','V','\0',1,0,'https://www.youtube.com/watch?v=5soxGD7D8Ok','\0'),(33,'Apresentação da Disciplina','D','',26,0,'https://riptutorial.com/Download/react.pdf','\0'),(34,'Entendendo Lógica de programação ','V','',26,0,'https://www.youtube.com/watch?v=tbLziJchz48','\0'),(38,'Avaliação Unidade 1','Q','',26,0,'','\0'),(39,'Importância da Lógica de Programação','V','\0',33,0,'https://www.youtube.com/watch?v=Ds1n6aHchRU','\0'),(40,'Variáveis e constantes','V','\0',33,0,'https://www.youtube.com/watch?v=vp4jgXA_BB0','\0'),(41,'Boas práticas','V','\0',33,0,'https://www.youtube.com/watch?v=7ph98Ih_ckc','\0'),(42,'Avaliação final','Q','\0',34,0,'','');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questao`
--

DROP TABLE IF EXISTS `questao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enunciado` varchar(500) NOT NULL,
  `ordem` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questao_material1_idx` (`material_id`),
  CONSTRAINT `fk_questao_material1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questao`
--

LOCK TABLES `questao` WRITE;
/*!40000 ALTER TABLE `questao` DISABLE KEYS */;
INSERT INTO `questao` VALUES (37,'O acumulador, na estrutura de um microprocessador, tem a função de:',1,27),(38,'O número (C6) 16 convertido para os sistemas numéricos decimal e binário vale, respectivamente,',2,27),(39,'Estão corretamente apresentadas duas condições de entrada e seus respectivos níveis lógicos de saída em\n\n',3,27),(40,'No manual de circuitos integrados TTL, a especificação VIL refere-se à Tensão',4,27),(41,'Considere o circuito: Sabendo que o sinal na saída do temporizador tem frequência de 0,0296 Hz, os intervalos de tempo em que o motor permanece acionado e desacionado valem, aproximadamente:',5,27),(53,'A respeito de análise e desenvolvimento de sistemas, julgue os itens subsequentes.\nLógica de programação é o método de traduzir comandos escritos de uma linguagem humana para a linguagem de máquina',1,38),(54,'Considerando A = 10, B = 7 e C = 6, assinale a opção correta relacionada à lógica de programação.',2,38),(56,'Sendo a e b variáveis inteiras em um programa, a expressão lógica\n\n                          NÃO ((a > b) OU (a = b))',1,42),(57,'Considere que, em um sistema, seja necessário montar uma lista de opções e criar uma rotina para calcular a média das notas dos alunos. Nessa situação, é correto escolher um procedimento para a primeira ação e uma função para a segunda.',2,42),(58,'Caso seja necessário armazenar o conteúdo referente ao controle mensal de uma disciplina, registrando-se a presença em cada dia e a menção parcial de cada aluno, bastará ser construído um registro com um tipo primitivo para o campo relativo à menção e um vetor para o campo relativo à presença do aluno',3,42),(59,'Em um laço de repetição, o controle do número de vezes que o laço será repetido ocorre por meio de operadores lógicos.',4,42),(60,'Quando um break é encontrado dentro de um laço for, a execução do código é interrompida e o programa é finalizado.',5,42);
/*!40000 ALTER TABLE `questao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `curso_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tag_curso1_idx` (`curso_id`),
  CONSTRAINT `fk_tag_curso1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (7,'digital',1);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidade`
--

DROP TABLE IF EXISTS `unidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) NOT NULL,
  `curso_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_table1_curso1_idx` (`curso_id`),
  CONSTRAINT `fk_table1_curso1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidade`
--

LOCK TABLES `unidade` WRITE;
/*!40000 ALTER TABLE `unidade` DISABLE KEYS */;
INSERT INTO `unidade` VALUES (1,'Unidade 1',1),(26,'Unidade 1',11),(33,'Unidade 2',11),(34,'Avaliação final do curso',11),(35,'wdkwo',1);
/*!40000 ALTER TABLE `unidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(500) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_cadastro` datetime NOT NULL,
  `senha` varchar(50) NOT NULL,
  `ativo` bit(1) NOT NULL,
  `tipo` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (5,'Luciano Cardoso','lupearljam@gmail.com','0000-00-00 00:00:00','2A057642222A878BC360F52F8E1F0DFD2AF93196F123269397','','A'),(9,'Juvenal Antena','juvenal@antena.com','0000-00-00 00:00:00','2A057642222A878BC360F52F8E1F0DFD2AF93196F123269397','','U'),(11,'Alaor Pestanha Jr','alaor@uol.com','0000-00-00 00:00:00','2A057642222A878BC360F52F8E1F0DFD2AF93196F123269397','','U');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-08 16:02:16

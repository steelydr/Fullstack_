CREATE DATABASE project;
USE project;
SET GLOBAL log_bin_trust_function_creators = 1;


DELIMITER //
CREATE FUNCTION age_calculator(d DATE) RETURNS INT
NOT DETERMINISTIC
CONTAINS SQL
BEGIN
    DECLARE age INT;
    SET age = TIMESTAMPDIFF(YEAR, CAST(CONCAT(d, ' 00:00:00') AS DATETIME), CURRENT_TIMESTAMP);
    RETURN age;
END //
DELIMITER ;

SELECT age_calculator('1990-05-15') AS calculated_age;

DELIMITER //
CREATE FUNCTION multiply(x INT, y INT)
RETURNS INT
BEGIN
    DECLARE result INT;
    SET result = x * y;
    RETURN result;
END //
DELIMITER ;


SELECT multiply(9, 7) AS result;


DELIMITER //
CREATE FUNCTION encoder(str VARCHAR(255)) RETURNS VARCHAR(255)
BEGIN
    DECLARE result VARCHAR(255) DEFAULT ''; 
    DECLARE c INT DEFAULT 1;
    DECLARE ch CHAR(1);
    WHILE c <= LENGTH(str) DO 
        SET ch = SUBSTRING(str, c, 1);
        IF ch IS NOT NULL THEN 
            IF ASCII(ch) BETWEEN 32 AND 127 THEN 
                SET result = CONCAT(result, CHAR(ASCII(ch) + 1));
            ELSE
                SET result = CONCAT(result, ch);
            END IF;
        END IF;
        SET c = c + 1;
    END WHILE;
    RETURN result;
END //
DELIMITER ;

SELECT encoder('Hello, World!') AS encoded_string;


DELIMITER //
CREATE FUNCTION decoder(str VARCHAR(255)) RETURNS VARCHAR(255)
BEGIN
    DECLARE result VARCHAR(255) DEFAULT ''; 
    DECLARE c INT DEFAULT 1;
    DECLARE ch CHAR(1);
    WHILE c <= LENGTH(str) DO 
        SET ch = SUBSTRING(str, c, 1);
        IF ch IS NOT NULL THEN 
            IF ASCII(ch) BETWEEN 33 AND 128 THEN 
                SET result = CONCAT(result, CHAR(ASCII(ch) - 1));
            ELSE
                SET result = CONCAT(result, ch);
            END IF;
        END IF;
        SET c = c + 1;
    END WHILE;
    RETURN result;
END //
DELIMITER ;

SELECT decoder('Ifmmp-Xpsme!') AS decoded_string;

CREATE TABLE user (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    udate DATE NOT NULL,
    uemail VARCHAR(50) NOT NULL,
    upassword VARCHAR(50) NOT NULL,
    uphoneno VARCHAR(30) NOT NULL,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')) NOT NULL,
    age INT
);


CREATE TABLE roles(
			 roleid INT PRIMARY KEY AUTO_INCREMENT, 
             rolename VARCHAR(25) NOT NULL);

CREATE TABLE admin(
				 adminid INT PRIMARY KEY AUTO_INCREMENT,
                 aname VARCHAR(25) NOT NULL,
                 aemail VARCHAR(50) NOT NULL,
                 ausername VARCHAR(50) NOT NULL UNIQUE,
                 apassword VARCHAR(50) NOT NULL,
                 aphoneno VARCHAR(30) NOT NULL,
                 roleid INT NOT NULL,
                 FOREIGN KEY(roleid) REFERENCES ROLES(roleid)
                 );

CREATE TABLE paymenttype(
			payment_type INT PRIMARY KEY AUTO_INCREMENT,
            type_name VARCHAR(50) NOT NULL);


CREATE TABLE venue(
                   venue_id INT PRIMARY KEY AUTO_INCREMENT,
                   venue_name VARCHAR(100) NOT NULL,
                   location  VARCHAR(100),
                   capacity INT,
                   contact_info VARCHAR(100));
                   

CREATE TABLE artists(
                artist_id INT PRIMARY KEY AUTO_INCREMENT,
                artist_name VARCHAR(50) NOT NULL,
                arating DECIMAL(10,4));
                

CREATE TABLE concerts(
                      concert_id INT PRIMARY KEY AUTO_INCREMENT,
                      artist_id INT,
                      venue_id INT,
                      concert_name VARCHAR(50),
                      concert_date DATE,
                      concert_time TIME,
                      FOREIGN KEY(artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE,
                      FOREIGN KEY(venue_id) REFERENCES venue(venue_id) ON DELETE CASCADE);
      
CREATE TABLE sports(
                   sports_id INT PRIMARY KEY AUTO_INCREMENT,
                   sports_name VARCHAR(30));


CREATE TABLE game(
                  game_id INT PRIMARY KEY AUTO_INCREMENT,
                  sports_id INT,
                  venue_id INT,
                  game_date DATE,
                  opponenta VARCHAR(50),
                  opponentb VARCHAR(50),
                  grating DECIMAL(10,4));
                  

CREATE TABLE age_restriction(
                           age_restriction_id INT PRIMARY KEY AUTO_INCREMENT,
                           age_restriction_name VARCHAR(30) NOT NULL);
                           

CREATE TABLE movies(
                  movie_id INT PRIMARY KEY AUTO_INCREMENT,
                  movie_name VARCHAR(100),
                  release_date DATE,
                  age_restriction_id INT,
                  venue_id INT,
                  genre VARCHAR(50),
                  director VARCHAR(50),
                  mcast VARCHAR(50),
                  mrating DECIMAL(10,4),
                  FOREIGN KEY(age_restriction_id) REFERENCES age_restriction(age_restriction_id)  ON DELETE CASCADE,
                  FOREIGN KEY(venue_id) REFERENCES venue(venue_id)  ON DELETE CASCADE
                  );

CREATE TABLE rating(
                    userid INT,
					artist_id INT,
                    movie_id INT,
                    game_id INT,
                    rating DECIMAL(10,4),
                    FOREIGN KEY(userid) REFERENCES user(userid)  ON DELETE CASCADE,
                    FOREIGN KEY(artist_id) REFERENCES artists(artist_id)  ON DELETE CASCADE,
                    FOREIGN KEY(movie_id) REFERENCES movies(movie_id)  ON DELETE CASCADE,
                    FOREIGN KEY(game_id) REFERENCES game(game_id)  ON DELETE CASCADE
                    );

CREATE TABLE bookingtype(
                        booking_type INT PRIMARY KEY AUTO_INCREMENT,
                        bookingname VARCHAR(25) NOT NULL);

CREATE TABLE  booking(
                      booking_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                      userid INT,
                      booking_type INT,
                      venue_id INT,
                      dateb DATE,
                      timeb TIME,
                      seat_no INT CHECK (seat_no <= 5),
					  booking_status VARCHAR(30) DEFAULT 'PENDING' CHECK (booking_status IN ('PENDING', 'SUCCESSFUL', 'REJECTED', 'CANCELLED')) NOT NULL,
                      amount INT NOT NULL,
                      FOREIGN KEY(userid) REFERENCES user(userid),
                      FOREIGN KEY(booking_type) REFERENCES bookingtype(booking_type)
                      );


CREATE TABLE payment(
                    payment_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    booking_id INT NOT NULL,
                    userid INT NOT NULL,
                    payment_date DATE NOT NULL,
                    payment_time TIME NOT NULL,
                    payment_type INT NOT NULL,
                    amount INT NOT NULL,
                    payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('ACCEPTED','DENIED')) NOT NULL,
                    FOREIGN KEY(userid) REFERENCES user(userid),
                    FOREIGN KEY(payment_type) REFERENCES paymenttype(payment_type) ,
                    FOREIGN KEY(booking_id) REFERENCES booking(booking_id)
                    );

CREATE TEMPORARY TABLE bank (
    pay_id INT,
    amnt VARCHAR(30),
    transactions VARCHAR(30)
);

                      
CREATE INDEX idx_user_id ON user(userid);
CREATE INDEX idx_user_username ON user(username);
CREATE INDEX idx_user_udate ON user(udate);


SHOW INDEXES FROM user;


CREATE INDEX idx_admin_ausername ON admin(ausername);


SHOW INDEXES FROM admin;


CREATE INDEX idx_concerts_artist_id ON concerts(artist_id);
CREATE INDEX idx_concerts_venue_id ON concerts(venue_id);
CREATE INDEX idx_concerts_concert_date ON concerts(concert_date);

SHOW INDEXES FROM concerts;

CREATE INDEX idx_game_sports_id ON game(sports_id);
CREATE INDEX idx_game_venue_id ON game(venue_id);
CREATE INDEX idx_game_game_date ON game(game_date);


SHOW INDEXES FROM game;


CREATE INDEX idx_movies_age_restriction_id ON movies(age_restriction_id);
CREATE INDEX idx_movies_venue_id ON movies(venue_id);

SHOW INDEXES FROM movies;

CREATE INDEX idx_rating_userid ON rating(userid);
CREATE INDEX idx_rating_artist_id ON rating(artist_id);
CREATE INDEX idx_rating_movie_id ON rating(movie_id);
CREATE INDEX idx_rating_game_id ON rating(game_id);


SHOW INDEXES FROM rating;


CREATE INDEX idx_booking_userid ON booking(userid);
CREATE INDEX idx_booking_booking_type ON booking(booking_type);
CREATE INDEX idx_booking_venue_id ON booking(venue_id);
CREATE INDEX idx_booking_dateb ON booking(dateb);


SHOW INDEXES FROM booking;

CREATE INDEX idx_payment_userid ON payment(userid);
CREATE INDEX idx_payment_payment_type ON payment(payment_type);
CREATE INDEX idx_payment_booking_id ON payment(booking_id);
CREATE INDEX idx_payment_payment_status ON payment(payment_status);


SHOW INDEXES FROM payment;

DELIMITER //
CREATE TRIGGER user_trigger
BEFORE INSERT ON user
FOR EACH ROW
BEGIN
    SET NEW.age = age_calculator(NEW.udate);
    SET NEW.upassword = encoder(NEW.upassword);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER admin_trigger
BEFORE INSERT ON admin
FOR EACH ROW
BEGIN
    SET NEW.apassword = encoder(NEW.apassword);
END //
DELIMITER ;
                  
DELIMITER //
CREATE TRIGGER concerts_conflict
BEFORE INSERT ON concerts
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM concerts
        WHERE (artist_id <> NEW.artist_id OR venue_id = NEW.venue_id)
        AND concert_date = NEW.concert_date
        AND concert_name <> NEW.concert_name
        AND NOT (NEW.concert_time >= concert_time + INTERVAL 3 HOUR OR NEW.concert_time + INTERVAL 3 HOUR <= concert_time)) > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot insert.Sorry No concerts with same time/date are to be added.';
    END IF;
END  //
DELIMITER ;

DELIMITER //
CREATE TRIGGER games_conflict
BEFORE INSERT ON game
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM game
        WHERE sports_id = NEW.sports_id
        AND venue_id = NEW.venue_id
        AND game_date = NEW.game_date) > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot insert. There is a conflict between games added';
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER user_rating
BEFORE INSERT ON rating 
FOR EACH ROW 
BEGIN
     DECLARE a INT;
     DECLARE m INT;
     DECLARE g INT;
	 SELECT COUNT(*) INTO a FROM artists;
	 SELECT COUNT(*) INTO m FROM movies;
     SELECT COUNT(*) INTO g FROM game;
     IF (NEW.artist_id > a) OR (NEW.movie_id > m) OR (NEW.game_id > g)
     THEN 
       SIGNAL SQLSTATE '45000'
	   SET MESSAGE_TEXT = 'You are trying to insert wrong Movie ID/Game ID/Artist ID';
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE movierating(IN movie_id_param INT, IN user_id_param INT)
BEGIN
    DECLARE total_rating DECIMAL(5, 2);
    DECLARE total_count INT;
    DECLARE average_rating DECIMAL(5, 2);
    SELECT SUM(rating), COUNT(*)
    INTO total_rating, total_count
    FROM rating
    WHERE movie_id = movie_id_param;
    IF total_count > 0 THEN
        SET average_rating = total_rating / total_count;
        UPDATE movies
        SET mrating = average_rating
        WHERE movie_id = movie_id_param;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER movies_rating
AFTER INSERT ON rating
FOR EACH ROW
BEGIN
    CALL movierating(NEW.movie_id, NEW.userid);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER moviesr_update 
AFTER UPDATE ON rating
FOR EACH ROW
BEGIN
    IF (NEW.movie_id = OLD.movie_id) AND (NEW.userid = OLD.userid) THEN
        CALL movierating(NEW.movie_id, NEW.userid);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE gamerating(IN game_id_param INT, IN user_id_param INT)
BEGIN
    DECLARE total_rating DECIMAL(5, 2);
    DECLARE total_count INT;
    DECLARE average_rating DECIMAL(5, 2);
    SELECT SUM(rating), COUNT(*)
    INTO total_rating, total_count
    FROM rating
    WHERE game_id = game_id_param;
    IF total_count > 0 THEN
        SET average_rating = total_rating / total_count;
        UPDATE game
        SET grating = average_rating
        WHERE game_id = game_id_param;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER games_rating
AFTER INSERT ON rating
FOR EACH ROW
BEGIN
    CALL gamerating(NEW.game_id, NEW.userid);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER gamer_update 
AFTER UPDATE ON rating
FOR EACH ROW
BEGIN
    IF (NEW.game_id = OLD.game_id) AND (NEW.userid = OLD.userid) THEN
        CALL gamerating(NEW.game_id, NEW.userid);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE artistrating(IN artist_id_param INT, IN user_id_param INT)
BEGIN
    DECLARE total_rating DECIMAL(5, 2);
    DECLARE total_count INT;
    DECLARE average_rating DECIMAL(5, 2);

    SELECT SUM(rating), COUNT(*)
    INTO total_rating, total_count
    FROM rating
    WHERE artist_id = artist_id_param;

    IF total_count > 0 THEN
        SET average_rating = total_rating / total_count;
        UPDATE artists
        SET arating = average_rating
        WHERE artist_id = artist_id_param;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER artists_rating
AFTER INSERT ON rating
FOR EACH ROW
BEGIN
    CALL artistrating(NEW.artist_id, NEW.userid);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER artistr_update 
AFTER UPDATE ON rating
FOR EACH ROW
BEGIN
    IF (NEW.artist_id = OLD.artist_id) AND (NEW.userid = OLD.userid) THEN
        CALL artistrating(NEW.artist_id, NEW.userid);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE before_inserting_booking(IN btype_param INT, IN vid_param INT)
BEGIN
    DECLARE texists BOOLEAN;
    IF btype_param = 1 THEN 
        SELECT EXISTS (SELECT 1 FROM movies WHERE venue_id = vid_param) INTO texists;
        IF NOT texists THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Venue ID does not exist in movies table';
        END IF;
    END IF;
    IF btype_param = 2 THEN 
        SELECT EXISTS (SELECT 1 FROM game WHERE venue_id = vid_param) INTO texists;
        IF NOT texists THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Venue ID does not exist in games table';
        END IF;
    END IF;
    IF btype_param = 3 THEN 
        SELECT EXISTS (SELECT 1 FROM concerts WHERE venue_id = vid_param) INTO texists;
        IF NOT texists THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Venue ID does not exist in concerts table';
        END IF;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER bookingt
BEFORE INSERT ON booking
FOR EACH ROW
BEGIN
    DECLARE totalcap INT;
    DECLARE tseats INT;
    DECLARE res INT;
     IF NEW.booking_type = 1 THEN
        SET NEW.amount = NEW.seat_no * 2000;
    ELSEIF NEW.booking_type = 2 THEN
        SET NEW.amount = NEW.seat_no * 1500;
    ELSEIF NEW.booking_type = 3 THEN
        SET NEW.amount = NEW.seat_no * 1000;
    END IF;
    IF NEW.dateb = NEW.dateb AND NEW.timeb = NEW.timeb AND NEW.venue_id = NEW.venue_id THEN
        SELECT capacity INTO totalcap FROM venue WHERE venue_id = NEW.venue_id;
        SELECT IFNULL(SUM(seat_no), 0) INTO tseats FROM booking WHERE venue_id = NEW.venue_id;
        SET res = totalcap - tseats;
        IF res < NEW.seat_no THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Not enough seats available. Cannot allot more seats.';
        END IF;
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER paymentbi
BEFORE INSERT ON payment
FOR EACH ROW 
BEGIN
    DECLARE a INT;
    DECLARE u INT;
    SELECT userid, amount INTO u, a FROM booking WHERE booking_id = NEW.booking_id;
    SET NEW.userid = u;
    SET NEW.amount = a;
    SET NEW.payment_date = IFNULL(NEW.payment_date, CURDATE());
    SET NEW.payment_time = IFNULL(NEW.payment_time, CURTIME());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER paymentai
AFTER INSERT ON PAYMENT 
FOR EACH ROW 
BEGIN
    DECLARE am INT;
    DECLARE str VARCHAR(255); 
    DECLARE pid INT;
    
	IF NEW.payment_status = 'ACCEPTED' THEN 
        UPDATE booking SET booking_status = 'SUCCESSFUL' WHERE booking_id = NEW.booking_id;
        SELECT payment_id, amount INTO pid, am FROM payment WHERE booking_id = NEW.booking_id LIMIT 1;
        SET str = CONCAT('+', CAST(am AS CHAR)); 
        INSERT INTO bank(pay_id, amnt,transactions) VALUES (pid,str, 'DEPOSIT'); 
    ELSEIF NEW.payment_status = 'DENIED' THEN
        UPDATE booking SET booking_status = 'REJECTED' WHERE booking_id = NEW.booking_id;
    END IF;
END //


INSERT INTO user (uname, username, udate, uemail, upassword, uphoneno, gender)
VALUES
	('Vivek Yadav', 'vivek_yadav', '2004-05-20', 'vivek.yadav@gmail.com', 'S3cureIndia26', '+191734567812', 'Male'),
    ('Nisha Sharma', 'nisha_sharma', '2005-11-18', 'nisha.sharma@hotmail.com', 'P@ssw0rdIndia27', '+191734567813', 'Female'),
    ('Deepika Singh', 'deepika_singh', '1989-11-18', 'deepika.singh@yahoo.com', 'P@ssIndia4', '+911234567893', 'Female'),
    ('Amit Patel', 'amit_patel', '1985-07-30', 'amit.patel@gmail.com', 'S3cureIndia5', '+911234567894', 'Male'),
    ('Pooja Gupta', 'pooja_gupta', '1984-03-12', 'pooja.gupta@hotmail.com', 'P@ssw0rdIndia6', '+911234567895', 'Female'),
    ('Rahul Sharma', 'rahul_sharma', '1986-08-22', 'rahul.sharma@yahoo.com', 'P@ssIndia7', '+191734567890', 'Male'),
    ('Sneha Yadav', 'sneha_yadav', '1988-02-28', 'sneha.yadav@gmail.com', 'S3cureIndia8', '+191734567891', 'Female'),
    ('Arun Kumar', 'arun_kumar', '1981-01-28', 'arun.kumar@hotmail.com', 'P@ssw0rdIndia12', '+191734567895', 'Other'),
    ('Aryan Gupta', 'aryan_gupta', '1999-12-09', 'aryan.gupta@yahoo.com', 'P@ssIndia34', '+191734567820', 'Male'),
    ('Meera Shah', 'meera_shah', '1980-03-17', 'meera.shah@yahoo.com', 'P@ssIndia31', '+911234567896', 'Female'),
    ('Akanksha Singh', 'akanksha_singh', '1990-02-20', 'akanksha.singh@yahoo.com', 'P@ssIndia16', '+191734567896', 'Female'),
    ('Alok Yadav', 'alok_yadav', '1991-07-15', 'alok.yadav@gmail.com', 'S3cureIndia17', '+191734567897', 'Male'),
    ('Sarika Sharma', 'sarika_sharma', '1983-11-18', 'sarika.sharma@hotmail.com', 'P@ssw0rdIndia18', '+191734567898', 'Female'),
    ('Kunal Patel', 'kunal_patel', '1992-04-05', 'kunal.patel@yahoo.com', 'P@ssIndia19', '+191734567899', 'Male'),
    ('Tanvi Gupta', 'tanvi_gupta', '1990-08-30', 'tanvi.gupta@gmail.com', 'S3cureIndia20', '+191734567810', 'Female'),
    ('Priya Sharma', 'priya_sharma', '1999-05-08', 'priya.sharma@hotmail.com', 'P@ssw0rdIndia21', '+911234567811', 'Female'),
    ('Sanya Gupta', 'sanya_gupta', '2003-01-05', 'sanya.gupta@yahoo.com', 'P@ssIndia25', '+191734567811', 'Female'),
    ('Rohan Patel', 'rohan_patel', '2006-03-12', 'rohan.patel@yahoo.com', 'P@ssIndia28', '+191734567814', 'Male'),
    ('Shreya Yadav', 'shreya_yadav', '2003-02-20', 'shreya.yadav@gmail.com', 'S3cureIndia35', '+191734567821', 'Female');

INSERT INTO roles(rolename) VALUES('Movie Manager'),('Game Manager'),('Concert Manager'),('Artist Manager'),('Venue Manager');

INSERT INTO admin (aname, aemail, ausername, apassword, aphoneno, roleid) VALUES
('Amit Singh', 'amit.singh@starflix.com', 'amitS123', 'password123', '+919876543210', 2),
('Priya Kapoor', 'priya.kapoor@bollygames.com', 'priyaKapoor99', 'pvcxwyyuou56', '+918765432198', 1),
('Rahul Sharma', 'rahul.sharma@concertomania.com', 'rockstarrahul', 'password789', '+917654321098', 3),
('Rani Mukherjee', 'rani.mukherjee@artistgalaxy.com', 'dancingrani', 'password012', '+916543210987', 1),
('Vikram Kumar', 'vikram.kumar@venueville.com', 'vikramVK', 'password345', '+919876543201', 4),
('Saira Khan', 'saira.khan@starflix.com', 'sairaKhantastic', 'ggdsryjdonipo', '+918765432190', 1),
('Rohit Patel', 'rohit.patel@bollygames.com', 'rohitPgames', 'propdetre45va', '+917654321089', 3),
('Aisha Kapoor', 'aisha.kapoor@concertomania.com', 'aishak999', 'pass123gg', '+916543210876', 3),
('Arjun Kapoor', 'arjun.kapoor@artistgalaxy.com', 'arjunkacting', 'opsyuoord567', '+919876543012', 2),
('Kareena Kapoor', 'kareena.kapoor@venueville.com', 'kareenakapoor00', 'password123', '+918765430198', 5),
('Sunil Dutt', 'sunil.dutt@starflix.com', 'sunilDlegendary', 'pcarfrockbs4', '+917654012321', 1),
('Nutan Nalwade', 'nutan.nalwade@bollygames.com', 'nutannutann', 'password567dsa', '+916540123201', 5),
('Dilip Kumar', 'dilip.kumar@concertomania.com', 'dilipkumar23', 'ilo90opjbz', '+919870123210', 3),
('Madhubala', 'madhubala@artistgalaxy.com', 'madhubalafan', 'helloworld', '+918760123298', 2),
('Dev Anand', 'dev.anand@venueville.com', 'devthegreat', 'p6fyjsad345', '+917650123209', 5); 


INSERT INTO bookingtype(bookingname) VALUES ('Movie'),('Sports'),('Concerts');

                 
INSERT INTO venue(venue_name,location,capacity,contact_info)
                 VALUES('M. A. Chidambaram Stadium','Chennai',38,'xyz@chidambaram.com'),/*1crick*/
                       ('Babu Banarasi Das Indoor Stadium','Lucknow',9,'xyz@babubanarasi.com'),/*2badm*/
                       ('Bangalore Hockey Stadium','Bangalore',17,'xyz@bangalorestadium.com'),/*hock3*/
                       ('INOX R-City','Mumbai',14,'xyz@inox.com'),/*MOVIE4*/
                       ('INOX Mantri Square','Bangalore',14,'xyz@inox.com'),/*5MOVIE*/
                       ('PVR Ambience Mall','Gurgaon',14,'xyz@pvr.com'),/*MOVIE6*/
                       ('Eden Gardens','Kolata',68,'xyz@edengardens.com'),/*crick,basketball7*/
                       ('INOX Quest Mall','Kolkata',14,'xyz@inox.com'),/*MOVIE8*/
                       ('Indira Gandhi Arena','New Delhi',14,'xyz@indiragandhi.com'),/*badm9*/
                       ('PVR Phoenix Market City','Mumbai',14,'xyz@pvr.com'),/*10MOVIE*/
                       ('Sardar Vallabhbhai Patel International Hockey Stadium','Raipur',40,'xyz@sardarpatelstadium.com'),/*11hock*/
                       ('Arun Jaitley Stadium','Delhi',35,'xyz@arunjaitleystadium.com'),/*12crick*/
                       ('Netaji Indoor Stadium','Kolkata',12,'xyz@netajiindoor.com'),/*badm13*/
                       ('Brabourne Stadium','Mumbai',20,'xyz@brabournestadium.com'),/*14crick*/
                       ('PVR Forum Mall','Bangalore',14,'xyz@pvr.com'),/*15MOVIE*/
                       ('Birsa Munda International Hockey Stadium','Rourkela',21,'xyz@bisramundastadium.com'),/*16hock*/
                       ('PVR Inorbit Mall','Hyderabad',14,'xyz@pvr.com'),/*17MOVIE*/
                       ('Rajiv Gandhi Stadium','Hyderabad',37,'xyz@rajivgandhistadium.com'),/*18crick*/
                       ('INOX Nehru Place','Delhi',14,'xyz@inox.com'),/*MOVIE19*/
                       ('M. Chinnaswamy Stadium','Bangalore',32,'xyz@chinnaswamystadium.com'),/*20crick*/
                       ('Thyagaraj Sports Complex','New Delhi',10,'xyz@thagarajsports.com'),/*21badm,basket*/
                       ('Wankhede Stadium','Mumbai',33,'xyz@wankhedestadium.com')/*crick22*/;
                       
    
INSERT INTO artists(artist_name) VALUES('Shreya Goshal'),('Geetha Madhuri'),('Hemachandra'),('Sunidhi Chauhan'),('Sonu Nigam'),
                                        ('Udit Narayan'),('Armaan Malik'),('Kailash Kher'),('A.R.Rahman'),('Kishore Kumar'),
                                        ('Adnan Sami'),('Jonita Gandhi'),('Anirudh Ravichander'),('Asha Bhosle'),('Arijith Singh');
                                        

INSERT INTO concerts(artist_id, venue_id, concert_name, concert_date, concert_time) 
VALUES 
    (1, 1, 'Mystical Melodies', '2024-03-15', '19:00:00'),   -- Shreya Goshal
    (14, 14, 'Bhosles Bliss', '2025-03-25', '20:15:00'), -- Asha Bhosle
	(7, 7, 'Magical Moments', '2024-09-25', '19:15:00'),   -- Armaan Malik
    (12, 12, 'Leo Classics', '2025-02-3', '19:00:00'),  -- Jonita Gandhi
    (5, 12, 'Soulful Serenade', '2024-07-12', '21:00:00'),   -- Sonu Nigam
    (3, 1, 'Harmony in the Hills', '2024-05-20', '20:00:00'), -- Hemachandra
    (11, 1, 'Samis Symphony', '2025-01-08', '20:30:00'),  -- Adnan Sami
    (4, 20, 'Sunshine Symphony', '2024-06-05', '19:30:00'),   -- Sunidhi Chauhan
    (13, 12, 'Leo Classics', '2025-02-3', '19:00:00'),  -- Anirudh Ravichander
    (9, 7, 'Rahman Rhapsody', '2024-11-15', '20:15:00'),   -- A.R.Rahman
    (10, 18, 'Kumars Classics', '2024-12-05', '19:45:00'), -- Kishore Kumar
    (1, 7, 'Sunidhi & Shreya Classics', '2024-04-18', '20:30:00'),   -- Shreya Goshal
    (2, 2, 'Enchanting Evening', '2024-04-10', '18:30:00'),  -- Geetha Madhuri
    (12, 12, 'Gandhis Melody', '2025-02-14', '18:30:00'),  -- Jonita Gandhi
    (4, 7, 'Sunidhi & Shreya Classics', '2024-04-18', '20:30:00'),   -- Sunidhi Chauhan
    (6,22, 'Melodious Night', '2024-08-18', '20:30:00'),   -- Udit Narayan
    (13, 12, 'Ravichanders Rhythm', '2025-03-20', '19:00:00'),  -- Anirudh Ravichander
	(8, 18, 'Divine Harmony', '2024-10-30', '18:45:00'),   -- Kailash Kher
    (15, 1, 'Singhs Symphony', '2025-05-10', '19:45:00');   -- Arijith Singh
    

INSERT INTO sports (sports_name) 
VALUES 
    ('Cricket'),('Football'),('Tennis'),('Badminton'),('Basketball'),
    ('Hockey'),('Volleyball'),('Table Tennis');
    
    

INSERT INTO game (sports_id, venue_id, game_date, opponenta, opponentb) 
VALUES 
    (1, 7, '2024-03-15', 'India', 'Australia'), -- 1,7,12,18,20,22 cricket(1)
    (3, 2, '2024-04-10', 'Brazil', 'Germany'), -- 2,13 badminton,tennis,table-tennis(3,4,7,8)
    (4, 13, '2024-05-20', 'France', 'Spain'),
    (6, 11, '2024-06-05', 'Japan', 'China'), -- 3,11,16 hockey(6)
    (5, 13, '2024-07-12', 'USA', 'Canada'),
    (1, 12, '2024-08-18', 'England', 'South Africa'),
    (1, 18, '2024-09-25', 'Australia', 'New Zealand'),
    (1, 1, '2024-10-30', 'India', 'Pakistan'),
    (5, 20, '2024-11-15', 'Argentina', 'Italy'), -- 7,20 basketball(5)
    (2, 12, '2024-12-05', 'Sweden', 'Russia'),
    (7, 13, '2025-01-08', 'Spain', 'Portugal'),
    (5, 20, '2025-02-14', 'Netherlands', 'Belgium'),
    (6, 16, '2024-06-05', 'India', 'China'),
    (8, 2, '2025-03-20', 'South Korea', 'North Korea'),
    (1, 22, '2025-04-25', 'India', 'Sri Lanka'),
    (1, 12, '2025-05-10', 'Australia', 'West Indies');


INSERT INTO paymenttype(type_name) VALUES('UPI'),('Credit Card'),('Debit Card'),('NetBanking');


INSERT INTO age_restriction(age_restriction_name) VALUES('U'),('U/A 12<'),('U/A 7+'),('U/A 13+'),('U/A 16+'),('A');    


INSERT INTO movies (movie_name, release_date, age_restriction_id, venue_id, genre, director, mcast) 
VALUES 
    ('Sarkaru Vaari Paata', '2022-01-11', 2, 4, 'Action-Drama', 'Parasuram', 'Mahesh Babu, Keerthy Suresh'),
    ('F3: Fun and Frustration', '2022-02-10', 1, 5, 'Comedy-Drama', 'Anil Ravipudi', 'Venkatesh, Varun Tej'),
    ('Shyam Singha Roy', '2022-03-24', 2, 6, 'Fantasy-Drama', 'Rahul Sankrityan', 'Nani, Sai Pallavi'),
    ('Ghani', '2022-04-15', 3, 8, 'Sports-Drama', 'Kirankumar', 'Varun Tej, Saiee Manjrekar'),
    ('KGF: Chapter 2 (Telugu)', '2022-04-14', 4, 10, 'Action-Thriller', 'Prashanth Neel', 'Yash, Sanjay Dutt'),
    ('Radhe Shyam', '2022-03-11', 1, 15, 'Romantic-Drama', 'Radha Krishna Kumar', 'Prabhas, Pooja Hegde'),
    ('Pushpa: The Rise', '2021-12-17', 3, 17, 'Action-Thriller', 'Sukumar', 'Allu Arjun, Rashmika Mandanna'),
    ('RRR', '2022-03-24', 2, 19, 'Action-Drama', 'S. S. Rajamouli', 'N. T. Rama Rao Jr., Ram Charan'),
    ('Acharya', '2022-05-13', 2, 4, 'Action-Drama', 'Koratala Siva', 'Chiranjeevi, Kajal Aggarwal'),
    ('Love Story', '2021-09-24', 1, 5, 'Romantic-Drama', 'Sekhar Kammula', 'Naga Chaitanya, Sai Pallavi'),
    ('Beast', '2022-04-14', 3, 6, 'Action-Thriller', 'Nelson Dilipkumar', 'Vijay, Pooja Hegde'),
    ('Akhanda', '2021-12-02', 3, 8, 'Action-Drama', 'Boyapati Srinu', 'Nandamuri Balakrishna, Pragya Jaiswal'),
    ('Bheemla Nayak', '2022-02-25', 2, 10, 'Action-Drama', 'Saagar K Chandra', 'Pawan Kalyan, Rana Daggubati'),
    ('Major', '2022-02-11', 3, 15, 'Biography', 'Sashi Kiran Tikka', 'Adivi Sesh, Saiee Manjrekar'),
    ('Jersey', '2022-04-15', 1, 17, 'Sports-Drama', 'Gowtam Tinnanuri', 'Nani, Shraddha Srinath'),
    ('Pelli SandaD', '2022-01-14', 2, 19, 'Romantic-Drama', 'Kapil Verma', 'Roshann, Sreeleela'),
    ('Bhola Shankar', '2022-06-03', 3, 4, 'Action-Comedy', 'Meher Ramesh', 'Chiranjeevi,Keerthy Suresh'),
    ('Nallamala', '2022-08-12', 1, 5, 'Suspense Thriller', 'D Suresh Babu', 'Srikanth, Varalaxmi Sarathkumar'),
    ('Thaggedhe Le', '2022-10-20', 2, 6, 'Comedy-Drama', 'Venkat Prabhu', 'Nithiin, Tamannaah'),
    ('Uppena', '2022-02-12', 3, 8, 'Romantic-Drama', 'Buchi Babu Sana', 'Panja Vaisshnav Tej, Krithi Shetty'),
    ('Hari Hara Veera Mallu', '2022-11-25', 2, 4, 'Historical-Drama', 'Gunasekhar', 'Pawan Kalyan, Jacqueline Fernandez'),
    ('Aaviri', '2023-03-21', 3, 15, 'Horror-Thriller', 'Ravi Babu', 'Aadi Saikumar, Vaibhavi Shandilya');

INSERT INTO rating(userid, movie_id, artist_id, game_id, rating)
VALUES
  (1, 3, 8, 1, 8), (1, 10, 12, 2, 7), (1, 14, 3, 3, 9),
  (2, 5, 5, 4, 6), (2, 12, 14, 5, 8), (2, 17, 1, 6, 5),
  (3, 10, 9, 7, 9), (3, 18, 2, 8, 6), (3, 19, 11, 9, 7),
  (4, 2, 7, 10, 8), (4, 7, 3, 11, 6), (4, 16, 10, 12, 9),
  (5, 14, 6, 13, 7), (5, 19, 4, 14, 8), (5, 4, 8, 15, 5),
  (6, 11, 1, 16, 6), (6, 15, 9, 1, 9), (6, 16, 5, 2, 7),
  (7, 8, 2, 3, 5), (7, 17, 13, 4, 7), (7, 3, 6, 5, 8),
  (8, 6, 10, 6, 8), (8, 13, 4, 7, 5), (8, 18, 7, 8, 6),
  (9, 9, 14, 9, 6), (9, 14, 8, 10, 9), (9, 17, 12, 11, 7),
  (10, 3, 1, 12, 8), (10, 8, 3, 13, 9), (10, 15, 11, 14, 6),
  (11, 7, 9, 15, 6), (11, 14, 5, 16, 7), (11, 19, 2, 1, 8),
  (1, 1, 15, 1, 1), (1, 9, 15, 9, 9),
  (12, 1, 5, 8, 8), (12, 5, 1, 7, 7);
  

INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (7, 3, 12, '2024-07-12', '21:00:00', 5);
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (9, 1, 4, '2022-06-03', 3); -- Books BHola Shankar movie
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (4,2, 11, '2024-06-05', 3);-- Books game with Japan Vs China
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (12, 3, 12, '2024-07-12', '21:00:00', 5);
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (6, 3, 12, '2025-02-03', '19:00:00', 5); -- Books Leo Classics Concert
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (17, 2, 1, '2024-10-30', 2);-- Books game with India VS Pak
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (3, 2, 1, '2024-10-30', 4);-- Books game with India VS Pak
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES  (8, 3, 12, '2024-07-12', '21:00:00', 5);
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (13, 1, 4, '2022-06-03', 1);-- Books BHola Shankar movie
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (15,2, 18, '2024-09-25', 3);-- Books game with Australia vs New Zealand
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (6, 1, 19, '2022-03-24', 1);-- Books RRR movie
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (16, 3, 12, '2025-02-03', '19:00:00', 5); -- Books Leo Classics Concert
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (9,2, 11, '2024-06-05', 3);-- Books game with Japan Vs China
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (1, 3, 12, '2025-02-03', '19:00:00', 5); -- Books Leo Classics Concert
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (3, 3, 12, '2024-07-12', '21:00:00', 5);
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (11, 3, 12, '2025-02-03', '19:00:00', 3); -- Books Leo Classics Concert
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES  (16, 3, 12, '2024-07-12', '21:00:00', 5);
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (11, 3, 1, '2024-03-15', '19:00:00', 3); -- Books Mystical Melodies
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (14,2, 13, '2024-05-20', 3);-- Books game with France Vs Spain
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (1, 3, 7, '2024-04-18', '20:00:00', 3); -- Shreya Goshal 
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (13, 3, 18, '2024-12-05', '19:45:00', 3); -- Kumar Classics
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (6, 1, 19, '2022-03-24', 1);-- Books RRR movie
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (8,1, 10, '2022-02-25',4); -- Books Bheemla Nayak
INSERT INTO booking(userid,booking_type,venue_id,dateb,seat_no) VALUES (6,2, 1, '2024-10-30', 1);-- Books game with India VS Pak
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (7, 3, 12, '2024-07-12', '21:00:00', 5);
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (9, 3, 12, '2024-07-12', '21:00:00', 4);
INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES (15, 3, 12, '2024-07-12', '21:00:00', 5);


INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (1, 1, '2024-01-01', '12:30:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (1, 1, '2024-01-02', '14:45:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (1, 3, '2024-01-03', '10:15:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (2, 1, '2024-01-04', '08:00:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (3, 2, '2024-01-05', '16:30:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (3, 3, '2024-01-06', '13:20:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (4, 2, '2024-01-07', '11:45:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (5, 3, '2024-01-08', '09:30:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (6, 3, '2024-01-09', '15:00:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (7, 4, '2024-01-10', '12:00:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (8, 4, '2024-01-11', '10:45:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (9, 1, '2024-01-12', '17:15:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (10, 1, '2024-01-13', '14:00:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (11, 2, '2024-01-14', '08:30:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (12, 2, '2024-01-15', '11:00:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (13, 3, '2024-01-16', '13:45:00', 'DENIED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (3, 1, '2024-01-17', '16:20:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (13, 1, '2024-01-18', '10:00:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (7, 1, '2024-01-19', '14:30:00', 'ACCEPTED');
INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES (15, 4, '2024-01-20', '12:45:00', 'DENIED');


SELECT * FROM bank;



DELIMITER //
CREATE PROCEDURE cancel_booking(IN booking_id_param INT)
BEGIN
    DECLARE pid INT;
    DECLARE a INT;
    DECLARE str VARCHAR(20);
    UPDATE booking SET booking_status = 'CANCELLED', seat_no = 0 ,amount = 0 WHERE booking_id = booking_id_param;
    SELECT payment_id, amount INTO pid, a FROM payment WHERE booking_id = booking_id_param AND payment_status = 'ACCEPTED';
    IF pid IS NOT NULL THEN
        SET str = CONCAT('-', CAST(a AS CHAR));
        INSERT INTO bank(pay_id, amnt, transactions) VALUES (pid, str, 'WITHDRAW');
    END IF;
END //
DELIMITER ;

CALL cancel_booking(4); 



DESCRIBE user;
DESCRIBE roles;
DESCRIBE admin;
DESCRIBE login;
DESCRIBE bookingtype;
DESCRIBE paymenttype;
DESCRIBE venue;
DESCRIBE artists;
DESCRIBE concerts;
DESCRIBE sports;
DESCRIBE game;
DESCRIBE age_restriction;
DESCRIBE movies;
DESCRIBE rating;
DESCRIBE booking;
DESCRIBE payment;
                
CREATE TABLE login AS 
SELECT u.username AS USERNAMES ,u.upassword  AS PASSWORDS FROM user u 
UNION 
SELECT a.ausername,a.apassword FROM admin a;

SELECT * FROM user;

SELECT * FROM roles;

SELECT * FROM admin;

SELECT * FROM login;

SELECT * FROM bookingtype;

SELECT * FROM paymenttype;

SELECT * FROM venue;

SELECT * FROM artists;

SELECT * FROM concerts;

SELECT * FROM sports;

SELECT * FROM game;

SELECT * FROM age_restriction;

SELECT * FROM movies;

SELECT * FROM rating;

SELECT * FROM booking;

SELECT * FROM payment;


CREATE VIEW vmovie_mgr AS SELECT a.ausername AS MovieManagers FROM admin a  WHERE a.roleid=1;

SELECT * FROM vmovie_mgr;


CREATE VIEW game_mgr AS SELECT a.ausername AS GameManagers FROM admin a  WHERE a.roleid=2;

SELECT * FROM game_mgr;

CREATE VIEW concert_mgr AS SELECT a.ausername AS ConcertManagers FROM admin a  WHERE a.roleid=3;

SELECT * FROM concert_mgr;


CREATE VIEW artist_mgr AS SELECT a.ausername AS ArtisttManagers FROM admin a  WHERE a.roleid=4;

SELECT * FROM artist_mgr;

CREATE VIEW venue_mgr AS SELECT a.ausername AS VenueManagers FROM admin a  WHERE a.roleid=5;

SELECT * FROM venue_mgr;

CREATE VIEW decoded_password AS SELECT u.userid,decoder(u.upassword) AS decoded_password FROM user u;

SELECT * FROM decoded_password;

DROP FUNCTION IF EXISTS age_calculator;
DROP FUNCTION IF EXISTS multiply;
DROP FUNCTION IF EXISTS encoder;
DROP FUNCTION IF EXISTS decoder;

DROP TRIGGER IF EXISTS user_rating;
DROP TRIGGER IF EXISTS movies_rating;
DROP TRIGGER IF EXISTS moviesr_update;
DROP TRIGGER IF EXISTS games_rating;
DROP TRIGGER IF EXISTS gamer_update;
DROP TRIGGER IF EXISTS artists_rating;
DROP TRIGGER IF EXISTS artistr_update;
DROP TRIGGER IF EXISTS bookingt;
DROP TRIGGER IF EXISTS paymentbi;
DROP TRIGGER IF EXISTS paymentai;

DROP PROCEDURE IF EXISTS movierating;
DROP PROCEDURE IF EXISTS gamerating;
DROP PROCEDURE IF EXISTS artistrating;
DROP PROCEDURE IF EXISTS before_inserting_booking;
DROP PROCEDURE IF EXISTS cancel_booking;

DROP VIEW IF EXISTS vmovie_mgr;
DROP VIEW IF EXISTS game_mgr;
DROP VIEW IF EXISTS concert_mgr;
DROP VIEW IF EXISTS artist_mgr;
DROP VIEW IF EXISTS venue_mgr;


DROP INDEX idx_user_id ON user;
DROP INDEX idx_user_username ON user;
DROP INDEX idx_user_udate ON user;

DROP INDEX idx_admin_ausername ON admin;

DROP INDEX idx_concerts_artist_id ON concerts;
DROP INDEX idx_concerts_venue_id ON concerts;
DROP INDEX idx_concerts_concert_date ON concerts;

DROP INDEX idx_game_sports_id ON game;
DROP INDEX idx_game_venue_id ON game;
DROP INDEX idx_game_game_date ON game;

DROP INDEX idx_movies_age_restriction_id ON movies;
DROP INDEX idx_movies_venue_id ON movies;

DROP INDEX idx_rating_userid ON rating;
DROP INDEX idx_rating_artist_id ON rating;
DROP INDEX idx_rating_movie_id ON rating;
DROP INDEX idx_rating_game_id ON rating;

DROP INDEX idx_booking_userid ON booking;
DROP INDEX idx_booking_booking_type ON booking;
DROP INDEX idx_booking_venue_id ON booking;
DROP INDEX idx_booking_dateb ON booking;

DROP INDEX idx_payment_userid ON payment;
DROP INDEX idx_payment_payment_type ON payment;
DROP INDEX idx_payment_booking_id ON payment;
DROP INDEX idx_payment_payment_status ON payment;


DROP TABLE IF EXISTS bank;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS rating;
DROP TABLE IF EXISTS paymenttype;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS age_restriction;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS sports;
DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS bookingtype;

-- Query to retrieve concert details (name, date) along with the venue name where Shreya Goshal is performing.
SELECT c.concert_name, c.concert_date, v.venue_name
FROM concerts c
INNER JOIN artists a ON c.artist_id = a.artist_id
INNER JOIN venue v ON c.venue_id = v.venue_id
WHERE a.artist_name = 'Shreya Goshal';

-- Query to get the top 5 movies ordered by their ratings.
SELECT m.movie_name, m.mrating
FROM movies m
ORDER BY m.mrating DESC
LIMIT 5;

-- Query to fetch upcoming game details along with the sports name and opponent teams.
SELECT g.game_date, s.sports_name, g.opponenta, g.opponentb
FROM game g
INNER JOIN sports s ON g.sports_id = s.sports_id
WHERE g.game_date >= CURDATE();

-- Query to retrieve ratings along with associated user, artist, movie, and game details.
SELECT rating.*, user.uname, artists.artist_name, movies.movie_name, game.opponenta
FROM rating
LEFT JOIN user ON rating.userid = user.userid
LEFT JOIN artists ON rating.artist_id = artists.artist_id
LEFT JOIN movies ON rating.movie_id = movies.movie_id
LEFT JOIN game ON rating.game_id = game.game_id;

-- Query to fetch movie details along with associated age restriction and venue information.
SELECT movie_name, age_restriction.age_restriction_name, venue.venue_name
FROM movies
JOIN age_restriction ON movies.age_restriction_id = age_restriction.age_restriction_id
JOIN venue ON movies.venue_id = venue.venue_id;

-- Query to calculate the running total of payments over time.
SELECT payment_id, payment_date, amount, SUM(amount) OVER (ORDER BY payment_date) AS running_total FROM payment;

-- Query to count the number of users based on gender.
SELECT gender, COUNT(userid) AS user_count
FROM user
GROUP BY gender;

-- Query to count the number of concerts per venue.
SELECT venue_name, COUNT(concert_id) AS concert_count
FROM venue
JOIN concerts ON venue.venue_id = concerts.venue_id
GROUP BY venue_name;

-- Query to count the number of games per sport.
SELECT sports_name, COUNT(game_id) AS game_count
FROM sports
JOIN game ON sports.sports_id = game.sports_id
GROUP BY sports_name;

-- Query to calculate total revenue per payment type.
SELECT type_name, SUM(amount) AS total_revenue
FROM paymenttype
JOIN payment ON paymenttype.payment_type = payment.payment_type 
GROUP BY type_name;

-- Query to categorize users by gender and age group.
SELECT gender, 
       CASE
         WHEN age BETWEEN 0 AND 18 THEN '0-18'
         WHEN age BETWEEN 19 AND 35 THEN '19-35'
         WHEN age BETWEEN 36 AND 50 THEN '36-50'
         ELSE '51+'
       END AS age_group,
       COUNT(userid) AS user_count
FROM user  
GROUP BY gender, age_group
UNION
SELECT gender, NULL AS age_group, COUNT(userid) AS user_count FROM user GROUP BY gender
UNION
SELECT NULL AS gender, NULL AS age_group, COUNT(userid) AS user_count FROM user;

-- Query to rank movies within each genre based on release date.
SELECT genre,
       movie_name,
       release_date,
       DENSE_RANK() OVER (PARTITION BY genre ORDER BY release_date) AS release_rank
FROM movies;

-- Query to rank artists based on their ratings.
SELECT artist_name, arating,
       DENSE_RANK() OVER (ORDER BY arating DESC) AS artist_rank
FROM artists;

-- Query to retrieve concert dates along with the next and previous concert dates for each artist.
SELECT artist_id,
       concert_name,
       concert_date,
       LEAD(concert_date) OVER (PARTITION BY artist_id ORDER BY concert_date) AS next_concert_date,
       LAG(concert_date) OVER (PARTITION BY artist_id ORDER BY concert_date) AS previous_concert_date
FROM concerts;

-- Query to find movies with no ratings.
SELECT movie_name
FROM movies
LEFT JOIN rating ON movies.movie_id = rating.movie_id
WHERE rating.movie_id IS NULL;

-- Query to retrieve the highest rated movie in each genre.
SELECT genre, movie_name, director, mrating 
FROM ( 
    SELECT genre, movie_name, director, mrating, 
           ROW_NUMBER() OVER (PARTITION BY genre ORDER BY mrating DESC) AS `rank` 
    FROM movies 
) AS ranked_movies 
WHERE `rank` = 1;

-- Query to count the total number of bookings for each user.
SELECT u.userid, u.uname, COUNT(booking_id) AS total_bookings 
FROM user u 
LEFT JOIN booking ON u.userid = booking.userid 
GROUP BY u.userid, u.uname 
LIMIT 0, 50000;

-- Query to find the user with the highest total spending.
SELECT u.userid, u.uname, SUM(b.amount) AS total_spending
FROM user u
JOIN booking b ON u.userid = b.userid
GROUP BY u.userid, u.uname
ORDER BY total_spending DESC
LIMIT 1;

-- Query to calculate the number of seats left in a specific venue.
SELECT v.capacity - (SELECT SUM(b.seat_no)
    FROM booking b
    WHERE b.venue_id = v.venue_id
) as seatsleft
FROM venue v
WHERE v.venue_name LIKE "Arun Jaitley Stadium"
LIMIT 0, 50000;

-- Query to retrieve the first and last payment status for each user.
SELECT 
    userid,
    FIRST_VALUE(payment_status) OVER(ORDER BY payment_date, payment_time) AS first_payment_status,
    LAST_VALUE(payment_status) OVER(ORDER BY payment_date, payment_time) AS last_payment_status
FROM 
    payment;

-- Query to calculate the cumulative distribution of artist ratings.
SELECT 
    artist_id, 
    artist_name, 
    arating, 
    CUME_DIST() OVER (ORDER BY arating) AS cumulative_distribution
FROM 
    artists;

-- Query to calculate the percentile rank of movie ratings.
SELECT 
    movie_id, 
    movie_name, 
    mrating,
    PERCENT_RANK() OVER (ORDER BY mrating) AS percentile_rank_mrating
FROM 
    movies;

-- Query to calculate the percentile rank of artist ratings.
SELECT 
    artist_id, 
    artist_name, 
    arating,
    PERCENT_RANK() OVER (ORDER BY arating) AS percentile_rank_arating
FROM 
    artists;

-- Query to find the most common payment type along with its frequency.
SELECT pt.type_name AS most_common_payment_type, COUNT(*) AS frequency
FROM payment p
INNER JOIN paymenttype pt ON p.payment_type = pt.payment_type
GROUP BY pt.type_name
ORDER BY frequency DESC
LIMIT 1;

-- Query to count the total concerts attended by each user.
SELECT u.uname, COUNT(DISTINCT c.concert_id) AS total_concerts_attended
FROM user u
INNER JOIN booking b ON u.userid = b.userid
INNER JOIN concerts c ON b.venue_id = c.venue_id
GROUP BY u.uname;

-- Query to calculate the total booking amount for each venue.
SELECT v.venue_name, COALESCE(SUM(p.amount), 0) AS total_booking_amount
FROM venue v
LEFT JOIN booking b ON v.venue_id = b.venue_id
LEFT JOIN payment p ON b.booking_id = p.booking_id
GROUP BY v.venue_name
ORDER BY total_booking_amount DESC
LIMIT 3;

-- Query to calculate the total paid amount by each user.
SELECT u.uname, COALESCE(SUM(p.amount), 0) AS total_paid_amount
FROM user u
LEFT JOIN booking b ON u.userid = b.userid
LEFT JOIN payment p ON b.booking_id = p.booking_id
GROUP BY u.uname;

-- Query to calculate quartiles for payment amounts.
SELECT *,NTILE(6) OVER (ORDER BY amount) AS quartile FROM  payment;

-- Query to calculate the running total of payments for each user.
SELECT 
    payment_id,userid,payment_date,amount,
    SUM(amount) OVER (PARTITION BY userid ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM payment;
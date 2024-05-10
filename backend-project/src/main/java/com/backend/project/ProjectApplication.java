package com.backend.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);

		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String user = "root";
		String password = "rajsoni183";

		dropAllTables();
		createTables();
		executeTriggersAndProcedures(url, user, password);
		insertDatap();

	}

	private static void dropAllTables() {

		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";
		try (Connection connection = DriverManager.getConnection(url, username, password)) {
			String[] tableNames = {
					"bank", "payment", "booking", "rating", "paymenttype",
					"movies", "age_restriction", "game", "sports",
					"concerts", "artists", "venue", "login",
					"admin", "roles", "user", "bookingtype"
			};

			for (String tableName : tableNames) {
				dropTableIfExists(connection, tableName);
			}

			System.out.println("All tables dropped successfully.");

			// Now execute the function creation statements
			try (Connection conn = DriverManager.getConnection(url, username, password)) {
				executeSQL(conn, "DROP FUNCTION IF EXISTS age_calculator");
				executeSQL(conn, "CREATE FUNCTION age_calculator(d DATE) RETURNS INT DETERMINISTIC\n" +
						"BEGIN\n" +
						"    DECLARE age INT;\n" +
						"    SET age = TIMESTAMPDIFF(YEAR, CAST(CONCAT(d, ' 00:00:00') AS DATETIME), CURRENT_TIMESTAMP);\n"
						+
						"    RETURN age;\n" +
						"END");

				// Execute multiply function creation
				executeSQL(conn, "DROP FUNCTION IF EXISTS multiply");
				executeSQL(conn, "CREATE FUNCTION multiply(a INT, b INT) RETURNS INT DETERMINISTIC\n" +
						"BEGIN\n" +
						"    DECLARE result INT;\n" +
						"    SET result = a * b;\n" +
						"    RETURN result;\n" +
						"END");

				// Execute encoder function creation
				executeSQL(conn, "SET GLOBAL log_bin_trust_function_creators = 1;");
				executeSQL(conn, "DROP FUNCTION IF EXISTS encoder");
				executeSQL(conn,
						"CREATE FUNCTION encoder(str VARCHAR(255)) " +
								"RETURNS VARCHAR(255) " +
								"DETERMINISTIC " +
								"BEGIN " +
								"    DECLARE result VARCHAR(255) DEFAULT ''; " +
								"    DECLARE c INT DEFAULT 1; " +
								"    DECLARE ch CHAR(1); " +
								"    WHILE c <= LENGTH(str) DO " +
								"        SET ch = SUBSTRING(str, c, 1); " +
								"        IF ch IS NOT NULL THEN " +
								"            IF ASCII(ch) BETWEEN 32 AND 126 THEN " +
								"                SET result = CONCAT(result, CHAR(ASCII(ch) + 1)); " +
								"            ELSEIF ASCII(ch) = 127 THEN " +
								"                SET result = CONCAT(result, CHAR(32)); " +
								"            ELSE " +
								"                SET result = CONCAT(result, ch); " +
								"            END IF; " +
								"        END IF; " +
								"        SET c = c + 1; " +
								"    END WHILE; " +
								"    RETURN result; " +
								"END");
				executeSQL(conn, "SELECT encoder('soni') AS result;");

				// Execute decoder function creation
				executeSQL(conn, "DROP FUNCTION IF EXISTS decoder");
				executeSQL(conn, "CREATE FUNCTION decoder(str VARCHAR(255)) " +
						"RETURNS VARCHAR(255) " +
						"DETERMINISTIC " +
						"BEGIN " +
						"    DECLARE result VARCHAR(255) DEFAULT ''; " +
						"    DECLARE c INT DEFAULT 1; " +
						"    DECLARE ch CHAR(1); " +
						"    WHILE c <= LENGTH(str) DO " +
						"        SET ch = SUBSTRING(str, c, 1); " +
						"        IF ch IS NOT NULL THEN " +
						"            IF ASCII(ch) BETWEEN 33 AND 127 THEN " +
						"                SET result = CONCAT(result, CHAR(ASCII(ch) - 1)); " +
						"            ELSEIF ASCII(ch) = 32 THEN " +
						"                SET result = CONCAT(result, CHAR(127)); " +
						"            ELSE " +
						"                SET result = CONCAT(result, ch); " +
						"            END IF; " +
						"        END IF; " +
						"        SET c = c + 1; " +
						"    END WHILE; " +
						"    RETURN result; " +
						"END");

				executeSQL(conn, "SELECT decoder('tpoj') AS result;");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void executeSQL(Connection connection, String sql) throws SQLException {
		try (Statement statement = connection.createStatement()) {
			statement.execute(sql);
		}
	}

	private static void dropTableIfExists(Connection connection, String tableName) throws SQLException {
		String dropTableSQL = "DROP TABLE IF EXISTS " + tableName;
		try (Statement statement = connection.createStatement()) {
			statement.executeUpdate(dropTableSQL);
		}
		System.out.println("Dropped table: " + tableName);
	}

	private static void createTables() {
		createBankTempTable();
		createRoleTable();
		createUserTable();
		createAdminTable();
		createPaymentTypeTable();
		createVenueTable();
		createArtistsTable();
		createConcertsTable();
		createSportsTable();
		createGameTable();
		createAgeRestrictionTable();
		createMoviesTable();
		createRatingTable();
		createBookingTypeTable();
		createBookingTable();
		createPaymentTable();
	}

	private static void createRoleTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS roles (" +
				"roleid INT PRIMARY KEY AUTO_INCREMENT," +
				"rolename VARCHAR(50) NOT NULL" +
				")";

		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(sql);
			System.out.println("Role table created successfully!");
		} catch (SQLException e) {
			System.out.println("Error creating role table: " + e.getMessage());
		}
	}

	private static void createUserTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS user (" +
				"userid INT PRIMARY KEY AUTO_INCREMENT," +
				"uname VARCHAR(50) NOT NULL," +
				"username VARCHAR(50) NOT NULL UNIQUE," +
				"udate VARCHAR(50) NOT NULL," +
				"uemail VARCHAR(50) NOT NULL," +
				"upassword VARCHAR(50) NULL," +
				"uphoneno VARCHAR(30) NOT NULL," +
				"gender VARCHAR(10) NOT NULL" +
				")";

		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(sql);
			System.out.println("User table created successfully!");
		} catch (SQLException e) {
			System.out.println("Error creating user table: " + e.getMessage());
		}
	}

	private static void createAdminTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS admin (" +
				"adminid INT PRIMARY KEY AUTO_INCREMENT," +
				"aname VARCHAR(25) NOT NULL," +
				"aemail VARCHAR(50) NOT NULL," +
				"ausername VARCHAR(50) NULL UNIQUE," +
				"apassword VARCHAR(50) NOT NULL," +
				"aphoneno VARCHAR(30) NOT NULL," +
				"roleid INT NOT NULL," +
				"CONSTRAINT fk_role FOREIGN KEY(roleid) REFERENCES roles(roleid)  ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(sql);
			System.out.println("Admin table created successfully!");
		} catch (SQLException e) {
			System.out.println("Error creating admin table: " + e.getMessage());
		}
	}

	private static void createPaymentTypeTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS paymenttype (" +
				"payment_type INT PRIMARY KEY AUTO_INCREMENT," +
				"type_name VARCHAR(50) NOT NULL" +
				")";

		executeSQL(url, username, password, sql, "PaymentType");
	}

	private static void createVenueTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS venue (" +
				"venue_id INT PRIMARY KEY AUTO_INCREMENT," +
				"venue_name VARCHAR(100) NOT NULL," +
				"location VARCHAR(100)," +
				"capacity INT," +
				"contact_info VARCHAR(100)" +
				")";

		executeSQL(url, username, password, sql, "Venue");
	}

	private static void createArtistsTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS artists (" +
				"artist_id INT PRIMARY KEY AUTO_INCREMENT," +
				"artist_name VARCHAR(50) NOT NULL," +
				"arating DECIMAL(10,4)" +
				")";

		executeSQL(url, username, password, sql, "Artists");
	}

	private static void createConcertsTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS concerts (" +
				"concert_id INT PRIMARY KEY AUTO_INCREMENT," +
				"artist_id INT," +
				"venue_id INT," +
				"concert_name VARCHAR(50)," +
				"concert_date DATE," +
				"concert_time TIME," +
				"FOREIGN KEY(artist_id) REFERENCES artists(artist_id)  ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(venue_id) REFERENCES venue(venue_id)  ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		executeSQL(url, username, password, sql, "Concerts");
	}

	private static void createSportsTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS sports (" +
				"sports_id INT PRIMARY KEY AUTO_INCREMENT," +
				"sports_name VARCHAR(30)" +
				")";

		executeSQL(url, username, password, sql, "Sports");
	}

	private static void createGameTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS game (" +
				"game_id INT PRIMARY KEY AUTO_INCREMENT," +
				"sports_id INT," +
				"venue_id INT," +
				"game_date DATE," +
				"opponenta VARCHAR(50)," +
				"opponentb VARCHAR(50)," +
				"grating DECIMAL(10,4)," +
				"FOREIGN KEY(sports_id) REFERENCES sports(sports_id)  ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(venue_id) REFERENCES venue(venue_id)  ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		executeSQL(url, username, password, sql, "Game");
	}

	private static void createAgeRestrictionTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS age_restriction (" +
				"age_restriction_id INT PRIMARY KEY AUTO_INCREMENT," +
				"age_restriction_name VARCHAR(30) NOT NULL" +
				")";

		executeSQL(url, username, password, sql, "AgeRestriction");
	}

	private static void createMoviesTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS movies (" +
				"movie_id INT PRIMARY KEY AUTO_INCREMENT," +
				"movie_name VARCHAR(100)," +
				"release_date DATE," +
				"age_restriction_id INT," +
				"venue_id INT," +
				"genre VARCHAR(50)," +
				"director VARCHAR(50)," +
				"mcast VARCHAR(50)," +
				"mrating DECIMAL(10,4)," +
				"FOREIGN KEY(age_restriction_id) REFERENCES age_restriction(age_restriction_id)  ON DELETE CASCADE ON UPDATE CASCADE,"
				+
				"FOREIGN KEY(venue_id) REFERENCES venue(venue_id)  ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		executeSQL(url, username, password, sql, "Movies");
	}

	private static void createRatingTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS rating (" +
				"userid INT," +
				"artist_id INT," +
				"movie_id INT," +
				"game_id INT," +
				"rating DECIMAL(10,4)," +
				"FOREIGN KEY(userid) REFERENCES user(userid) ON DELETE CASCADE," +
				"FOREIGN KEY(artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(game_id) REFERENCES game(game_id) ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		executeSQL(url, username, password, sql, "Rating");
	}

	private static void createBookingTypeTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS bookingtype (" +
				"booking_type INT PRIMARY KEY AUTO_INCREMENT," +
				"bookingname VARCHAR(25) NOT NULL" +
				")";

		executeSQL(url, username, password, sql, "BookingType");
	}

	private static void createBookingTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS booking (" +
				"booking_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
				"userid INT," +
				"booking_type INT," +
				"venue_id INT," +
				"dateb DATE," +
				"timeb TIME," +
				"seat_no INT CHECK (seat_no <= 5)," +
				"booking_status VARCHAR(30) DEFAULT 'PENDING' CHECK (booking_status IN ('PENDING', 'SUCCESSFUL', 'REJECTED', 'CANCELLED')) NOT NULL,"
				+
				"amount INT NOT NULL," +
				"FOREIGN KEY(userid) REFERENCES user(userid)  ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(booking_type) REFERENCES bookingtype(booking_type)  ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		executeSQL(url, username, password, sql, "Booking");
	}

	private static void createPaymentTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS payment (" +
				"payment_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
				"booking_id INT NOT NULL," +
				"userid INT NOT NULL," +
				"payment_date DATE NOT NULL," +
				"payment_time TIME NOT NULL," +
				"payment_type INT NOT NULL," +
				"amount INT NOT NULL," +
				"payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('ACCEPTED','DENIED')) NOT NULL,"
				+
				"FOREIGN KEY(userid) REFERENCES user(userid)  ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(payment_type) REFERENCES paymenttype(payment_type)  ON DELETE CASCADE ON UPDATE CASCADE," +
				"FOREIGN KEY(booking_id) REFERENCES booking(booking_id)  ON DELETE CASCADE ON UPDATE CASCADE" +
				")";

		executeSQL(url, username, password, sql, "Payment");
	}

	private static void createBankTempTable() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		String sql = "CREATE TABLE IF NOT EXISTS bank (" +
				"pay_id INT," +
				"amnt VARCHAR(30)," +
				"transactions VARCHAR(30)" +
				")";

		executeSQL(url, username, password, sql, "Bank");
	}

	private static void executeSQL(String url, String username, String password, String sql, String tableName) {
		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(sql);
			System.out.println(tableName + " table created successfully!");
		} catch (SQLException e) {
			System.out.println("Error creating " + tableName + " table: " + e.getMessage());
		}
	}

	private static void executeTriggersAndProcedures(String url, String user, String password) {
		try (Connection connection = DriverManager.getConnection(url, user, password);
				Statement statement = connection.createStatement()) {

			executeSQL(statement, "DROP TRIGGER IF EXISTS user_trigger");
			executeSQL(statement, "DROP TRIGGER IF EXISTS admin_trigger");
			executeSQL(statement, "DROP TRIGGER IF EXISTS concerts_conflict");
			executeSQL(statement, "DROP TRIGGER IF EXISTS games_conflict");
			executeSQL(statement, "DROP TRIGGER IF EXISTS user_rating");
			executeSQL(statement, "DROP TRIGGER IF EXISTS movies_rating");
			executeSQL(statement, "DROP TRIGGER IF EXISTS moviesr_update");
			executeSQL(statement, "DROP TRIGGER IF EXISTS games_rating");
			executeSQL(statement, "DROP TRIGGER IF EXISTS gamer_update");
			executeSQL(statement, "DROP TRIGGER IF EXISTS artists_rating");
			executeSQL(statement, "DROP TRIGGER IF EXISTS artistr_update");
			executeSQL(statement, "DROP TRIGGER IF EXISTS bookingt");
			executeSQL(statement, "DROP TRIGGER IF EXISTS paymentbi");
			executeSQL(statement, "DROP TRIGGER IF EXISTS paymentai");
			executeSQL(statement, "DROP PROCEDURE IF EXISTS movierating");
			executeSQL(statement, "DROP PROCEDURE IF EXISTS gamerating");
			executeSQL(statement, "DROP PROCEDURE IF EXISTS artistrating");
			executeSQL(statement, "DROP PROCEDURE IF EXISTS before_inserting_booking");

			executeSQL(statement,
					"ALTER TABLE user ADD COLUMN age INT");
			executeSQL(statement, "SET GLOBAL log_bin_trust_function_creators = 1");
			executeSQL(statement,
					"CREATE TRIGGER user_trigger BEFORE INSERT ON user FOR EACH ROW BEGIN SET NEW.age = age_calculator(NEW.udate); SET NEW.upassword = encoder(NEW.upassword); END");
			executeSQL(statement,
					"CREATE TRIGGER admin_trigger BEFORE INSERT ON admin FOR EACH ROW BEGIN SET NEW.apassword = encoder(NEW.apassword); END");
			executeSQL(statement,
					"CREATE TRIGGER concerts_conflict BEFORE INSERT ON concerts FOR EACH ROW BEGIN IF (SELECT COUNT(*) FROM concerts WHERE (artist_id <> NEW.artist_id OR venue_id = NEW.venue_id) AND concert_date = NEW.concert_date AND concert_name <> NEW.concert_name AND NOT (NEW.concert_time >= concert_time + INTERVAL 3 HOUR OR NEW.concert_time + INTERVAL 3 HOUR <= concert_time)) > 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot insert. Sorry No concerts with same time/date are to be added.'; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER games_conflict BEFORE INSERT ON game FOR EACH ROW BEGIN IF (SELECT COUNT(*) FROM game WHERE sports_id = NEW.sports_id AND venue_id = NEW.venue_id AND game_date = NEW.game_date) > 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot insert. There is a conflict between games added'; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER user_rating BEFORE INSERT ON rating FOR EACH ROW BEGIN DECLARE a INT; DECLARE m INT; DECLARE g INT; SELECT COUNT(*) INTO a FROM artists; SELECT COUNT(*) INTO m FROM movies; SELECT COUNT(*) INTO g FROM game; IF (NEW.artist_id > a) OR (NEW.movie_id > m) OR (NEW.game_id > g) THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You are trying to insert wrong Movie ID/Game ID/Artist ID'; END IF; END");
			executeSQL(statement,
					"CREATE PROCEDURE movierating(IN movie_id_param INT, IN user_id_param INT) BEGIN DECLARE total_rating DECIMAL(5, 2); DECLARE total_count INT; DECLARE average_rating DECIMAL(5, 2); SELECT SUM(rating), COUNT(*) INTO total_rating, total_count FROM rating WHERE movie_id = movie_id_param; IF total_count > 0 THEN SET average_rating = total_rating / total_count; UPDATE movies SET mrating = average_rating WHERE movie_id = movie_id_param; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER movies_rating AFTER INSERT ON rating FOR EACH ROW BEGIN CALL movierating(NEW.movie_id, NEW.userid); END");
			executeSQL(statement,
					"CREATE TRIGGER moviesr_update AFTER UPDATE ON rating FOR EACH ROW BEGIN IF (NEW.movie_id = OLD.movie_id) AND (NEW.userid = OLD.userid) THEN CALL movierating(NEW.movie_id, NEW.userid); END IF; END");
			executeSQL(statement,
					"CREATE PROCEDURE gamerating(IN game_id_param INT, IN user_id_param INT) BEGIN DECLARE total_rating DECIMAL(5, 2); DECLARE total_count INT; DECLARE average_rating DECIMAL(5, 2); SELECT SUM(rating), COUNT(*) INTO total_rating, total_count FROM rating WHERE game_id = game_id_param; IF total_count > 0 THEN SET average_rating = total_rating / total_count; UPDATE game SET grating = average_rating WHERE game_id = game_id_param; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER games_rating AFTER INSERT ON rating FOR EACH ROW BEGIN CALL gamerating(NEW.game_id, NEW.userid); END");
			executeSQL(statement,
					"CREATE TRIGGER gamer_update AFTER UPDATE ON rating FOR EACH ROW BEGIN IF (NEW.game_id = OLD.game_id) AND (NEW.userid = OLD.userid) THEN CALL gamerating(NEW.game_id, NEW.userid); END IF; END");
			executeSQL(statement,
					"CREATE PROCEDURE artistrating(IN artist_id_param INT, IN user_id_param INT) BEGIN DECLARE total_rating DECIMAL(5, 2); DECLARE total_count INT; DECLARE average_rating DECIMAL(5, 2); SELECT SUM(rating), COUNT(*) INTO total_rating, total_count FROM rating WHERE artist_id = artist_id_param; IF total_count > 0 THEN SET average_rating = total_rating / total_count; UPDATE artists SET arating = average_rating WHERE artist_id = artist_id_param; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER artists_rating AFTER INSERT ON rating FOR EACH ROW BEGIN CALL artistrating(NEW.artist_id, NEW.userid); END");
			executeSQL(statement,
					"CREATE TRIGGER artistr_update AFTER UPDATE ON rating FOR EACH ROW BEGIN IF (NEW.artist_id = OLD.artist_id) AND (NEW.userid = OLD.userid) THEN CALL artistrating(NEW.artist_id, NEW.userid); END IF; END");
			executeSQL(statement,
					"CREATE PROCEDURE before_inserting_booking(IN btype_param INT, IN vid_param INT) BEGIN DECLARE texists BOOLEAN; IF btype_param = 1 THEN SELECT EXISTS (SELECT 1 FROM movies WHERE venue_id = vid_param) INTO texists; IF NOT texists THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venue ID does not exist in movies table'; END IF; END IF; IF btype_param = 2 THEN SELECT EXISTS (SELECT 1 FROM game WHERE venue_id = vid_param) INTO texists; IF NOT texists THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venue ID does not exist in games table'; END IF; END IF; IF btype_param = 3 THEN SELECT EXISTS (SELECT 1 FROM concerts WHERE venue_id = vid_param) INTO texists; IF NOT texists THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Venue ID does not exist in concerts table'; END IF; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER bookingt BEFORE INSERT ON booking FOR EACH ROW BEGIN DECLARE totalcap INT; DECLARE tseats INT; DECLARE res INT; IF NEW.booking_type = 1 THEN SET NEW.amount = NEW.seat_no * 2000; ELSEIF NEW.booking_type = 2 THEN SET NEW.amount = NEW.seat_no * 1500; ELSEIF NEW.booking_type = 3 THEN SET NEW.amount = NEW.seat_no * 1000; END IF; IF NEW.dateb = NEW.dateb AND NEW.timeb = NEW.timeb AND NEW.venue_id = NEW.venue_id THEN SELECT capacity INTO totalcap FROM venue WHERE venue_id = NEW.venue_id; SELECT IFNULL(SUM(seat_no), 0) INTO tseats FROM booking WHERE venue_id = NEW.venue_id; SET res = totalcap - tseats; IF res < NEW.seat_no THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough seats available. Cannot allot more seats.'; END IF; END IF; END");
			executeSQL(statement,
					"CREATE TRIGGER paymentbi BEFORE INSERT ON payment FOR EACH ROW BEGIN DECLARE a INT; DECLARE u INT; SELECT userid, amount INTO u, a FROM booking WHERE booking_id = NEW.booking_id; SET NEW.userid = u; SET NEW.amount = a; SET NEW.payment_date = IFNULL(NEW.payment_date, CURDATE()); SET NEW.payment_time = IFNULL(NEW.payment_time, CURTIME()); END");
			executeSQL(statement,
					"CREATE TRIGGER paymentai AFTER INSERT ON PAYMENT FOR EACH ROW BEGIN DECLARE am INT; DECLARE str VARCHAR(255); DECLARE pid INT; IF NEW.payment_status = 'ACCEPTED' THEN UPDATE booking SET booking_status = 'SUCCESSFUL' WHERE booking_id = NEW.booking_id; SELECT payment_id, amount INTO pid, am FROM payment WHERE booking_id = NEW.booking_id LIMIT 1; SET str = CONCAT('+', CAST(am AS CHAR)); INSERT INTO bank(pay_id, amnt,transactions) VALUES (pid,str, 'DEPOSIT'); ELSEIF NEW.payment_status = 'DENIED' THEN UPDATE booking SET booking_status = 'REJECTED' WHERE booking_id = NEW.booking_id; END IF; END");

			System.out.println("All triggers and procedures executed successfully.");
		} catch (SQLException e) {
			System.err.println("Error executing triggers and procedures: " + e.getMessage());
			e.printStackTrace();
		}
	}

	private static void executeSQL(Statement statement, String sql) throws SQLException {
		statement.execute(sql);
	}

	private static void insertDatap() {
		String url = "jdbc:mysql://localhost:3306/application?useSSL=false&allowPublicKeyRetrieval=true";
		String username = "root";
		String password = "rajsoni183";

		try (Connection connection = DriverManager.getConnection(url, username, password);
				Statement statement = connection.createStatement()) {

			// Insert into user table
			String insertUserSQL = "INSERT INTO user (uname, username, udate, uemail, upassword, uphoneno, gender) VALUES "
					+
					"('Vivek Yadav', 'vivek_yadav', '2004-05-20', 'vivek.yadav@gmail.com', 'S3cureIndia26', '+191734567812', 'Male'),"
					+
					"('Nisha Sharma', 'nisha_sharma', '2005-11-18', 'nisha.sharma@hotmail.com', 'P@ssw0rdIndia27', '+191734567813', 'Female'),"
					+
					"('Deepika Singh', 'deepika_singh', '1989-11-18', 'deepika.singh@yahoo.com', 'P@ssIndia4', '+911234567893', 'Female'),"
					+
					"('Amit Patel', 'amit_patel', '1985-07-30', 'amit.patel@gmail.com', 'S3cureIndia5', '+911234567894', 'Male'),"
					+
					"('Pooja Gupta', 'pooja_gupta', '1984-03-12', 'pooja.gupta@hotmail.com', 'P@ssw0rdIndia6', '+911234567895', 'Female'),"
					+
					"('Rahul Sharma', 'rahul_sharma', '1986-08-22', 'rahul.sharma@yahoo.com', 'P@ssIndia7', '+191734567890', 'Male'),"
					+
					"('Sneha Yadav', 'sneha_yadav', '1988-02-28', 'sneha.yadav@gmail.com', 'S3cureIndia8', '+191734567891', 'Female'),"
					+
					"('Arun Kumar', 'arun_kumar', '1981-01-28', 'arun.kumar@hotmail.com', 'P@ssw0rdIndia12', '+191734567895', 'Other'),"
					+
					"('Aryan Gupta', 'aryan_gupta', '1999-12-09', 'aryan.gupta@yahoo.com', 'P@ssIndia34', '+191734567820', 'Male'),"
					+
					"('Meera Shah', 'meera_shah', '1980-03-17', 'meera.shah@yahoo.com', 'P@ssIndia31', '+911234567896', 'Female'),"
					+
					"('Akanksha Singh', 'akanksha_singh', '1990-02-20', 'akanksha.singh@yahoo.com', 'P@ssIndia16', '+191734567896', 'Female'),"
					+
					"('Alok Yadav', 'alok_yadav', '1991-07-15', 'alok.yadav@gmail.com', 'S3cureIndia17', '+191734567897', 'Male'),"
					+
					"('Sarika Sharma', 'sarika_sharma', '1983-11-18', 'sarika.sharma@hotmail.com', 'P@ssw0rdIndia18', '+191734567898', 'Female'),"
					+
					"('Kunal Patel', 'kunal_patel', '1992-04-05', 'kunal.patel@yahoo.com', 'P@ssIndia19', '+191734567899', 'Male'),"
					+
					"('Tanvi Gupta', 'tanvi_gupta', '1990-08-30', 'tanvi.gupta@gmail.com', 'S3cureIndia20', '+191734567810', 'Female'),"
					+
					"('Priya Sharma', 'priya_sharma', '1999-05-08', 'priya.sharma@hotmail.com', 'P@ssw0rdIndia21', '+911234567811', 'Female'),"
					+
					"('Sanya Gupta', 'sanya_gupta', '2003-01-05', 'sanya.gupta@yahoo.com', 'P@ssIndia25', '+191734567811', 'Female'),"
					+
					"('Rohan Patel', 'rohan_patel', '2006-03-12', 'rohan.patel@yahoo.com', 'P@ssIndia28', '+191734567814', 'Male'),"
					+
					"('Shreya Yadav', 'shreya_yadav', '2003-02-20', 'shreya.yadav@gmail.com', 'S3cureIndia35', '+191734567821', 'Female')";

			statement.executeUpdate(insertUserSQL);

			// Insert into roles table
			String insertRolesSQL = "INSERT INTO roles(rolename) VALUES " +
					"('Movie Manager'),('Game Manager'),('Sports Manager'),('Concert Manager'),('Artist Manager'),('Venue Manager'),('Age Restriction Manager'),('Booking Manager'),('Payements Manager'),('Technical Manager'),('Security Manager'),('Marketing Manager'),('Transportation Manager'),('Event Manager'),('Sponsorship Manager')";
			statement.executeUpdate(insertRolesSQL);

			String srSQL = "ALTER TABLE admin MODIFY COLUMN apassword VARCHAR(50) NULL;";
			statement.executeUpdate(srSQL);

			// Insert into admin table
			String insertAdminSQL = "INSERT INTO admin (aname, aemail, ausername, apassword, aphoneno, roleid) VALUES "
					+
					"('Amit Singh', 'amit.singh@starflix.com', 'amitS123', 'password123', '+919876543210', 2)," +
					"('Priya Kapoor', 'priya.kapoor@bollygames.com', 'priyaKapoor99', 'pvcxwyyuou56', '+918765432198', 1),"
					+
					"('Rahul Sharma', 'rahul.sharma@concertomania.com', 'rockstarrahul', 'password789', '+917654321098', 3),"
					+
					"('Rani Mukherjee', 'rani.mukherjee@artistgalaxy.com', 'dancingrani', 'password012', '+916543210987', 1),"
					+
					"('Vikram Kumar', 'vikram.kumar@venueville.com', 'vikramVK', 'password345', '+919876543201', 4)," +
					"('Saira Khan', 'saira.khan@starflix.com', 'sairaKhantastic', 'ggdsryjdonipo', '+918765432190', 1),"
					+
					"('Rohit Patel', 'rohit.patel@bollygames.com', 'rohitPgames', 'propdetre45va', '+917654321089', 3),"
					+
					"('Aisha Kapoor', 'aisha.kapoor@concertomania.com', 'aishak999', 'pass123gg', '+916543210876', 3),"
					+
					"('Arjun Kapoor', 'arjun.kapoor@artistgalaxy.com', 'arjunkacting', 'opsyuoord567', '+919876543012', 2),"
					+
					"('Kareena Kapoor', 'kareena.kapoor@venueville.com', 'kareenakapoor00', 'password123', '+918765430198', 5),"
					+
					"('Sunil Dutt', 'sunil.dutt@starflix.com', 'sunilDlegendary', 'pcarfrockbs4', '+917654012321', 1),"
					+
					"('Nutan Nalwade', 'nutan.nalwade@bollygames.com', 'nutannutann', 'password567dsa', '+916540123201', 5),"
					+
					"('Dilip Kumar', 'dilip.kumar@concertomania.com', 'dilipkumar23', 'ilo90opjbz', '+919870123210', 3),"
					+
					"('Madhubala', 'madhubala@artistgalaxy.com', 'madhubalafan', 'helloworld', '+918760123298', 2)," +
					"('Dev Anand', 'dev.anand@venueville.com', 'devthegreat', 'p6fyjsad345', '+917650123209', 5)";

			statement.executeUpdate(insertAdminSQL);

			// Insert into bookingtype table
			String insertBookingTypeSQL = "INSERT INTO bookingtype(bookingname) VALUES " +
					"('Movie'),('Sports'),('Concerts')";
			statement.executeUpdate(insertBookingTypeSQL);

			// Insert into venue table
			String insertVenueSQL = "INSERT INTO venue(venue_name,location,capacity,contact_info) VALUES " +
					"('M. A. Chidambaram Stadium','Chennai',38,'xyz@chidambaram.com')," +
					"('Babu Banarasi Das Indoor Stadium','Lucknow',9,'xyz@babubanarasi.com')," +
					"('Bangalore Hockey Stadium','Bangalore',17,'xyz@bangalorestadium.com')," +
					"('INOX R-City','Mumbai',14,'xyz@inox.com')," +
					"('INOX Mantri Square','Bangalore',14,'xyz@inox.com')," +
					"('PVR Ambience Mall','Gurgaon',14,'xyz@pvr.com')," +
					"('Eden Gardens','Kolata',68,'xyz@edengardens.com')," +
					"('INOX Quest Mall','Kolkata',14,'xyz@inox.com')," +
					"('Indira Gandhi Arena','New Delhi',14,'xyz@indiragandhi.com')," +
					"('PVR Phoenix Market City','Mumbai',14,'xyz@pvr.com')," +
					"('Sardar Vallabhbhai Patel International Hockey Stadium','Raipur',40,'xyz@sardarpatelstadium.com'),"
					+
					"('Arun Jaitley Stadium','Delhi',35,'xyz@arunjaitleystadium.com')," +
					"('Netaji Indoor Stadium','Kolkata',12,'xyz@netajiindoor.com')," +
					"('Brabourne Stadium','Mumbai',20,'xyz@brabournestadium.com')," +
					"('PVR Forum Mall','Bangalore',14,'xyz@pvr.com')," +
					"('Birsa Munda International Hockey Stadium','Rourkela',21,'xyz@bisramundastadium.com')," +
					"('PVR Inorbit Mall','Hyderabad',14,'xyz@pvr.com')," +
					"('Rajiv Gandhi Stadium','Hyderabad',37,'xyz@rajivgandhistadium.com')," +
					"('INOX Nehru Place','Delhi',14,'xyz@inox.com')," +
					"('M. Chinnaswamy Stadium','Bangalore',32,'xyz@chinnaswamystadium.com')," +
					"('Thyagaraj Sports Complex','New Delhi',10,'xyz@thagarajsports.com')," +
					"('Wankhede Stadium','Mumbai',33,'xyz@wankhedestadium.com')";

			statement.executeUpdate(insertVenueSQL);

			// Insert into artists table
			String insertArtistsSQL = "INSERT INTO artists(artist_name) VALUES" +
					"('Shreya Goshal'),('Geetha Madhuri'),('Hemachandra'),('Sunidhi Chauhan'),('Sonu Nigam')," +
					"('Udit Narayan'),('Armaan Malik'),('Kailash Kher'),('A.R.Rahman'),('Kishore Kumar')," +
					"('Adnan Sami'),('Jonita Gandhi'),('Anirudh Ravichander'),('Asha Bhosle'),('Arijith Singh')";

			statement.executeUpdate(insertArtistsSQL);

			// Insert into concerts table
			String insertConcertsSQL = "INSERT INTO concerts(artist_id, venue_id, concert_name, concert_date, concert_time) VALUES "
					+
					"(1, 1, 'Mystical Melodies', '2024-03-15', '19:00:00')," +
					"(14, 14, 'Bhosles Bliss', '2025-03-25', '20:15:00')," +
					"(7, 7, 'Magical Moments', '2024-09-25', '19:15:00')," +
					"(12, 12, 'Leo Classics', '2025-02-03', '19:00:00')," +
					"(5, 12, 'Soulful Serenade', '2024-07-12', '21:00:00')," +
					"(3, 1, 'Harmony in the Hills', '2024-05-20', '20:00:00')," +
					"(11, 1, 'Samis Symphony', '2025-01-08', '20:30:00')," +
					"(4, 20, 'Sunshine Symphony', '2024-06-05', '19:30:00')," +
					"(13, 12, 'Leo Classics', '2025-02-03', '19:00:00')," +
					"(9, 7, 'Rahman Rhapsody', '2024-11-15', '20:15:00')," +
					"(10, 18, 'Kumars Classics', '2024-12-05', '19:45:00')," +
					"(1, 7, 'Sunidhi & Shreya Classics', '2024-04-18', '20:30:00')," +
					"(2, 2, 'Enchanting Evening', '2024-04-10', '18:30:00')," +
					"(12, 12, 'Gandhis Melody', '2025-02-14', '18:30:00')," +
					"(4, 7, 'Sunidhi & Shreya Classics', '2024-04-18', '20:30:00')," +
					"(6,22, 'Melodious Night', '2024-08-18', '20:30:00')," +
					"(13, 12, 'Ravichanders Rhythm', '2025-03-20', '19:00:00')," +
					"(8, 18, 'Divine Harmony', '2024-10-30', '18:45:00')," +
					"(15, 1, 'Singhs Symphony', '2025-05-10', '19:45:00')";

			statement.executeUpdate(insertConcertsSQL);

			String insertSportsSQL = "INSERT INTO sports (sports_name) VALUES " +
					"('Cricket'),('Football'),('Tennis'),('Badminton'),('Basketball')," +
					"('Hockey'),('Volleyball'),('Table Tennis')";

			statement.executeUpdate(insertSportsSQL);

			// Inserting into game table
			String insertGameSQL = "INSERT INTO game (sports_id, venue_id, game_date, opponenta, opponentb) VALUES " +
					"(1, 7, '2024-03-15', 'India', 'Australia')," +
					"(3, 2, '2024-04-10', 'Brazil', 'Germany')," +
					"(4, 13, '2024-05-20', 'France', 'Spain')," +
					"(6, 11, '2024-06-05', 'Japan', 'China')," +
					"(5, 13, '2024-07-12', 'USA', 'Canada')," +
					"(1, 12, '2024-08-18', 'England', 'South Africa')," +
					"(1, 18, '2024-09-25', 'Australia', 'New Zealand')," +
					"(1, 1, '2024-10-30', 'India', 'Pakistan')," +
					"(5, 20, '2024-11-15', 'Argentina', 'Italy')," +
					"(2, 12, '2024-12-05', 'Sweden', 'Russia')," +
					"(7, 13, '2025-01-08', 'Spain', 'Portugal')," +
					"(5, 20, '2025-02-14', 'Netherlands', 'Belgium')," +
					"(6, 16, '2024-06-05', 'India', 'China')," +
					"(8, 2, '2025-03-20', 'South Korea', 'North Korea')," +
					"(1, 22, '2025-04-25', 'India', 'Sri Lanka')," +
					"(1, 12, '2025-05-10', 'Australia', 'West Indies')";

			statement.executeUpdate(insertGameSQL);

			// Inserting into paymenttype table
			String insertPaymentTypeSQL = "INSERT INTO paymenttype(type_name) VALUES " +
					"('UPI'),('Credit Card'),('Debit Card'),('NetBanking')";

			statement.executeUpdate(insertPaymentTypeSQL);
			String insertAgeRestrictionSQL = "INSERT INTO age_restriction(age_restriction_name) VALUES " +
					"('U'),('U/A 12<'),('U/A 7+'),('U/A 13+'),('U/A 16+'),('A')";

			statement.executeUpdate(insertAgeRestrictionSQL);

			// Inserting into movies table
			String insertMoviesSQL = "INSERT INTO movies (movie_name, release_date, age_restriction_id, venue_id, genre, director, mcast) VALUES "
					+
					"('Sarkaru Vaari Paata', '2022-01-11', 2, 4, 'Action-Drama', 'Parasuram', 'Mahesh Babu, Keerthy Suresh'),"
					+
					"('F3: Fun and Frustration', '2022-02-10', 1, 5, 'Comedy-Drama', 'Anil Ravipudi', 'Venkatesh, Varun Tej'),"
					+
					"('Shyam Singha Roy', '2022-03-24', 2, 6, 'Fantasy-Drama', 'Rahul Sankrityan', 'Nani, Sai Pallavi'),"
					+
					"('Ghani', '2022-04-15', 3, 8, 'Sports-Drama', 'Kirankumar', 'Varun Tej, Saiee Manjrekar')," +
					"('KGF: Chapter 2 (Telugu)', '2022-04-14', 4, 10, 'Action-Thriller', 'Prashanth Neel', 'Yash, Sanjay Dutt'),"
					+
					"('Radhe Shyam', '2022-03-11', 1, 15, 'Romantic-Drama', 'Radha Krishna Kumar', 'Prabhas, Pooja Hegde'),"
					+
					"('Pushpa: The Rise', '2021-12-17', 3, 17, 'Action-Thriller', 'Sukumar', 'Allu Arjun, Rashmika Mandanna'),"
					+
					"('RRR', '2022-03-24', 2, 19, 'Action-Drama', 'S. S. Rajamouli', 'N. T. Rama Rao Jr., Ram Charan'),"
					+
					"('Acharya', '2022-05-13', 2, 4, 'Action-Drama', 'Koratala Siva', 'Chiranjeevi, Kajal Aggarwal')," +
					"('Love Story', '2021-09-24', 1, 5, 'Romantic-Drama', 'Sekhar Kammula', 'Naga Chaitanya, Sai Pallavi'),"
					+
					"('Beast', '2022-04-14', 3, 6, 'Action-Thriller', 'Nelson Dilipkumar', 'Vijay, Pooja Hegde')," +
					"('Akhanda', '2021-12-02', 3, 8, 'Action-Drama', 'Boyapati Srinu', 'Nandamuri Balakrishna, Pragya Jaiswal'),"
					+
					"('Bheemla Nayak', '2022-02-25', 2, 10, 'Action-Drama', 'Saagar K Chandra', 'Pawan Kalyan, Rana Daggubati'),"
					+
					"('Major', '2022-02-11', 3, 15, 'Biography', 'Sashi Kiran Tikka', 'Adivi Sesh, Saiee Manjrekar')," +
					"('Jersey', '2022-04-15', 1, 17, 'Sports-Drama', 'Gowtam Tinnanuri', 'Nani, Shraddha Srinath')," +
					"('Pelli SandaD', '2022-01-14', 2, 19, 'Romantic-Drama', 'Kapil Verma', 'Roshann, Sreeleela')," +
					"('Bhola Shankar', '2022-06-03', 3, 4, 'Action-Comedy', 'Meher Ramesh', 'Chiranjeevi,Keerthy Suresh'),"
					+
					"('Nallamala', '2022-08-12', 1, 5, 'Suspense Thriller', 'D Suresh Babu', 'Srikanth, Varalaxmi Sarathkumar'),"
					+
					"('Thaggedhe Le', '2022-10-20', 2, 6, 'Comedy-Drama', 'Venkat Prabhu', 'Nithiin, Tamannaah')," +
					"('Uppena', '2022-02-12', 3, 8, 'Romantic-Drama', 'Buchi Babu Sana', 'Panja Vaisshnav Tej, Krithi Shetty'),"
					+
					"('Hari Hara Veera Mallu', '2022-11-25', 2, 4, 'Historical-Drama', 'Gunasekhar', 'Pawan Kalyan, Jacqueline Fernandez'),"
					+
					"('Aaviri', '2023-03-21', 3, 15, 'Horror-Thriller', 'Ravi Babu', 'Aadi Saikumar, Vaibhavi Shandilya')";

			statement.executeUpdate(insertMoviesSQL);

			String insertRatingSQL = "INSERT INTO rating(userid, movie_id, artist_id, game_id, rating) VALUES " +
					"(1, 3, 8, 1, 8), (1, 10, 12, 2, 7), (1, 14, 3, 3, 9), " +
					"(2, 5, 5, 4, 6), (2, 12, 14, 5, 8), (2, 17, 1, 6, 5), " +
					"(3, 10, 9, 7, 9), (3, 18, 2, 8, 6), (3, 19, 11, 9, 7), " +
					"(4, 2, 7, 10, 8), (4, 7, 3, 11, 6), (4, 16, 10, 12, 9), " +
					"(5, 14, 6, 13, 7), (5, 19, 4, 14, 8), (5, 4, 8, 15, 5), " +
					"(6, 11, 1, 16, 6), (6, 15, 9, 1, 9), (6, 16, 5, 2, 7), " +
					"(7, 8, 2, 3, 5), (7, 17, 13, 4, 7), (7, 3, 6, 5, 8), " +
					"(8, 6, 10, 6, 8), (8, 13, 4, 7, 5), (8, 18, 7, 8, 6), " +
					"(9, 9, 14, 9, 6), (9, 14, 8, 10, 9), (9, 17, 12, 11, 7), " +
					"(10, 3, 1, 12, 8), (10, 8, 3, 13, 9), (10, 15, 11, 14, 6), " +
					"(11, 7, 9, 15, 6), (11, 14, 5, 16, 7), (11, 19, 2, 1, 8), " +
					"(1, 1, 15, 1, 1), (1, 9, 15, 9, 9), " +
					"(12, 1, 5, 8, 8), (12, 5, 1, 7, 7)";

			statement.executeUpdate(insertRatingSQL);

			// Inserting into booking table
			String insertBookingSQL = "INSERT INTO booking(userid,booking_type,venue_id,dateb,timeb,seat_no) VALUES " +
					"(9, 1, 4, '2022-06-03', NULL, 3), " +
					"(4, 2, 11, '2024-06-05', NULL, 3), " +
					"(17, 2, 1, '2024-10-30', NULL, 2), " +
					"(3, 2, 1, '2024-10-30', NULL, 4), " +
					"(13, 1, 4, '2022-06-03', NULL, 1), " +
					"(15, 2, 18, '2024-09-25', NULL, 3), " +
					"(6, 1, 19, '2022-03-24', NULL, 1), " +
					"(9, 2, 11, '2024-06-05', NULL, 3), " +
					"(11, 3, 1, '2024-03-15', '19:00:00', 3), " +
					"(14, 2, 13, '2024-05-20', NULL, 3), " +
					"(1, 3, 7, '2024-04-18', '20:00:00', 3), " +
					"(13, 3, 18, '2024-12-05', '19:45:00', 3), " +
					"(6, 1, 19, '2022-03-24', NULL, 1), " +
					"(8, 1, 10, '2022-02-25', NULL, 4), " +
					"(6, 2, 1, '2024-10-30', NULL, 1);";

			statement.executeUpdate(insertBookingSQL);
			String insertPaymentSQL = "INSERT INTO payment (booking_id, payment_type, payment_date, payment_time, payment_status) VALUES "
					+
					"(1, 1, '2024-01-01', '12:30:00', 'DENIED'), " +
					"(1, 3, '2024-01-03', '10:15:00', 'DENIED'), " +
					"(2, 1, '2024-01-04', '08:00:00', 'ACCEPTED'), " +
					"(3, 2, '2024-01-05', '16:30:00', 'DENIED'), " +
					"(4, 2, '2024-01-07', '11:45:00', 'ACCEPTED'), " +
					"(5, 3, '2024-01-08', '09:30:00', 'DENIED'), " +
					"(6, 3, '2024-01-09', '15:00:00', 'ACCEPTED'), " +
					"(7, 4, '2024-01-10', '12:00:00', 'DENIED'), " +
					"(8, 4, '2024-01-11', '10:45:00', 'ACCEPTED'), " +
					"(9, 1, '2024-01-12', '17:15:00', 'DENIED'), " +
					"(10, 1, '2024-01-13', '14:00:00', 'ACCEPTED'), " +
					"(11, 2, '2024-01-14', '08:30:00', 'DENIED'), " +
					"(12, 2, '2024-01-15', '11:00:00', 'ACCEPTED'), " +
					"(13, 3, '2024-01-16', '13:45:00', 'DENIED'), " +
					"(3, 1, '2024-01-17', '16:20:00', 'ACCEPTED'), " +
					"(13, 1, '2024-01-18', '10:00:00', 'ACCEPTED'), " +
					"(7, 1, '2024-01-19', '14:30:00', 'ACCEPTED'), " +
					"(15, 4, '2024-01-20', '12:45:00', 'DENIED')";
			statement.executeUpdate(insertPaymentSQL);
			String a = "ALTER TABLE paymenttype ADD CONSTRAINT unique_type_name UNIQUE (type_name);	";
			statement.executeUpdate(a);
			String b = "ALTER TABLE artists ADD CONSTRAINT unique_type_name UNIQUE (artist_name);	";
			statement.executeUpdate(b);

			String c = "ALTER TABLE sports ADD CONSTRAINT unique_type_name UNIQUE (sports_name);	";
			statement.executeUpdate(c);

			String d = "ALTER TABLE rating\r\n" + //
					"ADD CONSTRAINT unique_rating_combination UNIQUE (userid, artist_id, movie_id, game_id);";
			statement.executeUpdate(d);

			String e = "CREATE TABLE login AS SELECT u.username AS USERNAMES ,u.upassword  AS PASSWORDS FROM user u  UNION SELECT a.ausername,a.apassword FROM admin a;";
			statement.executeUpdate(e);
			System.out.println("Data inserted successfully!");

		} catch (SQLException e) {
			System.out.println("Error inserting data: " + e.getMessage());
		}
	}

}
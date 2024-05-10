const express = require('express');
const app = express();
const db = require('./database');
const cors = require('cors');

app.use(cors());


app.get('/allm', (req, res) => {
  db.query('SELECT * FROM movies;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});


app.get('/allc', (req, res) => {
  db.query('SELECT * FROM concerts;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/allg', (req, res) => {
  db.query('SELECT * FROM game;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});


app.get('/payment-type-revenue', (req, res) => {
  const query = `
    SELECT
      pt.type_name,
      ROUND(SUM(p.amount), 2) AS total_revenue
    FROM
      paymenttype pt
    JOIN
      payment p ON pt.payment_type = p.payment_type
    GROUP BY
      pt.type_name;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    const formattedResults = results.map(({ type_name, total_revenue }) => ({
      paymentType: type_name,
      totalRevenue: total_revenue,
    }));
    res.json(formattedResults);
  });
});

app.get('/payment-running-total', (req, res) => {
  const query = `
    SELECT
      payment_id, payment_date, amount, ROUND(SUM(amount) OVER (ORDER BY payment_date), 2) AS running_total
    FROM payment;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    const formattedResults = results.map(({ payment_id, payment_date, amount, running_total }) => ({
      paymentId: payment_id,
      paymentDate: payment_date,
      amount,
      runningTotal: running_total,
    }));

    res.json(formattedResults);
  });
});

app.get('/most-common-payment-type', (req, res) => {
  const query = `
    SELECT
      pt.type_name AS most_common_payment_type,
      COUNT(*) AS frequency
    FROM
      payment p
    INNER JOIN
      paymenttype pt ON p.payment_type = pt.payment_type
    GROUP BY
      pt.type_name
    ORDER BY
      frequency DESC
    LIMIT 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (results.length === 0) {
      res.json({ message: 'No payment type found.' });
      return;
    }

    const [{ most_common_payment_type, frequency }] = results;
    const formattedResult = {
      mostCommonPaymentType: most_common_payment_type,
      frequency,
    };

    res.json(formattedResult);
  });
});

app.get('/payment-status', (req, res) => {
  const query = `
    SELECT
      userid,
      FIRST_VALUE(payment_status) OVER (ORDER BY payment_date, payment_time) AS first_payment_status,
      LAST_VALUE(payment_status) OVER(ORDER BY payment_date, payment_time) AS last_payment_status
    FROM
      payment;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    const formattedResults = results.map(({ userid, first_payment_status, last_payment_status }) => ({
      userId: userid,
      firstPaymentStatus: first_payment_status,
      lastPaymentStatus: last_payment_status,
    }));

    res.json(formattedResults);
  });
});

app.get('/top-spender', (req, res) => {
  const query = `
    SELECT
      u.userid,
      u.uname,
      ROUND(SUM(b.amount), 2) AS total_spending
    FROM
      user u
    JOIN
      booking b ON u.userid = b.userid
    GROUP BY
      u.userid,
      u.uname
    ORDER BY
      total_spending DESC
    LIMIT 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (results.length === 0) {
      res.json({ message: 'No top spender found.' });
      return;
    }

    const [{ userid, uname, total_spending }] = results;
    const formattedResult = {
      userId: userid,
      userName: uname,
      totalSpending: total_spending,
    };

    res.json(formattedResult);
  });
});

app.get('/bookings', (req, res) => {
  db.query('SELECT booking_status, COUNT(*) AS status_count FROM booking GROUP BY booking_status;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/bookingm', (req, res) => {
  db.query('SELECT gender, COUNT(userid) AS user_count FROM user GROUP BY gender;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/bookinga', (req, res) => {
  const query = `
    SELECT
      gender,
      CASE
        WHEN age BETWEEN 0 AND 18 THEN '0-18'
        WHEN age BETWEEN 19 AND 35 THEN '19-35'
        WHEN age BETWEEN 36 AND 50 THEN '36-50'
        ELSE '51+'
      END AS age_group,
      COUNT(*) AS user_count
    FROM user
    GROUP BY gender, age_group WITH ROLLUP;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    const formattedResults = results.map(({ gender, age_group, user_count }) => ({
      gender: gender || 'Total',
      ageGroup: age_group || 'Total',
      userCount: user_count,
    }));

    res.json(formattedResults);
  });
});

app.get('/artistsc', (req, res) => {
  db.query('SELECT artist_id, artist_name, arating, ROUND(CUME_DIST() OVER (ORDER BY arating), 2) AS cumulative_distribution FROM artists;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/artistsp', (req, res) => {
  db.query('SELECT artist_id, artist_name, arating, ROUND(PERCENT_RANK() OVER (ORDER BY arating), 2) AS percentile_rank_arating FROM artists;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/concerts', (req, res) => {
  db.query('SELECT artist_id, concert_name, concert_date, LEAD(concert_date) OVER (PARTITION BY artist_id ORDER BY concert_date) AS next_concert_date, LAG(concert_date) OVER (PARTITION BY artist_id ORDER BY concert_date) AS previous_concert_date FROM concerts;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/concertsc', (req, res) => {
  db.query('SELECT u.uname, COUNT(DISTINCT c.concert_id) AS total_concerts_attended FROM user u INNER JOIN booking b ON u.userid = b.userid INNER JOIN concerts c ON b.venue_id = c.venue_id GROUP BY u.uname WITH ROLLUP;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/venueartistc', (req, res) => {
  db.query('SELECT venue_name, COUNT(concert_id) AS concert_count FROM venue JOIN concerts ON venue.venue_id = concerts.venue_id GROUP BY venue_name;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/venuegc', (req, res) => {
  db.query('SELECT venue_name, COUNT(game_id) AS game_count FROM venue JOIN game ON venue.venue_id = game.venue_id GROUP BY venue_name;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/venuemc', (req, res) => {
  db.query('SELECT venue_name, COUNT(movie_id) AS movie_count FROM venue JOIN movies ON venue.venue_id = movies.venue_id GROUP BY venue_name;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/venueb', (req, res) => {
  db.query('SELECT v.venue_name, ROUND(COALESCE(SUM(p.amount), 0), 2) AS total_booking_amount FROM venue v LEFT JOIN booking b ON v.venue_id = b.venue_id LEFT JOIN payment p ON b.booking_id = p.booking_id GROUP BY v.venue_name ORDER BY total_booking_amount DESC LIMIT 3;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/venueball', (req, res) => {
  db.query('SELECT v.venue_name, ROUND(COALESCE(SUM(p.amount), 0), 2) AS total_booking_amount FROM venue v LEFT JOIN booking b ON v.venue_id = b.venue_id LEFT JOIN payment p ON b.booking_id = p.booking_id GROUP BY v.venue_name ORDER BY total_booking_amount DESC;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/sportsrollup', (req, res) => {
  db.query('SELECT sports.sports_name, venue.venue_name, ROUND(AVG(game.grating), 2) AS total_average_grating FROM game JOIN sports ON game.sports_id = sports.sports_id JOIN venue ON game.venue_id = venue.venue_id GROUP BY sports.sports_name, venue.venue_name WITH ROLLUP;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/spo', (req, res) => {
  db.query('SELECT sports_name, COUNT(game_id) AS game_count FROM sports JOIN game ON sports.sports_id = game.sports_id GROUP BY sports_name;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/demo', (req, res) => {
  db.query('SELECT * FROM login', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/admins', (req, res) => {
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/movies', (req, res) => {
  db.query('SELECT m.movie_name, m.mrating FROM movies m ORDER BY m.mrating DESC LIMIT 10;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/moviesp', (req, res) => {
  db.query('SELECT movie_id, movie_name, mrating, ROUND(PERCENT_RANK() OVER (ORDER BY mrating), 2) AS percentile_rank_mrating FROM movies;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/moviesd', (req, res) => {
  db.query('SELECT genre, movie_name, release_date, DENSE_RANK() OVER (PARTITION BY genre ORDER BY release_date) AS release_rank FROM movies;', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/top-movies-by-genre', (req, res) => {
  const query = `
    SELECT genre, movie_name, director, mrating
    FROM (
      SELECT genre, movie_name, director, mrating, ROW_NUMBER() OVER (PARTITION BY genre ORDER BY mrating DESC) AS \`rank\`
      FROM movies
    ) AS ranked_movies
    WHERE \`rank\` = 1;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT userid FROM user WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

app.get('/a/:ausername', (req, res) => {
  const { ausername } = req.params;
  const query = 'SELECT adminid,roleid FROM admin WHERE ausername = ?';
  db.query(query, [ausername], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(results[0]);
  });
});

app.listen(3002, () => {
  console.log('Server started on port 3002');
});

const corsOptions = {
  origin: 'http://localhost:3001' 
};
app.use(cors(corsOptions));
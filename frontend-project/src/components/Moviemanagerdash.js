import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter } from 'recharts';
import { LineChart, Line } from 'recharts';

const MovieManagerDash = () => {
  const [movieData, setMovieData] = useState([]);
  const [movieWithPercentileData, setMovieWithPercentileData] = useState([]);
  const [topMoviesByGenre, setTopMoviesByGenre] = useState([]);
  const [movieReleaseRankData, setMovieReleaseRankData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieResponse = await axios.get('http://localhost:3002/movies');
        setMovieData(movieResponse.data);
        const movieWithPercentileResponse = await axios.get('http://localhost:3002/moviesp');
        setMovieWithPercentileData(movieWithPercentileResponse.data);
        const topMoviesResponse = await axios.get('http://localhost:3002/top-movies-by-genre');
        setTopMoviesByGenre(topMoviesResponse.data);
        const movieReleaseRankResponse = await axios.get('http://localhost:3002/moviesd');
        setMovieReleaseRankData(movieReleaseRankResponse.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const scatterPlotData = topMoviesByGenre.map(movie => ({ genre: movie.genre, mrating: movie.mrating }));

  return (
    <div>
      <h2>Movie Manager Dashboard</h2>
      <div>
        <h3>Bar Chart - Movie Ratings</h3>
        <BarChart width={800} height={400} data={movieData}>
          <XAxis dataKey="movie_name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="mrating" name="Rating" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h3>Line Chart - Movie Ratings and Percentile Rank</h3>
        <LineChart width={800} height={400} data={movieWithPercentileData}>
          <XAxis dataKey="movie_name" />
          <YAxis type="number" domain={[0, 1]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Movie-Percentile" dataKey="percentile_rank_mrating" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div>
        <h3>Scatter Plot - Movie Ratings by Genre</h3>
        <ScatterChart width={800} height={400}>
          <XAxis type="category" dataKey="genre" name="Genre" />
          <YAxis type="number" dataKey="mrating" name="Rating" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter data={scatterPlotData} name="Genre-Rating" fill="#8884d8" />
        </ScatterChart>
      </div>
      <div>
        <h3>Bar Chart - Movie Release Rank by Genre</h3>
        <BarChart width={800} height={400} data={movieReleaseRankData}>
          <XAxis dataKey="movie_name" />
          <YAxis type="number" dataKey="release_rank" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="release_rank" name="Release Rank" fill="#0000FF" />
        </BarChart>
      </div>
    </div>
  );
};

export default MovieManagerDash;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const VenueManagerDash = () => {
  // State to hold the data for the game count pie chart
  const [gameData, setGameData] = useState([]);

  // State to hold the data for the movie count pie chart
  const [movieData, setMovieData] = useState([]);

  // State to hold the data for the concert count pie chart
  const [venueData, setVenueData] = useState([]);

  // State to hold the data for the venue booking amount bar chart
  const [bookingData, setBookingData] = useState([]);

  // State to hold the data for the all venue booking amount bar chart
  const [allBookingData, setAllBookingData] = useState([]);

  useEffect(() => {
    // Fetch the data for the game count pie chart
    const fetchGameData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/venuegc');
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    // Fetch the data for the movie count pie chart
    const fetchMovieData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/venuemc');
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    // Fetch the data for the concert count pie chart
    const fetchVenueData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/venueartistc');
        setVenueData(response.data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };

    // Fetch the data for the venue booking amount bar chart
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/venueb');
        setBookingData(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    // Fetch the data for the all venue booking amount bar chart
    const fetchAllBookingData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/venueball');
        setAllBookingData(response.data);
      } catch (error) {
        console.error('Error fetching all booking data:', error);
      }
    };

    fetchGameData();
    fetchMovieData();
    fetchVenueData();
    fetchBookingData();
    fetchAllBookingData();
  }, []);

  // Define the colors for the pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB', '#E9967A', '#FFA07A', '#87CEEB', '#DDA0DD', '#B0C4DE'];

  return (
    <div>
      <h2>Venue Manager Dashboard</h2>
      <div>
        <h3>Pie Chart - Venue Game Count</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={gameData} dataKey="game_count" nameKey="venue_name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
              {gameData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Pie Chart - Venue Movie Count</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={movieData} dataKey="movie_count" nameKey="venue_name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
              {movieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Pie Chart - Venue Concert Count</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={venueData} dataKey="concert_count" nameKey="venue_name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
              {venueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Bar Chart - Top 3 Venue - Expenditure</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={bookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="venue_name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_booking_amount" name="Total Amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Bar Chart - All Venue Booking Amount</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={allBookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="venue_name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_booking_amount" name="Total Amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VenueManagerDash;
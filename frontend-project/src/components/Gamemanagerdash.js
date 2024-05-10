import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(-40deg, #a8b2c5, #8396b5, #607da5, #3d6495)',
    animation: 'gradientAnimation 10s ease-in-out infinite',
    WebkitAnimation: 'gradientAnimation 10s ease-in-out infinite',
    position: 'relative',
    overflow: 'hidden',
  },
  chartContainer: {
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 800,
    marginBottom: theme.spacing(4),
  },
  '@keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  '@-webkit-keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

const GameManagerDash = () => {
  const classes = useStyles();

  // State to hold the sports data for the radar chart
  const [sportsData, setSportsData] = useState([]);
  // State to hold the data for the pie chart
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    // Fetch the sports data for the radar chart
    const fetchSportsData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/sportsrollup');
        setSportsData(response.data);
      } catch (error) {
        console.error('Error fetching sports data:', error);
      }
    };

    // Fetch the data for the pie chart
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/spo');
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    // Call both the data fetching functions
    fetchSportsData();
    fetchPieChartData();
  }, []);

  // Transform the sports data into the format required for the radar chart
  const formattedData = sportsData.reduce((acc, item) => {
    const { sports_name, venue_name, total_average_grating } = item;
    // Create a new object for the sport if it doesn't exist in the acc object
    if (!acc[sports_name]) {
      acc[sports_name] = { subject: sports_name || 'Overall', Venue: venue_name || 'Overall', Rating: parseFloat(total_average_grating) };
    } else {
      // Add the venue-specific rating to the existing sport object
      acc[sports_name][venue_name || 'Overall'] = parseFloat(total_average_grating);
    }
    return acc;
  }, {});

  // Convert the formatted data to an array for the radar chart
  const radarData = Object.values(formattedData);

  // Define the colors for the pie chart
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB', '#E9967A', '#FFA07A', '#87CEEB', '#DDA0DD', '#B0C4DE'
  ];

  return (
    <div className={classes.root}>
      <div className={classes.chartContainer}>
        <h3>Radar Chart - Sports Average Ratings</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name="Rating" dataKey="Rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.chartContainer}>
        <h3>Pie Chart - Sports Game Count</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="game_count"
              nameKey="sports_name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GameManagerDash;
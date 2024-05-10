import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ArtistManagerDash = () => {
  const [cumulativeDistributionData, setCumulativeDistributionData] = useState([]);
  const [percentileRankData, setPercentileRankData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cumulativeDistributionResponse = await axios.get('http://localhost:3002/artistsc');
        setCumulativeDistributionData(cumulativeDistributionResponse.data);

        const percentileRankResponse = await axios.get('http://localhost:3002/artistsp');
        setPercentileRankData(percentileRankResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Artists Cumulative Distribution</h2>
      <LineChart width={800} height={400} data={cumulativeDistributionData}>
      <XAxis dataKey="artist_name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cumulative_distribution" stroke="#8884d8" />
      </LineChart>

      <h2>Artists Percentile Rank</h2>
      <LineChart width={800} height={400} data={percentileRankData}>
        <XAxis dataKey="artist_name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="percentile_rank_arating" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default ArtistManagerDash;
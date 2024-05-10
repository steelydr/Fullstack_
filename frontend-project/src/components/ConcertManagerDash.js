import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ReactCalendarHeatmap from 'react-calendar-heatmap';

const ConcertManagerDash = () => {
  const [concertData, setConcertData] = useState([]);
  const [concertsAttendedData, setConcertsAttendedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const concertsResponse = await axios.get('http://localhost:3002/concerts');
        const concertsAttendedResponse = await axios.get('http://localhost:3002/concertsc');
        console.log('Concert Data:', concertsResponse.data);
        console.log('Concerts Attended Data:', concertsAttendedResponse.data);
        setConcertData(concertsResponse.data);
        setConcertsAttendedData(concertsAttendedResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const pieChartData = concertsAttendedData.map((item) => ({
    name: item.uname || 'Total',
    value: item.total_concerts_attended,
  }));

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#green',];

  const formatConcertData = () => {
    const concertsByDate = {};

    concertData.forEach((concert) => {
      const concertDate = new Date(concert.concert_date);
      const year = concertDate.getFullYear();
      const month = concertDate.getMonth();
      const day = concertDate.getDate();
      const formattedDate = `${year}-${month + 1}-${day}`;

      if (concertsByDate[formattedDate]) {
        concertsByDate[formattedDate]++;
      } else {
        concertsByDate[formattedDate] = 1;
      }
    });

    return Object.entries(concertsByDate).map(([date, count]) => ({
      date: new Date(date),
      count,
    }));
  };

  const formattedConcertData = formatConcertData();

  return (
    <div>
      <h2>Concert Calendar Heatmap</h2>
      <div style={{ width: '100%', height: '100%' }}>
  <ReactCalendarHeatmap
    startDate={new Date('2024-01-01')}
    endDate={new Date('2025-12-31')}
    values={formattedConcertData}
    classForValue={(value) => {
      if (!value) {
        return 'color-empty';
      }
      return `color-scale-${value.count}`;
    }}
    showOutsideRange={false}
    showMonthLabels={true}
    horizontal={true}
    showWeekdayLabels={true}
  />
</div>

      <h2>Concerts Attended Pie Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <style>
        {`
          .react-calender-heatmap{
            height:350px;
          }
          .color-empty {
            fill: #eeeeee;
          }

          .color-scale-1 {
            fill: #d6e685;
          }

          .color-scale-2 {
            fill: #8cc665;
          }

          .color-scale-3 {
            fill: #44a340;
          }

          .color-scale-4 {
            fill: #1e6823;
          }
        `}
      </style>
    </div>
  );
};

export default ConcertManagerDash;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56','green','orange'];

const BookingManagerDash = () => {
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch existing data
        const ageGroupResponse = await axios.get('http://localhost:3002/bookinga');
        const ageGroupData = ageGroupResponse.data;
        const ageGroups = {};
        ageGroupData.forEach((entry) => {
          if (entry.ageGroup !== 'Total') {
            if (!ageGroups[entry.ageGroup]) {
              ageGroups[entry.ageGroup] = { Female: 0, Male: 0, Other: 0 };
            }
            if (entry.gender === 'Female') {
              ageGroups[entry.ageGroup].Female += entry.userCount;
            } else if (entry.gender === 'Male') {
              ageGroups[entry.ageGroup].Male += entry.userCount;
            } else {
              ageGroups[entry.ageGroup].Other += entry.userCount;
            }
          }
        });
        const ageGroupBarData = Object.entries(ageGroups).map(([name, values]) => ({
          name,
          value0: values.Female,
          value1: values.Male,
          value2: values.Other,
        }));
        setAgeGroupData(ageGroupBarData);

        const genderResponse = await axios.get('http://localhost:3002/bookingm');
        const pieData = genderResponse.data.map((entry) => ({ name: entry.gender, value: entry.user_count }));
        setPieChartData(pieData);

        const bookingStatusResponse = await axios.get('http://localhost:3002/bookings');
        setBookingStatusData(bookingStatusResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Booking Manager Dashboard</h2>
      <h3>Age Group</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={ageGroupData} layout="vertical" barSize={20}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value0" stackId="a" fill={COLORS[3]} name="Female" />
          <Bar dataKey="value1" stackId="a" fill={COLORS[1]} name="Male" />
          <Bar dataKey="value2" stackId="a" fill={COLORS[4]} name="Other" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Gender</h3>
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

      <h3>Booking Status</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={bookingStatusData}
            dataKey="status_count"
            nameKey="booking_status"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={120}
            fill="#8884d8"
          >
            {bookingStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingManagerDash;
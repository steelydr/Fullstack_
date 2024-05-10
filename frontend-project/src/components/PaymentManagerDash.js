import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';

const PaymentManagerDash = () => {
  const [paymentTypeRevenue, setPaymentTypeRevenue] = useState([]);
  const [paymentRunningTotal, setPaymentRunningTotal] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueResponse, totalResponse, statusResponse] = await Promise.all([
          fetch('http://localhost:3002/payment-type-revenue'),
          fetch('http://localhost:3002/payment-running-total'),
          fetch('http://localhost:3002/payment-status'),
        ]);

        const revenueData = await revenueResponse.json();
        const formattedRevenueData = revenueData.map(item => ({
          paymentType: item.paymentType,
          totalRevenue: parseFloat(item.totalRevenue),
        }));
        setPaymentTypeRevenue(formattedRevenueData);

        const totalData = await totalResponse.json();
        setPaymentRunningTotal(totalData);

        const statusData = await statusResponse.json();
        const deniedCountFirst = statusData.filter(item => item.firstPaymentStatus === 'DENIED').length;
        const deniedCountLast = statusData.filter(item => item.lastPaymentStatus === 'DENIED').length;
        const acceptedCountFirst = statusData.filter(item => item.firstPaymentStatus === 'ACCEPTED').length;
        const acceptedCountLast = statusData.filter(item => item.lastPaymentStatus === 'ACCEPTED').length;
        setPaymentStatus([
          { name: 'First Payment', deniedCount: deniedCountFirst, acceptedCount: acceptedCountFirst },
          { name: 'Last Payment', deniedCount: deniedCountLast, acceptedCount: acceptedCountLast },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#9966FF',
    '#4BC0C0',
    '#FF9F40',
    '#8A2BE2',
    '#00FF00',
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', textAlign: 'center', padding: '20px' }}>
      <h2>Payment Type Revenue</h2>
      <PieChart width={800} height={400} style={{ display: 'inline-block' }}>
        <Pie
          data={paymentTypeRevenue}
          dataKey="totalRevenue"
          nameKey="paymentType"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        >
          {paymentTypeRevenue.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h2>Cumulative Sum Chart</h2>
      <LineChart width={800} height={400} data={paymentRunningTotal} style={{ display: 'inline-block' }}>
        <XAxis dataKey="paymentDate" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="runningTotal" stroke="#8884d8" />
      </LineChart>

      <h2>Payment Status (DENIED)</h2>
      <BarChart width={800} height={400} data={paymentStatus} style={{ display: 'inline-block' }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="deniedCount" fill="#FF6384" />
      </BarChart>

      <h2>Payment Status (Accepted)</h2>
      <BarChart width={800} height={400} data={paymentStatus} style={{ display: 'inline-block' }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="acceptedCount" fill="#36A2EB" />
      </BarChart>
    </div>
  );
};

export default PaymentManagerDash;

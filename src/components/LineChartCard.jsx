import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const LineChartCard = ({ country = 'usa', startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const res = await axios.get(
          `https://disease.sh/v3/covid-19/historical/${country}?lastdays=1500`
        );
        const cases = res.data.timeline.cases;
        const deaths = res.data.timeline.deaths;
        const recovered = res.data.timeline.recovered;

        const formatted = Object.keys(cases).map(date => ({
          date: new Date(date).toISOString().slice(0, 10), 
          cases: cases[date],
          deaths: deaths[date],
          recovered: recovered[date]
        }));
        const filtered = formatted.filter(item =>
          (!startDate || item.date >= startDate) &&
          (!endDate || item.date <= endDate)
        );
        setData(filtered);

      } catch (error) {
        console.error("Error fetching COVID line chart data:", error);
      }
    };

    fetchCovidData();
  }, [country, startDate, endDate]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-md font-semibold mb-2">Cases Over Time</h2>
      <ResponsiveContainer width="100%" height={300} >
        <LineChart data={data} margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={50} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cases" stroke="#3b82f6" />
          <Line type="monotone" dataKey="recovered" stroke="#10b981" />
          <Line type="monotone" dataKey="deaths" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;
import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#a3a3a3'];

const PieChartCard = ({ country = 'usa' }) => {
  const [data, setData] = useState([]);
  const [population, setPopulation] = useState(0);

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const res = await axios.get(
          `https://disease.sh/v3/covid-19/countries/${country}`
        );
        const { cases, recovered, deaths, population } = res.data;

        const affected = cases + recovered + deaths;
        const remaining = Math.max(population - affected, 0);

        setPopulation(population.toLocaleString());

        setData([
          { name: 'Cases', value: cases },
          { name: 'Recovered', value: recovered },
          { name: 'Deaths', value: deaths },
          { name: 'Unaffected Population', value: remaining }
        ]);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchCurrentData();
  }, [country]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-semibold">COVID-19 vs Population</h2>
        <span className="text-xs text-gray-500">Total Population: {population}</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            fill="#8884d8"
            labelLine={false}

          >
            {data.map((entry, index) => (
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

export default PieChartCard;

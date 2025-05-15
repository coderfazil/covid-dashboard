import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import DateRangeFilter from './DateRangeFilter';
import StatCard from './StatCard';
import LineChartCard from './LineChartCard';
import PieChartCard from './PieChartCard';
import axios from 'axios';

const Dashboard = () => {

  const [stats, setStats] = useState({
  cases: 0,
  recovered: 0,
  deaths: 0,
  population: 0,
});
const [country, setCountry] = useState('usa');
useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
      setStats({
        cases: res.data.cases,
        recovered: res.data.recovered,
        deaths: res.data.deaths,
        population: res.data.population,
      });
    } catch (error) {
      console.error('Error fetching stat cards:', error);
    }
  };

  fetchStats();
}, [country]);
  
  const [startDate, setStartDate] = useState('2022-01-01');
const [endDate, setEndDate] = useState('2023-12-31');

const handleDateChange = (type, value) => {
  if (type === 'start') setStartDate(value);
  else setEndDate(value);
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">COVID-19 and Population Dashboard</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar onSelectCountry={setCountry} />
        <DateRangeFilter
  startDate={startDate}
  endDate={endDate}
  onDateChange={handleDateChange}
/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
  title="Total Cases"
  value={stats.cases.toLocaleString()}
  percent={((stats.cases / stats.population) * 100).toFixed(2)}
  bg="bg-blue-500"
/>

<StatCard
  title="Recoveries"
  value={stats.recovered.toLocaleString()}
  percent={((stats.recovered / stats.population) * 100).toFixed(2)}
  bg="bg-green-500"
/>

<StatCard
  title="Deaths"
  value={stats.deaths.toLocaleString()}
  percent={((stats.deaths / stats.population) * 100).toFixed(2)}
  bg="bg-red-500"
/>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChartCard country={country}  startDate={startDate} endDate={endDate} />
        <PieChartCard country={country} />
      </div>
    </div>
  );
};

export default Dashboard;
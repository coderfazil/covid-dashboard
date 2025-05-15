import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';

const SearchBar = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      const sorted = res.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(sorted);
      setFiltered(sorted);
    });
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setFiltered(countries.filter((country) =>
      country.name.common.toLowerCase().includes(val.toLowerCase())
    ));
    setShowDropdown(true);
  };

  const handleSelect = (country) => {
    setSearch(country.name.common);
    setShowDropdown(false);
    onSelectCountry(country.cca2.toLowerCase());
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          className="w-full outline-none text-sm"
          placeholder="Search country..."
          value={search}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(true)}
        />
        <IoIosArrowDown
          className="text-gray-400 ml-2 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>

      {showDropdown && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow max-h-60 overflow-y-auto">
          {filtered.slice(0, 10).map((country) => (
            <li
              key={country.cca2}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(country)}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
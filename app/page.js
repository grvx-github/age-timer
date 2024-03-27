"use client"

// App.js
import React, { useState } from 'react';
import Home from './home';
import DarkModeToggle from './components/darkModeBtn';


const App = () => {
  const [theme,setTheme] = useState("basic")

  // Function to handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };
  return (
    <div className='bg-white dark relative'>
    <DarkModeToggle/>

      {/* Dropdown button to select theme */}
      <div className="absolute top-0 right-0 m-4 z-20 dark:text-[#99b4aa]">
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
        >
          <option value="basic">Basic Timer</option>
          <option value="flip">Flip Clock</option>
          <option value="sand">Sand Clock</option>
          {/* Add more theme options as needed */}
        </select>
      </div> 
    <Home theme={theme}/>
    </div>
  );
}

export default App;

"use client"
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// Check if dark mode preference is stored in local storage
		const storedDarkMode = localStorage.getItem('darkMode');
		if (storedDarkMode) {
			setIsDarkMode(JSON.parse(storedDarkMode));
		} else {
			// Check user's preferred color scheme
			const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			setIsDarkMode(prefersDarkMode);
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		// Save the user's preference to localStorage
		localStorage.setItem('darkMode', !isDarkMode);
	};

	return (
		<button
			className="bg-gray-300 dark:bg-gray-800 rounded-full w-10 h-6 flex items-center justify-center z-10 p-1 mt-4 ms- absolute top-0 left-4"
			onClick={toggleDarkMode}
		>
			<div
				className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-[50%]' : 'translate-x-[-50%]'
					}`}
			></div>
		</button>
	);
};

export default DarkModeToggle;

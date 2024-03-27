import React, { useState, useEffect } from 'react';

const AgeDisplay = ({ dob }) => {
	const [age, setAge] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

	const calculateAge = () => {
		const now = new Date();
		const birthDate = new Date(dob);
		const diff = Math.ceil(now - birthDate) / 1000;
		const years = Math.floor(diff / (60 * 60 * 24 * 365));
		const months = Math.floor((diff % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
		const days = Math.floor((diff % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
		const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
		const minutes = Math.floor((diff % (60 * 60)) / 60);
		const seconds = Math.floor(diff % 60);
		setAge({ years, months, days, hours, minutes, seconds });
	};

	useEffect(() => {
		const timer = setInterval(calculateAge, 1000); // Changed timer interval to 1000 milliseconds (1 second)

		return () => clearInterval(timer);
	}, [dob]);

	const renderTimeUnit = (value, unit) => (
		<div className='w-36 flex flex-col items-center'>
			<h2 className='lg:text-8xl text-xl font-bold'>{value.toString().padStart(2, '0')}</h2>
			<h4 className='text-center'>{unit}</h4>
		</div>
	);

	return (
		<div className={`flex items-center justify-center w-full space-x-1 `}>
			{renderTimeUnit(age.years, 'YEARS')}
			<span className='lg:text-8xl text-xl font-bold align-middle px-1 relative top-[-1.2rem]'> :: </span>
			{renderTimeUnit(age.months, 'MONTHS')}
			<span className='lg:text-8xl text-xl font-bold align-middle px-1 relative top-[-1.2rem]'> :: </span>
			{renderTimeUnit(age.days, 'DAYS')}
			<span className='lg:text-8xl text-xl font-bold align-middle px-1 relative top-[-1.2rem]'> :: </span>
			{renderTimeUnit(age.hours, 'HOURS')}
			<span className='lg:text-8xl text-xl font-bold align-middle px-1 relative top-[-1.2rem]'> :: </span>
			{renderTimeUnit(age.minutes, 'MINUTES')}
			<span className='lg:text-8xl text-xl font-bold align-middle px-1 relative top-[-1.2rem]'> :: </span>
			{renderTimeUnit(age.seconds, 'SECONDS')}
		</div>
	);
};

export default AgeDisplay;

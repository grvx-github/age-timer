import React, { useState, useEffect } from 'react';
import AgeDisplay from './components/AgeDisplay';
import DateOfBirthInput from './components/DateOfBirth';
import TimeOfBirthInput from './components/TimeOfBirth';
import FlipClock from './components/FlipClock';

const Home = ({ theme }) => {
	const [dob, setDob] = useState('');
	const [showDateOfBirthInput, setShowDateOfBirthInput] = useState(true);
	const [timeOfBirth, setTimeOfBirth] = useState("");
	const [showTimeOfBirthInput, setShowTimeOfBirthInput] = useState(false);

	useEffect(() => {
		const savedDob = localStorage.getItem('dob');
		const savedTimeOfBirth = localStorage.getItem('timeOfBirth');

		if (savedDob) {
			console.log("saveddob")
			setDob(savedDob);
			setShowDateOfBirthInput(false);

			if (savedTimeOfBirth) {
				setTimeOfBirth(savedTimeOfBirth);
				setShowTimeOfBirthInput(false);
			} else {
				setShowTimeOfBirthInput(true);
			}
		}
	}, []);

	const handleDateOfBirthNext = () => {
		setShowDateOfBirthInput(false);
		setShowTimeOfBirthInput(true);
	};

	const handleTimeOfBirthNext = () => {
		setShowTimeOfBirthInput(false);
		localStorage.setItem('dob', dob);
		localStorage.setItem('timeOfBirth', timeOfBirth);
	};

	return (
		<div className='flex h-screen align-middle text-center bg-white dark:bg-[#040D12] dark:text-[#93B1A6] w-full'>
			{showDateOfBirthInput && <DateOfBirthInput dob={dob} setDob={setDob} onNext={handleDateOfBirthNext} />}
			{showTimeOfBirthInput && <TimeOfBirthInput timeOfBirth={timeOfBirth} setTimeOfBirth={setTimeOfBirth} onNext={handleTimeOfBirthNext} />}
			{theme === 'flip' ? (
				<FlipClock dob={dob} />
			) : (
				!showDateOfBirthInput && !showTimeOfBirthInput && <AgeDisplay dob={dob} />
			)}
		</div>
	);
};

export default Home;

import React, { useState, useEffect } from 'react'
import AgeDisplay from './components/AgeDisplay'
import DateOfBirthInput from './components/DateOfBirth'
import TimeOfBirthInput from './components/TimeOfBirth'
import FlipClock from './components/FlipClock'

const Home = ({ theme }) => {
	const [dob, setDob] = useState('')
	const [showDateOfBirthInput, setShowDateOfBirthInput] = useState(true)
	const [timeOfBirth, setTimeOfBirth] = useState("00:00")
	const [showTimeOfBirthInput, setShowTimeOfBirthInput] = useState(false)
	const [dobObject, setDobObject] = useState(null)

	useEffect(() => {
		const savedDob = localStorage.getItem('dob');
		const savedTimeOfBirth = localStorage.getItem('timeOfBirth')

		if (savedDob) {
			setDob(savedDob)
			setShowDateOfBirthInput(false)

			if (savedTimeOfBirth) {
				setTimeOfBirth(savedTimeOfBirth)
				setShowTimeOfBirthInput(false)
			} else {
				setShowTimeOfBirthInput(true)
			}
		}
	}, [])

	const handleDateOfBirthNext = () => {
		setShowDateOfBirthInput(false)
		setShowTimeOfBirthInput(true)
	};

	const handleTimeOfBirthNext = () => {
		setShowTimeOfBirthInput(false)
		setDobObject(convertToDateObject(dob, timeOfBirth))
		localStorage.setItem('dob', dob)
		localStorage.setItem('timeOfBirth', timeOfBirth)
	};

	const convertToDateObject = (dateString, timeString) => {
		// Parse date 
		const dateComponents = dateString.split("-")
		const year = parseInt(dateComponents[0], 10)
		const month = parseInt(dateComponents[1], 10) - 1 // Month is zero-based in JavaScript Date object
		const day = parseInt(dateComponents[2], 10)

		// Parse time string
		const timeComponents = timeString.split(":")
		const hours = parseInt(timeComponents[0], 10)
		const minutes = parseInt(timeComponents[1], 10)

		// Create Date object for the date
		const combinedDate = new Date(year, month, day)

		// Set time components for the combined Date object
		combinedDate.setHours(hours)
		combinedDate.setMinutes(minutes)
		console.log(combinedDate)
		return combinedDate
	}

	return (
		<div className='flex h-screen align-middle text-center bg-white dark:bg-[#040D12] dark:text-[#93B1A6] w-full'>
			{showDateOfBirthInput && <DateOfBirthInput dob={dob} setDob={setDob} onNext={handleDateOfBirthNext} />}
			{showTimeOfBirthInput && <TimeOfBirthInput timeOfBirth={timeOfBirth} setTimeOfBirth={setTimeOfBirth} onNext={handleTimeOfBirthNext} />}
			{theme === 'flip' ? (
				<FlipClock dob={dobObject} />
			) : (
				!showDateOfBirthInput && !showTimeOfBirthInput && <AgeDisplay dob={dobObject} />
			)}
		</div>
	);
};

export default Home;

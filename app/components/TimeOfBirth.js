import React, {useState} from 'react';


const TimeOfBirthInput = ({ onNext, timeOfBirth, setTimeOfBirth }) => {
	const handleNext = () => {
		onNext(timeOfBirth);
		console.log(onNext)
	};

	return (
		<div className='m-auto'>
			<div>
				<label htmlFor="birthTime">Enter your birth time (optional):</label>
				<input type="time" id="birthTime" value={timeOfBirth} onChange={(e) => setTimeOfBirth(e.target.value)} className='dark:bg-[#183D3D] ms-2 ps-1 justify-center rounded' />
			</div>
			<button className='mt-10 dark:bg-[#93B1A6] dark:text-[#232D3F] px-4 py-2 rounded' onClick={onNext}>Next</button>
		</div>
	);
};

export default TimeOfBirthInput
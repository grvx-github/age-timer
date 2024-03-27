const DateOfBirthInput = ({ dob, setDob, onNext }) => {
	return (
		<div className='m-auto'>
			<div>
				<label htmlFor="dob">Enter your date of birth:</label>
				<input className='dark:bg-[#183D3D] ms-2 ps-1 justify-center rounded' type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
			</div>
			<button className='mt-10 dark:bg-[#93B1A6] dark:text-[#232D3F] px-4 py-2 rounded' onClick={onNext}>Next</button>
		</div>
	);
};

export default DateOfBirthInput
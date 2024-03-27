import React, { useState, useEffect } from 'react';

const FlipClock = ({ dob }) => {
	const [time, setTime] = useState(new Date());
	const [age, setAge] = useState({
		years: [],
		months: [],
		days: [],
		hours: [],
		minutes: [],
		seconds: []
	});
	const [prevSeconds, setPrevSeconds] = useState(age.seconds); // Initialize with initial seconds
	const [currentSeconds, setCurrentSeconds] = useState(age.seconds); // Initialize with initial seconds

	// In the useEffect hook where you update the time state
	useEffect(() => {
		const timerID = setInterval(() => {
			const currentTime = new Date();
			const dateOfBirth = new Date(dob);
			const difference = currentTime.getTime() - dateOfBirth.getTime();

			// Update the age state
			setAge({
				years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
				months: Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)),
				days: Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((difference % (1000 * 60)) / 1000)
			});

			// Update prevSeconds to the current value of currentSeconds
			setPrevSeconds(currentSeconds);

			// Update currentSeconds to the new value
			setCurrentSeconds(Math.floor((difference % (1000 * 60)) / 1000));
		}, 1000);

		return () => {
			clearInterval(timerID);
		};
	}, []);

	// Compare prevSeconds and currentSeconds to determine which elements have changed
	const changedIndexes = prevSeconds.map((value, index) => (value !== currentSeconds[index] ? index : -1)).filter(index => index !== -1);

	useEffect(() => {
		// Check if seconds digit has changed
		const prevSeconds = age.seconds;
		setTimeout(() => {
			const secondsElement = document.getElementById('seconds');
			if (secondsElement) {
				const currentSeconds = age.seconds;
				const changedIndex = prevSeconds.findIndex((value, index) => value !== currentSeconds[index]);
				console.log(changedIndex)
				if (changedIndex !== -1) {
					const segment = secondsElement.querySelector(`.secondsTimeSegment_${changedIndex}`);
					if (segment) {
						segment.classList.add('flip');
						setTimeout(() => {
							segment.classList.remove('flip');
						}, 900);
					}
				}
			}
		}, 0);
	}, [age.seconds]);

	// useEffect(() => {
	// 	// Check if minutes digit has changed
	// 	if (prevMinutes !== minutes) {
	// 		// Trigger animation for minutes flip
	// 		const minutesElement = document.getElementById('minutes');
	// 		if (minutesElement) {
	// 			minutesElement.classList.add('flip');
	// 			setTimeout(() => {
	// 				minutesElement.classList.remove('flip');
	// 			}, 900);
	// 		}

	// 		setPrevMinutes(minutes);
	// 	}
	// }, [prevMinutes, minutes]);

	// useEffect(() => {
	// 	// Check if hours digit has changed
	// 	if (prevHours !== hours) {
	// 		// Trigger animation for hours flip
	// 		const hoursElement = document.getElementById('hours');
	// 		if (hoursElement) {
	// 			hoursElement.classList.add('flip');
	// 			setTimeout(() => {
	// 				hoursElement.classList.remove('flip');
	// 			}, 900);
	// 		}

	// 		setPrevHours(hours);
	// 	}
	// }, [prevHours, hours]);

	return (
		<div className='clockWrapper h-full grid grid-cols-3 gap-y-12 place-items-center'>
			<div className='timeSection' id='years'>
				<div className="timeGroup flex gap-4 text-center">
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.years[0]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.years[0]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.years[0]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.years[0]}
								</div>
							</div>
						</div>
					</div>
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.years[1]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.years[1]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.years[1]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.years[1]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='timeSection' id='months'>
				<div className="timeGroup flex gap-4 text-center">
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.months[0]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.months[0]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.months[0]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.months[0]}
								</div>
							</div>
						</div>
					</div>
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.months[1]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.months[1]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.months[1]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.months[1]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='timeSection' id='days'>
				<div className="timeGroup flex gap-4 text-center">
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.days[0]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.days[0]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.days[0]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.days[0]}
								</div>
							</div>
						</div>
					</div>
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.days[1]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.days[1]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.days[1]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.days[1]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='timeSection' id='hours'>
				<div className="timeGroup flex gap-4 text-center">
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.hours[0]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.hours[0]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.hours[0]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.hours[0]}
								</div>
							</div>
						</div>
					</div>
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.hours[1]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.hours[1]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.hours[1]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.hours[1]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='timeSection' id='minutes'>
				<div className="timeGroup flex gap-4 text-center">
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.minutes[0]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.minutes[0]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.minutes[0]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.minutes[0]}
								</div>
							</div>
						</div>
					</div>
					<div className="timeSegment text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.minutes[1]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.minutes[1]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.minutes[1]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.minutes[1]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='timeSection' id='seconds'>
				<div className="timeGroup flex gap-4 text-center">
					<div className="secondsTimeSegment_0 text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.seconds[0]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.seconds[0]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.seconds[0]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.seconds[0]}
								</div>
							</div>
						</div>
					</div>
					<div className="secondsTimeSegment_1 text-8xl font-black w-24">
						<div className="segmentDisplay relative h-full">
							<div className="segmentDisplay_top w-full h-1/2 overflow-hidden relative bg-slate-900 text-white leading-normal">
								{age.seconds[1]}
							</div>
							<div className="segmentDisplay_bottom w-full h-1/2 overflow-hidden relative bg-slate-800 text-white leading-[0]">
								{age.seconds[1]}
							</div>
							<div className="segmentOverlay absolute top-0 h-full w-24">
								<div className="segmentOverlay_top absolute overflow-hidden text-center w-full h-1/2 top-0 leading-normal bg-slate-900 text-white">
									{age.seconds[1]}
								</div>
								<div className="segmentOverlay_bottom absolute overflow-hidden text-center w-full h-1/2 bottom-0 leading-[0] text-white bg-slate-800 border-t-2 border-transparent">
									{age.seconds[1]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default FlipClock
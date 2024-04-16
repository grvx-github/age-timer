import React, { useState, useEffect } from 'react';

const FlipClock = ({ dob }) => {
	const [time, setTime] = useState(new Date());
	const [prevTime, setPrevTime] = useState(null)
	const [age, setAge] = useState({
		years: [],
		months: [],
		days: [],
		hours: [],
		minutes: [],
		seconds: []
	});

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);

		return () => {
			clearInterval(timerID);
		};
	}, []);

	const tick = () => {
		setTime(new Date());
		updateAge();
	};

	const calculateDifference = () => {
		const currentTime = new Date();
		const dateOfBirth = dob
		const difference = currentTime.getTime() - dateOfBirth.getTime();
		return difference;
	};

	const updateAge = () => {
		const difference = calculateDifference();
		const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
		const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		setAge({
			years: splitter(years),
			months: splitter(months),
			days: splitter(days),
			hours: splitter(hours),
			minutes: splitter(minutes),
			seconds: splitter(seconds)
		});
	};

	const splitter = (num) => {
		const numString = num.toString().padStart(2, '0');
		return numString.split('').map(Number);
	};

	useEffect(() => {
		// Check if seconds digit has changed
		const prevSeconds = age.seconds;
		setTimeout(() => {
			const secondsElement = document.getElementById('seconds');
			if (secondsElement) {
				const currentSeconds = age.seconds;
				const changedIndex = prevSeconds.findIndex((value, index) => value !== currentSeconds[index]);
				if (changedIndex !== -1) {
					const segment = secondsElement.querySelector(`.segmentDisplay_${changedIndex}`);
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


	return (
		<div className='clockWrapper h-3/4 m-auto w-3/4 grid grid-cols-3 gap-y-12 place-items-center'>
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
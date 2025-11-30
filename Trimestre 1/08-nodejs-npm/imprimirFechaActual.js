import chalk from 'chalk';
import { DateTime } from 'luxon';

const DATE_FORMAT = 'dd-LL-yyyy';
const TIME_FORMAT = 'HH:mm:ss';

let previousLength = 0;

const renderClock = () => {
	const now = DateTime.now();
	const datePart = now.toFormat(DATE_FORMAT);
	const timePart = now.toFormat(TIME_FORMAT);
	const seconds = now.second;

	const coloredTime = seconds % 10 === 0 ? chalk.green(timePart) : timePart;
	const output = `${datePart} ${coloredTime}`;

	const plainLength = `${datePart} ${timePart}`.length; 
	const padding = Math.max(0, previousLength - plainLength);
	process.stdout.write(`\r${output}${' '.repeat(padding)}`);
	previousLength = plainLength;
};

console.log('Fecha actual');
renderClock();
setInterval(renderClock, 1000);


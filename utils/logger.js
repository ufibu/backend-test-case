const chalk = require("chalk");

module.exports = class Logger {
	static log (content, type = "info") {
		switch (type) {
		// Check the message type and then print him in the console
		case "info": {
			return console.log(`${chalk.hex('#000000').bgHex('#00FF00')(` | INFO        ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#00FF00')(content)}`);
		}
		case "warn": {
			return console.log(`${chalk.hex('#000000').bgHex('#ffa500')(` | WARNING     ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#ffa500')(content)}`);
		}
		case "error": {
			return console.log(`${chalk.hex('#000000').bgHex('#FF0000')(` | ERROR       ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#FF0000')(content)}`);
		}
		case "debug": {
			return console.log(`${chalk.hex('#000000').bgHex('#00FFFF')(` | DEBUG       ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#00FFFF')(content)}`);
		}
		case "int": {
			return console.log(`${chalk.hex('#000000').bgHex('#800080')(` | INTERACTION ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#800080')(content)}`);
		}
		case "cmd": {
			return console.log(`${chalk.hex('#000000').bgHex('#FF00FF')(` | MESSAGE     ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#FF00FF')(content)}`);
		}
		case "event": {
			return console.log(`${chalk.hex('#000000').bgHex('#808000')(` | EVENTS      ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#808000')(content)}`);
		}
		case "music": {
			return console.log(`${chalk.hex('#000000').bgHex('#008000')(` | MUSIC       ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#008000')(content)}`);
		}
		case "ready": {
			return console.log(`${chalk.hex('#000000').bgHex('#0000FF')(` | READY       ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#0000FF')(content)}`);
		}
		case "util": {
			return console.log(`${chalk.hex('#000000').bgHex('#800000')(` | UTILS       ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#800000')(content)}`);
		}
		case "handlers": {
			return console.log(`${chalk.hex('#000000').bgHex('#C0C0C0')(` | HANDLERS    ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#C0C0C0')(content)}`);
		}
		case "helper": {
			return console.log(`${chalk.hex('#000000').bgHex('#008080')(` | HELPERS     ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#008080')(content)}`);
		}
		case "mongo": {
			return console.log(`${chalk.hex('#000000').bgHex('#FFFF00')(` | MONGODB     ${chalk.hex('#000000').bgHex('#808080')(`[${msFormatShort()}]`)} `)} ${chalk.hex('#FFFF00')(content)}`);
		}
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
		}
	}
};

function msFormatShort(date = Date.now()) {
	const options = {
		year: 'numeric', month: 'numeric', day: 'numeric',
		hour: 'numeric', minute: 'numeric', second: 'numeric',
		hour12: false
	};
	const dateFormat = new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
	return dateFormat.replaceAll("/", "-").replace(",", "");
};
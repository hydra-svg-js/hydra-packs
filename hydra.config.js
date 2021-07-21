const fs = require("fs");
const generate = require("hydra-svg-js/generate");
const colors = require('chalk');

const packs = fs.readdirSync('src/packs', {withFileTypes: true})
	.filter(items => items.isDirectory())
	.map(dir => `src/packs/${dir.name}`);

console.log(colors.red(`\n\tIt has begun...\n`))

let startTime, endTime, doneTime;

packs.forEach(pack => {
	generate(pack, pack.replace('src', 'dist'), {
		hook: {
			folder: ({name}) => {
				startTime = process.hrtime.bigint()
				console.log(colors.blue(`\tGenerating: ${name}`));
			},
			object: ({count, total}) => {
				process.stdout.clearLine(0);
				process.stdout.cursorTo(0)
				process.stdout.write(colors.yellow(`\tObjects Generated: ${count} of ${total}`));
				if (count === total) {
					process.stdout.write("\n");
				}
			},
			file: ({name}) => {
				endTime = process.hrtime.bigint()
				doneTime = (Number(endTime - startTime) / 1000000000).toFixed(2)
				console.log(colors.green(`\tGenerated: ${name} in ${doneTime}s \n`));
			}
		}
	});
})

console.log(colors.red(`\t...and we're done.\n`))
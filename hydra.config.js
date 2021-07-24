const fs = require("fs");
const generate = require("hydra-svg-js/generate");

const packs = fs.readdirSync('src/packs', {withFileTypes: true})
	.filter(items => items.isDirectory())
	.map(dir => `src/packs/${dir.name}`);

console.log(`\n\t\x1b[31mIt has begun...\x1b[0m\n`)

let startTime, endTime, doneTime;

packs.forEach(pack => {
	generate(pack, pack.replace('src', 'dist'), {
		hook: {
			folder: ({name}) => {
				startTime = process.hrtime.bigint()
				console.log(`\t\x1b[34mGenerating: ${name}\x1b[0m`);
			},
			object: ({count, total}) => {
				process.stdout.clearLine(0);
				process.stdout.cursorTo(0)
				process.stdout.write(`\t\x1b[33mObjects Generated: ${count} of ${total}\x1b[0m`);
				if (count === total) {
					process.stdout.write("\n");
				}
			},
			file: ({name}) => {
				endTime = process.hrtime.bigint()
				doneTime = (Number(endTime - startTime) / 1000000000).toFixed(2)
				console.log(`\t\x1b[32mGenerated: ${name} in ${doneTime}s \x1b[0m\n`);
			}
		}
	});
})

console.log(`\t\x1b[31m...and we're done.\x1b[0m\n`)

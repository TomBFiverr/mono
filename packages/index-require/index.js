const {
	existsSync,
	lstatSync,
	readdirSync,
} = require('fs');
const {resolve} = require('path');

const dir = name => existsSync(name) && lstatSync(name).isDirectory();
const modules = dirname => readdirSync(dirname)
	.filter(
		item => dir(
			resolve(
				dirname,
				item
			)
		)
	);

module.exports = (dirname, pattern = name => `./${name}`) => modules(dirname)
	.reduce(
		(accumulator, name) => Object.assign(
			accumulator,
			{
				[name]: require(
					resolve(
						dirname,
						pattern(name)
					)
				),
			}
		),
		{}
	);

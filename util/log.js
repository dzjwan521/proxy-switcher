const chalk = require('chalk');

module.exports = {
	success:(text, string)=>{
		string = string ? chalk.green(string) : ''
		console.log(chalk.green(text), string);
	},
	warning:(text, string)=>{
		string = string ? chalk.yellow(string) : ''

		console.log(chalk.yellow(text),string);
	},
	err:(text, string)=>{
		string = string ? chalk.red(string) : ''
		console.log(chalk.red(text),string);
	}
}
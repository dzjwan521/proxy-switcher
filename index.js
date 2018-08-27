#!/usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec
const os = require('os');
const inquirer = require('inquirer')
const {success,warning,err} = require('./util/log');
const { readFile, appendFile, writeFile } = require('./util/fileHandle');
const fullText = require('./util/fullText');
const deleteProxy = require('./util/deleteProxy');
const bash_profile=os.homedir()+'/.bash_profile'
let conf = require('./conf')
const path = require('path');
const package = require('./package')
var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
const test = __dirname + '/test.txt'
const fs = require('fs');



program
	.version(package.version,'-v, --version')
  	.option('-l, --list', '从配置文件列出已存储的列表')
  	.option('-y, --yes', '默认回复yes')
  
//清除所有代理
program
	.command('clean')
	.description('清除代理')
	.action(function () {
		readFile(bash_profile, data => {
			var str = deleteProxy(data)
			writeFile(bash_profile,str, ()=>{
				exec('source ' + bash_profile, function (err,stdout,stderr) { 
					if (err) throw err;
					if (stderr) throw stderr;
					success('代理清除成功...');
				 })
			  })
		})

	})

//初始化或生成默认代理  
program
	.command('init')
	.description('初始化')
	.action(function () {
		
		readFile(bash_profile, data => {
			var str = deleteProxy(data)
			writeFile(bash_profile, str, () => {
					success('代理清除...');
				
					inquirer.prompt([{
						type: 'confirm',
						name: 'confirm',
						message: '是否生成默认代理127.0.0.1:1087（使用shawdowsocks的可以直接翻墙）',
						default: true
					}]).then((answers) => {
						if (answers.confirm) {

							appendFile(bash_profile, fullText(conf.defaultProxy), () => {
								exec('source ' + bash_profile, function (err, stdout, stderr) {
									if (err) throw err;
									if (stderr) throw stderr;
									success('成功写入默认代理...')	
								})
		
							})
						} else {
							warning('取消设置')
						}
					})
			})
		})
		
	});		
		
//设置代理
program
.command('add [url]')
.description('设置url为代理,并存储到配置文件')
.action(function(url){
	
	if (url) {

		readFile(path.resolve(__dirname, './conf.json'), function (data) {
			let data2 = JSON.parse(data)
			data2.list.push(url)
			writeFile(path.resolve(__dirname, './conf.json'), JSON.stringify(data2))
		})

		readFile(bash_profile, data => {
			var str = deleteProxy(data)
			writeFile(bash_profile, str, () => {
				success('代理清除成功...');
				appendFile(bash_profile, fullText(url), () => {
					exec('source ' + bash_profile, function (err, stdout, stderr) {
						if (err) throw err;
						if (stderr) throw stderr;
						success('成功写入代理 %s',url)
						//console.log('rmdir %s', oDir);
					})
				})
				
			})
		})
	} else if (program.list) {
		warning('选中你想要设置的代理')

	} else{
		err('缺少参数，使用proxys --help查看帮助')
	}
	// success('成功设置 "%s" 为当前代理', url)
});

//删除代理
program
.command('rm [url]')
.description('设置url为代理')
	.action(function (url){
	if (url) {
		readFile(path.resolve(__dirname, './conf.json'), function (data) {
			let data2 = JSON.parse(data),
			i = data2.list.indexOf(url)
			if (i !== -1) data2.list.splice(i, 1)
			writeFile(path.resolve(__dirname, './conf.json'), JSON.stringify(data2))
			success('删除成功 %s', url)
		})
	} else if (program.list){
		warning('选中你想要删除的代理')
	} else{
		err('缺少参数，使用proxys --help查看帮助')
	}

	
	
});


program.parse(process.argv);
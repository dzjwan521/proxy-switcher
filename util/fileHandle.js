const fs =require('fs');

module.exports={
	readFile:(filePath,cb)=>{
		fs.readFile(filePath, 'utf-8',function (err, data) {
			
			if (err) throw err;
			cb && cb(data);
		});
	},
	writeFile:(filePath,data,cb)=>{
		fs.writeFile(filePath,data, 'utf-8',function (err, data) {	
			if (err) throw err;
		  	cb && cb(data);
		});
	},
	appendFile:(filename,data,cb)=>{
		fs.appendFile(filename, data,'utf-8', function (err) {
			if (err) throw err;	
			cb && cb();

		});
	},

	
	

		
}
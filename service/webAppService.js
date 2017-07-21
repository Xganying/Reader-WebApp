// webAppService.js 

var fs = require('fs');

exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content;
}

exports.get_chapter_data = function(){
	var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
	return content;
}

// content detail 
exports.get_chapter_content_data = function(id){
	if(!id){
		id ="1";
	}
	var content = fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
	return content;
}

// book
exports.get_book_data = function(id){
	if(!id){
		id ="18218";
	}
	if(fs.existsSync('./mock/book/' + id + '.json')){
		return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
	}else{
		return fs.readFileSync('./mock/book/18218.json' , 'utf-8');
	}
}

// index
exports.get_index_data = function(){
	var content = fs.readFileSync('./mock/home.json', 'utf-8');
	return content;
}

// rank
exports.get_rank_data = function(){
	var content = fs.readFileSync('./mock/rank.json', 'utf-8');
	return content;
}

//category
exports.get_category_data = function(){
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content;
}

//female
exports.get_female_data = function(){
	var content = fs.readFileSync('./mock//channel/female.json', 'utf-8');
	return content;
}

// male
exports.get_male_data = function(){
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
}

// time limit free
exports.get_free_data = function(){
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
}


//search
exports.get_search_data = function(start, end, keyword){
	return function(cb){
		var http = require('http');
		var qs = require('querystring');
		var data = {
			s: keyword,
			start: start,
			end: end
		};
		var content = qs.stringify(data);
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?' + content,
			method:'GET'
		};
		req_obj = http.request(http_request, function(_res){
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data', function(chunk){
				content += chunk;
			});
			_res.on('end', function(){
				cb(null, content);
			});
		});
		req_obj.on('error', function(){

		});
	}
}
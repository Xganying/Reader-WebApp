// app.js

var koa = require('koa');
var controller = require('koa-route');
var views = require('co-views');
var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
var querystring = require('querystring');

var app = new  koa();

var render = views('./view', {
	map: { html : 'ejs' }
});

app.use(koa_static({
	rootDir : './static/',
	rootPath: '/static/',
	maxage: 0
}));

// test  example
app.use(controller.get('/route_test', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = "hello koa !";
}));

app.use(controller.get('/ejs_test', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('test', {title:'title_test'});
}));

app.use(controller.get('/api_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data();
}));

// route design page
// index page
app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('index', {title:'Reader Index Page'});
}));

// book  detail page
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId =  params.id;
	this.body = yield render('book', {bookId: bookId});
}));

//  search page
app.use(controller.get('/search',  function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('search', {title:'Search Page'});
}));

//  rank page
app.use(controller.get('/rank',  function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('rank', {title:'Rank Page'});
}));

//  category page
app.use(controller.get('/category',  function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('category', {title:'Category Page'});
}));

//  female page
app.use(controller.get('/female',  function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('female', {title:'Female Page'});
}));

//  male page
app.use(controller.get('/male',  function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = yield render('male', {title:'Male Page'});
}));


// ajax get detail date 
// book
app.use(controller.get('/ajax/book', function*(){
	this.set ('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if( !id){
		id = "";
	}
	this.body = service.get_book_data(id);
}));

// index
app.use(controller.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = service.get_index_data();
}));

// rank
app.use(controller.get('/ajax/rank', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = service.get_rank_data();
}));

// category
app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = service.get_category_data();
}));

// female
app.use(controller.get('/ajax/female', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = service.get_female_data();
}));

// male
app.use(controller.get('/ajax/male', function*(){
	this.set('Cache-Control', 'no-cache'); 
	this.body = service.get_male_data();
}));

// search
app.use(controller.get('/ajax/search', function*(){
	this.set('Cache-Control', 'no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start, end, keyword);
}));


app.listen(3001);
console.log("Koa server is start , listen port 3001....");


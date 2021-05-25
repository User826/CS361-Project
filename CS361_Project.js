var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'movieReception'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8264);


var session = require('express-session');

app.use(session({secret:'SuperSecretPassword'}));

var credentials = require('./credentials.js');



app.get('/movie-category',function(req,res){
  var output={};
  output.out=req.query.input;	
  

  res.render('movie-category', {layout: 'movieCategory'});
});


app.get('/past-searches',function(req,res){
  var output={};
  output.out=req.query.input;	
  

  res.render('past-searches', {layout: 'pastSearches'});
});

app.post('/past-searches', function(req,res){
  var posting={};
  posting.post_url=req.query;
  
  posting.url_parameter_values=[];
  
  for (var more_stuff in posting.post_url){
    posting.url_parameter_values.push({"pms":more_stuff,"vals":posting.post_url[more_stuff]})
    console.log(more_stuff)
  }
  var table={};

  table.url_info=posting.url_parameter_values


 
  posting.post=req.body;
  posting.parameter_values=[];
  // console.log("test")
  // console.log(req.body.text)

  const fs = require('fs')

  const content = req.body.text

  fs.writeFile('pleaseWork.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
  

  for (var stuff in posting.post){
    posting.parameter_values.push({"pm":stuff,"val":posting.post[stuff]})
  }
  
  table.out=posting.parameter_values

  res.render('past-searches',table);

});

app.get('/download',function(req,res){
  var output={};
  output.out=req.query.input;	
  res.download('./pleaseWork.txt');
});

app.get('/wiki', function(req,res){
  console.log("Please work!");
  res.render('toDo', {layout: 'movieCategory'});
});




app.get('/other-page',function(req,res){
  var output={};
  output.out=req.query.input;	
  res.render('other-page', output);
});

app.get('/get-page', function(req,res){
  var getting={}; 
  getting.got=req.query;
  getting.parameter_values=[];
  for (var stuff in getting.got){
    getting.parameter_values.push({"pm":stuff,"val":getting.got[stuff]})
  }
  var table={};
  table.info=getting.parameter_values
  res.render('get-page',table);
});

app.post('/post-page', function(req,res){
  var posting={};
  posting.post_url=req.query;
  posting.url_parameter_values=[];
  
  for (var more_stuff in posting.post_url){
    posting.url_parameter_values.push({"pms":more_stuff,"vals":posting.post_url[more_stuff]})
    console.log(more_stuff)
  }
  var table={};

  table.url_info=posting.url_parameter_values


 
  posting.post=req.body;
  posting.parameter_values=[];

  console.log(req.body.text)
  for (var stuff in posting.post){
    posting.parameter_values.push({"pm":stuff,"val":posting.post[stuff]})
  }
  
  table.info=posting.parameter_values

  res.render('post-page',table);

});



app.get('/',function(req,res,next){
  var context = {};
  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }
});

app.post('/',function(req,res, next){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
    context.name = req.session.name;
          context.toDo = req.session.toDo;
          context.toDoCount = req.session.toDo.length
          console.log("The length is "+context.toDoCount)
          console.log(context.toDo);
          console.log("Hey");
          res.render('toDo',context);
          console.log("New List");
          return;
    
  }

  //If there is no session, go to the main page.
if(!req.session.name){
    res.render('newSession', context);
    return;
  }
if(req.body['Add Item']){
   // req.session.toDo.push({"name":req.body.name, "city":req.body.city, "minTemp":req.body.minTemp, "id":req.session.curId});
    req.session.curId++;
    
    request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + ',us' + '&APPID=' + credentials.owmKey, function(err, response, body){
      if(!err && response.statusCode < 400){
        console.log(body)
        
        var test=JSON.parse(body)
        console.log(test.main.temp)
        var temp=(test.main.temp-273.15)*(9/5)+32

        console.log(temp)
        console.log(typeof req.body.city)
        if (temp>=req.body.minTemp){
          req.session.toDo.push({"name":req.body.name, "city":req.body.city, "minTemp":req.body.minTemp, "canDo":true, "id":req.session.curId});
          context.weatherPass="Task can be done in "+req.body.city
          console.log(context.weatherPass)
          console.log("No new list");
          context.toDoCount = req.session.toDo.length
          res.render('toDo',context);
          return;
        }
        else{         
          req.session.toDo.push({"name":req.body.name, "city":req.body.city, "minTemp":req.body.minTemp, "canDo":false, "id":req.session.curId});
          context.weatherPass="Task can not be done in "+req.body.city
          context.toDoCount = req.session.toDo.length
          res.render('toDo',context);
          return;
        }
        context.owm = body;
      } else {
          console.log(err);
          if(response){
            console.log(response.statusCode);
           }
          next(err);
        }
      });
   }
  
if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }
 context.name = req.session.name;
          context.toDo = req.session.toDo;
 //         context.toDoCount = req.session.toDo.length
          console.log("The length is "+context.toDoCount)
          console.log(context.toDo);
          console.log(context.weatherPass);
          console.log("Hey");
//          res.render('toDo',context);
          return;
});


app.get('/count',function(req,res){
  var context = {};
  context.count = req.session.count || 0;
  req.session.count = context.count + 1;
  res.render('counter', context);
});
        


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

var express = require('express');
var hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:\n protocol:${req.protocol}\n para:${req.param}\n path:${req.path} \n hostname:${req.hostname} \n ip:${req.ip}${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
next();
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();

});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// app.use(express.static(__dirname+'/public'));
// app.get('/public',function (req, res) {
//     res.send('./public')});
// app.use(express.static(__dirname, '/public'));
// app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname+'/views'));
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'home Page',
        welcomeMsg: 'Welcome to myWebsite',
        currentYear: new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'Welcome to About page',
        currentYear: new Date().getFullYear()
    });
});
app.get('/intro',(req,res)=>{
    res.send('Hello World. My name is pawan.');
});
app.get('/course',(req,res)=>{
    res.send('I am pursuing BSc IT');
});
app.get('/Grades',(req,res)=>{
    var grade={
        "CAP219": "A",
        "CAP123": "O",
        "MTH123": "O"
    }
    res.send(grade);
});
app.get('/marks',(req,res)=>{
    
        var mark={
            "CAP219": 78,
            "CAP123": 95,
            "MTH123": 99
        }
    res.send("marks are: CAP123: ",mark.CAP123,"CAP219 :",mark.CAP219,"MTH123 :",mark.MTH123);
});
app.get('/att',(req,res)=>{
    var attendence={
        "CAP219": "90%",
        "CAP123": "75%",
        "MTH123": "89%"
    }

    res.send(attendence);
});
app.listen(3000,() => {console.log('server started at port 3000')});
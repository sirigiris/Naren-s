const express = require('express');

const fs=require('fs');

const app=express();


const hbs=require('hbs');

hbs.registerPartials(__dirname+'/views/partials');
//how to use handlebars to create dynamic pages
app.set('view engine','hbs');


app.use((req,res,next) =>{
    res.render('maintenance.hbs');
});


//takes middleware funtion
app.use(express.static(__dirname +'/public'))

app.use((req, res, next)=>{
    var now= new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+ '\n',(err)=>
    {
        if(err){
            console.log('unable to append to server.log');
        }

    });
    next();
});



hbs.registerHelper('getCurrentYear',()=>
{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

//handler for http request
app.get('/', (req, res) =>{
//res.send('<h1>Jai Hanuman</h1>');
/*res.send({
    name: 'Naren',
    likes: ['workout', 'movies']
*/
res.render('home.hbs',{
        pagetitle: 'Home Page',
        welcommessage: `Welcome to Naren's website`

    });
});

app.get('/about',(req,res)=>{
    //res.send('About Page');
    res.render('about.hbs',{
        pagetitle: 'About Page'  
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000'); 
});
var express = require('express'),
    app     = express();

var todoRoutes = require('./routes/todos');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));


app.get("/", (req,res)=>{
    res.sendFile('index.html')
});

app.use('/api/todos', todoRoutes);








app.listen(process.env.PORT || 3000, () =>{
    console.log("On port 3000");
});
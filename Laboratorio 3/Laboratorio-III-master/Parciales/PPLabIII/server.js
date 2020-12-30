var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

var Autos = [{
  "car_make": "Dodge",
  "model_year": 2009,
  "color": "Gris",
  //"price": "$341540.45",
  //"car_model": "Challenger"
}, {
  "car_make": "BMW",
  "model_year": 1993,
  "color": "Blanco",
  //"price": "$183742.19",
  //"car_model": "3 Series"
}, {
  "car_make": "Audi",
  "model_year": 2001,
  "color": "Negro",
  //"price": "$374552.61",
  //"car_model": "Allroad"
}, {
  "car_make": "Mazda",
  "model_year": 1999,
  "color": "Amarillo",
  //"price": "$154877.73",
  //"car_model": "Miata MX-5"
}, {
  "car_make": "Chevrolet",
  "model_year": 2007,
  "color": "Rojo",
 // "price": "$374030.84",
 // "car_model": "Silverado 2500"
}, {
  "car_make": "Ford",
  "model_year": 1996,
  "color": "Rojo",
  //"price": "$307586.59",
  //"car_model": "Bronco"
}, {
  "car_make": "Chevrolet",
  "model_year": 2003,
  "color": "Azul",
  //"price": "$208428.11",
  //"car_model": "Blazer"
}, {
  "car_make": "Pontiac",
  "model_year": 1986,
  "color": "Azul",
  //"price": "$358029.74",
  //"car_model": "6000"
}, {
  "car_make": "Isuzu",
  "model_year": 1993,
  "color": "Negro",
  //"price": "$438921.72",
  //"car_model": "Amigo"
}, {
  "car_make": "Toyota",
  "model_year": 1998,
  "color": "Amarillo",
  //"price": "$198692.22",
  //"car_model": "Camry"
}];

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/agregar', function (req, res) {
		var car_make =req.body.car_make;
	var model_year = req.body.model_year;
  setTimeout(function(){
    var nuevaAuto = {};

	
    nuevaAuto.car_make = car_make ;
    nuevaAuto.model_year = req.body.model_year ;
	nuevaAuto.color = req.body.color ;
//	nuevaAuto.price = req.body.price ;
//	nuevaAuto.car_model = car_model ;
    Autos.push(nuevaAuto); 
    
    res.send({result:'ok',desc:'Alta exitosa ' + car_make + ' ' + req.body.model_year});  	
    },2000);

  
});


app.post('/eliminar', function (req, res) {
    var indice=req.body.indice;
        Autos.splice(indice, 1);   
    

    res.send({result:'ok',desc:'Baja exitosa'});    
});

app.post('/modificar', function (req, res) {
    var indice=req.body.indice;

    var auto = req.body.auto;   

    Autos[indice]= JSON.parse(auto);  
    
    res.send({result:'ok',desc:'Modificacion exitosa'});    
});

app.get('/traerAutos', function (req, res) {
    
    res.send(JSON.stringify(Autos));    
});

app.get('/traerAuto', function (req, res) {

    var indice = req.query.indice;    
    
    res.send(JSON.stringify(Autos[indice]));    
});
;
app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});
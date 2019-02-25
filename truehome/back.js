const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const propiedades = [
{
	id: '0',
	nombre: 'Propiedad 1',
	direccion: 'av1',
	dueño: 'dueño1',
	costo: '1000'
},
{
	id: '1',
	nombre: 'Propiedad 2',
	direccion: 'av2',
	dueño: 'dueño2',
	costo: '2000'
},
{
	id: '2',
	nombre: 'Propiedad 3',
	direccion: 'av3',
	dueño: 'dueño3',
	costo: '3000'
},
{
	id: '3',
	nombre: 'Propiedad 4',
	direccion: 'av4',
	dueño: 'dueño4',
	costo: '4000'
},
{
	id: '4',
	nombre: 'Propiedad 5',
	direccion: 'av5',
	dueño: 'dueño5',
	costo: '5000'
}
];


function actualizarPropiedad(clave,nombreProp, nombre, direccion, costo){
  console.log(clave);
  console.log(nombre);
  console.log(direccion);
    for (var i = 0; i < propiedades.length; i++) {
        if (propiedades[i].id == clave) {
        	propiedades[i].nombre = nombreProp;
            propiedades[i].dueño = nombre;
            propiedades[i].direccion = direccion; 
            propiedades[i].costo = costo; 
            break;
        }
    }
//console.log(propiedades);
}

function guardarPropiedad(nombreProp, nombreDuen, direccion, costo){
	propiedades.push({
		id: Math.random(),
		nombre: nombreProp,
		dueño: nombreDuen,
		direccion: direccion,
		costo: costo
	});
}

app.get('/propiedades', (req, res) => {
  res.json(propiedades);
});


app.put('/propiedades/:id', function(req, res, next) {
    var id = req.params.id;
    //console.log("id en api: " +id);
	//console.log("texto enviado en api: "+ req.body.post);
    actualizarPropiedad( req.params.id , req.body.nombreProp ,req.body.nombre, req.body.direccion, req.body.costo);
	res.send(propiedades);
});

app.post('/propiedades/new',(req,res)=>{
  guardarPropiedad(req.body.nombreProp, req.body.nombre, req.body.direccion, req.body.costo);
  res.send(propiedades);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
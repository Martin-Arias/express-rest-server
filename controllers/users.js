const { request, response }  = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async ( req = request, res = response ) => {

	const { limite = 5, desde = 0 } = req.query;

	const [ usuarios, count ] = await Promise.all([
		Usuario.find({ estado:true })
			.skip(Number(desde))
			.limit(Number(limite)),
		Usuario.countDocuments({ estado:true })
	]);

	res.json({
		usuarios,
		count
	});
}

const usuariosPost = async ( req = request, res = response ) => {

	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	//Encriptar la contraseña
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(password, salt);
	usuario.password = hash;

	//Guardar en BD
	await usuario.save();

	res.json({
		usuario
	});
	
	
}

const usuariosPut = async ( req = request, res = response ) => {
	const { id } = req.params;
	const { __id, password, google, ...resto} = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(password, salt);
		resto.password = hash;
	}

	const usuario = await Usuario.findByIdAndUpdate( id, resto);

	res.json(usuario);
}

const usuariosPatch = ( req = request, res = response ) => {
	res.json({
		message: 'PATCH API CONTROLADOR'
	});
}

const usuariosDelete = async ( req = request, res = response ) => {
	const { id } = req.params;
	const usuario = await Usuario.findByIdAndUpdate( id, {estado:false} );

	res.json(usuario);
}


module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete


};
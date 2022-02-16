const { request, response }  = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt')
const Usuario = require('../models/usuario');


const login = async(req = request, res = response ) => {

	const { correo, password } = req.body;

	try {
		/* Verifico si el mail existe */
		const usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			return res.status(400).json({ 
				message : 'Usuario o contraseña incorrectos - Correo'
			});
		};

		/* Verifico si el usuario esta activo */
		if (!usuario.estado) {
			return res.status(400).json({ 
				message : 'Usuario o contraseña incorrectos - Estado'
			});
		};

		/* Verifico la contraseña */
		const validPassword = bcryptjs.compareSync(password, usuario.password)

		if (!validPassword) {
			return res.status(400).json({ 
				message : 'Usuario o contraseña incorrectos - Contraseña'
			});
		}
		/* Genero el token */
		const token = await generarJWT( usuario.id )


		res.json({
			usuario,
			token
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Algo salio mal'
		})
	}
}


module.exports = {
	login
}
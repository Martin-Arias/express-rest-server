const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
	const token = req.header('x-token');
	
	if (!token) {
		return res.status(401).json({
			msg: 'Invalid token 1 '
		});
	};
	
	try {
		const { uid } = jwt.verify(token,process.env.SECRET_KEY);

		//Busco el usuario al que corresponde el UID
		const usuario = await Usuario.findById(uid);

		if (!usuario) {
			return res.status(401).json({
				msg: 'Invalid token - User does not exist'
			});
		};

		//Verifico que el usuario este activo
		if (!usuario.estado) {
			return res.status(401).json({
				msg: 'Invalid token - User unauthorized'
			});
		};

		req.usuario = usuario;

		next();

	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'Invalid token 2 '
		});
	};

};


module.exports = {
	validarJWT
};
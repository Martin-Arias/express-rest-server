const {response} = require('express');

const isAdminRole = (req, res = response, next) => {

	if (!req.usuario) {
		return res.status(500).json({
			msg: 'Invalid token or user'
		});
	};

	const { rol, nombre } = req.usuario;

	if (rol !== 'ADMIN_ROLE') {
		return res.status(401).json({
			msg: 'No tiene permiso para realizar esta acción'
		});
	};
	next();
};

const tieneRole = ( ...roles ) => {
	return (req, res = response, next) => {
		console.log(roles, req.usuario.rol);
		if (!req.usuario) {
			return res.status(500).json({
				msg: 'Invalid token or user'
			});
		};
		if (!roles.includes(req.usuario.rol)) {
			return res.status(401).json({
				msg: 'No tiene permiso para realizar esta acción'
			});
		};
		next();
	};
};



module.exports = { 
	isAdminRole,
	tieneRole
};
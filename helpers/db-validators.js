const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no esta registrado en la BBDD`);
	};
};

const correoExiste = async ( correo = '') => {
	const existeCorreo = await Usuario.findOne({ correo });
	if (existeCorreo) {
		throw new Error(`El correo ${correo} ya se encuentra registrado`);
	};
};

const usuarioExisteById = async ( id ) => {
	const existeUsuario = await Usuario.findById( id );
	if ( !existeUsuario) {
		throw new Error(`El id no corresponde a ningun usuario`);
	};
};


module.exports = {
	esRoleValido,
	correoExiste,
	usuarioExisteById
};
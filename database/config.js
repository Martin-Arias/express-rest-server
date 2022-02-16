const mongoose = require('mongoose');

const dbConnection = async () => {

	try {
		await mongoose.connect(
			process.env.MONGODB_CON,
			{
				useNewUrlParser:true,
				useUnifiedTopology:false,
			}
		);

		console.log('Conexion realizada correctamente');

	} catch (error) {
		console.log(error);
		throw new Error('ERROR EN LA INICIALIZACION DE LA BASE DE DATOS');
	}
};



module.exports = {
	dbConnection
};
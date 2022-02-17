const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { esRoleValido, correoExiste, usuarioExisteById } = require('../helpers/db-validators');

const { 
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete
} = require('../controllers/users');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom( usuarioExisteById ),
	check('rol').custom( esRoleValido ),
	validarCampos
], usuariosPut );

router.post('/',[

	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('correo', 'El correo no es valido').isEmail(),
	check('correo').custom( correoExiste ),
	check('password', 'El password debe contener 6 caracteres o más').isLength({min:6}),
	check('rol').custom( esRoleValido ),
	validarCampos,

], usuariosPost );


router.patch('/', usuariosPatch );

router.delete('/:id',[
	validarJWT,
	tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom( usuarioExisteById ),
	validarCampos

], usuariosDelete );

module.exports = router;
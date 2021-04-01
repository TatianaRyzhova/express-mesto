const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  updateUserValidation,
  updateAvatarValidation,
  getUserByIdValidation,
} = require('../middlewares/validatons');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserByIdValidation, getUserById);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;

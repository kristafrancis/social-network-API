const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  createFriend,
  deleteFriendById
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

// /api/user/:id/friends/:friendsId
router
 .route('/:userId/friends/:friendId')
 .post(createFriend)
 .delete(deleteFriendById);

module.exports = router;
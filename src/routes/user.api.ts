import express from 'express';
import { hash, compare } from 'bcrypt';
import { User, IUser } from '../models/user.model';
import auth from '../middleware/auth';
import errorHandler from './error';
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from './user.util';

const router = express.Router();
const saltRounds = 10;

/**
 * Add a new user. Has to be logged in already
 */
router.post('/signup', auth, async (req, res) => {
  const { first_name } = req.body;
  const { last_name } = req.body;
  const { email } = req.body;
  const type = 'user';
  const { password } = req.body;

  if (await User.findOne({ email })) {
    return errorHandler(res, 'User already exists.');
  }

  // hash + salt password
  return hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return errorHandler(res, err.message);
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      type,
      password: hashedPassword,
    });

    return newUser
      .save()
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => errorHandler(res, e.message));
  });
});

/**
 * Login a user that has already signed up to the chat
 */
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const user = await User.findOne({ email });
  // user does not exist
  if (!user) return errorHandler(res, 'User does not exist.');

  return compare(password, user.password, (err, result) => {
    if (err) return errorHandler(res, err.message);

    if (result) {
      // password matched
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return Promise.all([accessToken, refreshToken]).then((tokens) =>
        res.status(200).json({
          success: true,
          accessToken: tokens[0],
          refreshToken: tokens[1],
        })
      );
    }

    // wrong password
    return errorHandler(res, 'User email or password is incorrect.');
  });
});

/**
 * This called frequently from the frontend, this is to ensure that the user
 * is still logged in and has the correct tokens
 */
router.post('/refreshToken', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorHandler(res, 'No token provided.');
  }

  return validateRefreshToken(refreshToken)
    .then((tokenResponse: IUser) => generateAccessToken(tokenResponse))
    .then((accessToken: string) => {
      res.status(200).json({
        success: true,
        accessToken,
      });
    })
    .catch((err: { code: string; message: string }) => {
      if (err.code) {
        return errorHandler(res, err.message, err.code);
      }
      return errorHandler(res, err.message);
    });
});

/**
 * get the information of the current user
 */
router.get('/me', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId)
    .select('first_name last_name email _id')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');

      return res.status(200).json({ success: true, data: user });
    })
    .catch((err) => errorHandler(res, err.message));
});

router.delete('/:user_id', auth, async (req, res) => {
  const { user_id } = req.params;
  // console.log(user_id);
  try {
    const user = await User.findById(user_id);
    if (!user) return errorHandler(res, 'User does not exist.');
    await User.findByIdAndDelete(user_id);
    return res.status(200).json({ success: true });
  } catch (err) {
    errorHandler(res, err.message);
  }
});

/**
 * Get all users in the database based on a query.
 * Functions as a get
 */
router.post('/', (req, res) => {
  const { query } = req.body;
  let find_query = {};
  if (typeof query !== 'undefined') {
    console.log('query exists');
    find_query = {
      $or: [
        { first_name: { $regex: query, $options: 'i' } },
        { last_name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    };
  }

  User.aggregate()
    .match(find_query)
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

export default router;

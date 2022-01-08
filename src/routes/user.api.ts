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

/* account signup endpoint */
router.post('/signup', async (req, res) => {
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

/* acccount login endpoint */
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

/* account jwt token refresh */
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

/* protected: get my info */
router.get('/me', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId)
    .select('firstName lastName email _id')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');

      return res.status(200).json({ success: true, data: user });
    })
    .catch((err) => errorHandler(res, err.message));
});

router.delete('/:user_id', async (req, res) => {
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

/* fetch all users in database */
router.get('/', (_, res) => {
  User.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

/* TESTING ENDPOINTS BELOW (DELETE IN PRODUCTION) */
/* delete all users in database */
router.delete('/', (_, res) => {
  User.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;

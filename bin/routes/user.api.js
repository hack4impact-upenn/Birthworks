'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var bcrypt_1 = require('bcrypt');
var user_model_1 = require('../models/user.model');
var auth_1 = __importDefault(require('../middleware/auth'));
var error_1 = __importDefault(require('./error'));
var user_util_1 = require('./user.util');
var router = express_1.default.Router();
var saltRounds = 10;
/* account signup endpoint */
router.post('/signup', function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var firstName, lastName, email, company, password;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          firstName = req.body.firstName;
          lastName = req.body.lastName;
          email = req.body.email;
          company = req.body.company;
          password = req.body.password;
          return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
        case 1:
          if (_a.sent()) {
            return [2 /*return*/, error_1.default(res, 'User already exists.')];
          }
          // hash + salt password
          return [
            2 /*return*/,
            bcrypt_1.hash(password, saltRounds, function (err, hashedPassword) {
              if (err) {
                return error_1.default(res, err.message);
              }
              var newUser = new user_model_1.User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                institutionName: company,
                password: hashedPassword,
              });
              return newUser
                .save()
                .then(function () {
                  return res.status(200).json({ success: true });
                })
                .catch(function (e) {
                  return error_1.default(res, e.message);
                });
            }),
          ];
      }
    });
  });
});
/* acccount login endpoint */
router.post('/login', function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
        case 1:
          user = _a.sent();
          // user does not exist
          if (!user)
            return [2 /*return*/, error_1.default(res, 'User does not exist.')];
          return [
            2 /*return*/,
            bcrypt_1.compare(password, user.password, function (err, result) {
              if (err) return error_1.default(res, err.message);
              if (result) {
                // password matched
                var accessToken = user_util_1.generateAccessToken(user);
                var refreshToken = user_util_1.generateRefreshToken(user);
                return Promise.all([accessToken, refreshToken]).then(function (
                  tokens
                ) {
                  return res.status(200).json({
                    success: true,
                    accessToken: tokens[0],
                    refreshToken: tokens[1],
                  });
                });
              }
              // wrong password
              return error_1.default(
                res,
                'User email or password is incorrect.'
              );
            }),
          ];
      }
    });
  });
});
/* account jwt token refresh */
router.post('/refreshToken', function (req, res) {
  var refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return error_1.default(res, 'No token provided.');
  }
  return user_util_1
    .validateRefreshToken(refreshToken)
    .then(function (tokenResponse) {
      return user_util_1.generateAccessToken(tokenResponse);
    })
    .then(function (accessToken) {
      res.status(200).json({
        success: true,
        accessToken: accessToken,
      });
    })
    .catch(function (err) {
      if (err.code) {
        return error_1.default(res, err.message, err.code);
      }
      return error_1.default(res, err.message);
    });
});
/* protected: get my info */
router.get('/me', auth_1.default, function (req, res) {
  var userId = req.userId;
  return user_model_1.User.findById(userId)
    .select('firstName lastName email _id')
    .then(function (user) {
      if (!user) return error_1.default(res, 'User does not exist.');
      return res.status(200).json({ success: true, data: user });
    })
    .catch(function (err) {
      return error_1.default(res, err.message);
    });
});
/* TESTING ENDPOINTS BELOW (DELETE IN PRODUCTION) */
/* fetch all users in database */
router.get('/', function (_, res) {
  user_model_1.User.find({})
    .then(function (result) {
      return res.status(200).json({ success: true, result: result });
    })
    .catch(function (e) {
      return error_1.default(res, e);
    });
});
/* delete all users in database */
router.delete('/', function (_, res) {
  user_model_1.User.deleteMany({})
    .then(function () {
      return res.status(200).json({ success: true });
    })
    .catch(function (e) {
      return error_1.default(res, e);
    });
});
exports.default = router;

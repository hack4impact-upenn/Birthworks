'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require('mongoose'));
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  refresh_token: { type: String, required: false },
});
var User = mongoose_1.default.model('User', UserSchema);
exports.User = User;

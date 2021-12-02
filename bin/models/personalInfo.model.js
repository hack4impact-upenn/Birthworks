'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PersInf = void 0;
var mongoose_1 = __importDefault(require('mongoose'));
var Schema = mongoose_1.default.Schema;
var PersInfSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  memberSinceDate: { type: Date, required: true },
  memberUntilDate: { type: Date, required: true },
});
var PersInf = mongoose_1.default.model('PersInf', PersInfSchema);
exports.PersInf = PersInf;

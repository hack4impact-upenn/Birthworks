'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Works = void 0;
var mongoose_1 = __importDefault(require('mongoose'));
var Schema = mongoose_1.default.Schema;
var WorksSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  mentor: { type: String, required: true },
});
var Works = mongoose_1.default.model('Works', WorksSchema);
exports.Works = Works;

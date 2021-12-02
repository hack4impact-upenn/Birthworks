'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Workshop = void 0;
var mongoose_1 = __importDefault(require('mongoose'));
var Schema = mongoose_1.default.Schema;
var WorkshopSchema = new Schema({
  customer_id: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  workshop_name: { type: String, required: true },
  trainer: { type: String, required: false },
});
var Workshop = mongoose_1.default.model('Workshop', WorkshopSchema);
exports.Workshop = Workshop;

'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Customer = void 0;
var mongoose_1 = __importDefault(require('mongoose'));
var Schema = mongoose_1.default.Schema;
var CustomerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: false },
  country: { type: String, required: true },
  membership_start: { type: Date, required: true },
  membership_end: { type: Date, required: true },
  notes_read: { type: String, required: true },
  notes_write: { type: String, required: true },
  workshops: [
    {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: 'Workshop',
      required: true,
    },
  ],
  certifications: [
    {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: 'Cert',
      required: true,
    },
  ],
});
var Customer = mongoose_1.default.model('Customer', CustomerSchema);
exports.Customer = Customer;

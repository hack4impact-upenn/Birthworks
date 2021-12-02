'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Cert = void 0;
var mongoose_1 = __importDefault(require('mongoose'));
var Schema = mongoose_1.default.Schema;
var CertSchema = new Schema({
  name: { type: String, required: true },
  customer_id: { type: Number, required: true },
  entry_date: { type: Date, required: true },
  completion_date: { type: Date, required: true },
  certificate: { type: Date, required: true },
  recertification_date: { type: [Date], required: true },
  mentor: { type: String, required: false },
});
var Cert = mongoose_1.default.model('Cert', CertSchema);
exports.Cert = Cert;

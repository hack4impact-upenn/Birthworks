'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var path_1 = __importDefault(require('path'));
var body_parser_1 = __importDefault(require('body-parser'));
var cors_1 = __importDefault(require('cors'));
var user_api_1 = __importDefault(require('../routes/user.api'));
var createServer = function () {
  var app = express_1.default();
  app.set('port', process.env.PORT || 5000);
  app.use(body_parser_1.default.json());
  app.use(body_parser_1.default.urlencoded({ extended: true }));
  app.use(cors_1.default());
  // API Routes
  app.use('/api/users', user_api_1.default);
  // Serving static files
  if (process.env.NODE_ENV === 'production') {
    var root_1 = path_1.default.join(__dirname, '..', 'client', 'build');
    app.use(express_1.default.static(root_1));
    app.get('*', function (_, res) {
      res.sendFile('index.html', { root: root_1 });
    });
  }
  return app;
};
exports.default = createServer;

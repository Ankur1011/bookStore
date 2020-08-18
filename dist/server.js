"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _ProductRoutes = _interopRequireDefault(require("./routes/ProductRoutes"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//post request in node application : Body-parser
var mongodbURL = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use('/api/users', _userRoutes["default"]);
app.use('/api/products', _ProductRoutes["default"]);
app.use('/api/orders', _orderRoute["default"]);
app.get('/api/config/paypal', function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
}); //end point
//app.use("/api/products",productRoute);
// app.get("/api/products",(req,res)=>{
//     res.send(products);
// })
// app.get("/api/products/:id",(req,res)=>{
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id===productId);
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({message: "Product not found" });    
// });

app.listen(5000, function () {
  console.log("Server started at http://localhost:5000/api/products");
});
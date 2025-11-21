const express = require("express");
const index = express.Router();
const login = require("./Login");
const details = require("./BillingDetails");
const books = require("./Images");
const wishlist = require("./WishList");
const accountRouter = require("./Account");
const ShippingAddress = require("./ShippingAddress");

index.use("/login",login);  
index.use("/images", books);
index.use("/billing",details);
index.use("/wishlist", wishlist);
index.use("/account", accountRouter);
index.use("/shippingaddress", ShippingAddress);

module.exports = index
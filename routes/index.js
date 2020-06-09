//import modules
const express = require("express");

const clients = require('./clients');
const tags = require('./tags');
const products = require('./products');
const customizations = require('./customizations');
const shops = require('./shops')
const fonts = require('./fonts');
const countries = require('./countries');
const categories = require('./categories');
const order_clients = require('./order_clients');
const orders = require('./orders');
const themes = require('./themes');
const events =require('./events')

const router = express.Router();

router.use('/clients', clients);
router.use('/products', products);
router.use('/tags', tags);
router.use('/customizations', customizations);
router.use('/shops', shops);
router.use('/fonts', fonts);
router.use('/countries', countries);
router.use('/categories', categories);
router.use('/clients', order_clients);
router.use('/orders', orders);
router.use('/countries', countries);
router.use('/themes', themes);
router.use('/events', events)

module.exports = router;
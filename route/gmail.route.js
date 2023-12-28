const express = require('express');
const router = express.Router();
const controller = require('../controller/mail.controller')


router.get('/user/:email', controller.getUser);
router.get('/send', controller.sendMail);
router.get('/drafts/:email', controller.getDrafts);
router.get('/read/:email/:messageId', controller.readMail);
router.get('/list/:email', controller.getMails)
router.get('/unread/:email', controller.latestMail)

module.exports = router;
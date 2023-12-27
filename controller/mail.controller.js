const axios = require('axios')
const { createConfig } = require('../util')
const nodemailer = require('nodemailer')
const CONSTANTS = require('../constant')
const { google } = require('googleapis')
require('dotenv').config();

const oAuthClient = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REFRESH_TOKEN
)

oAuthClient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


exports.sendMail = async (req, res) => {

    try {
        const accessToken = await oAuthClient.getAccessToken()
        let token = await accessToken.token;

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                ...CONSTANTS.auth,
                accessToken: token
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions = {
            ...CONSTANTS.mailOptions,
            text : 'this is test mail using gmail'
        }

        const result = await transport.sendMail(mailOptions)

        res.send(result)


    }
    catch (error) {
        console.log(error)
        response.send(error)

    }
}

exports.getUser = async (req, res) => {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`

        const { token } = await oAuthClient.getAccessToken()

        const config = createConfig(url, token)

        const response = await axios(config)
        res.json(response.data)

    }
    catch (error) {
        console.log(error)
        response.send(error)

    }
}

exports.getMails = async (req, res) => {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=100`

        const { token } = await oAuthClient.getAccessToken()

        const config = createConfig(url, token)

        const response = await axios(config)

        res.json(response.data)


    }
    catch (error) {
        console.log(error)
        response.send(error)

    }
}

exports.getDrafts = async (req, res) => {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`

        const { token } = await oAuthClient.getAccessToken()

        const config = createConfig(url, token)

        const response = await axios(config)

        res.json(response.data)

    }
    catch (error) {
        console.log(error)
        response.send(error)

    }
}

exports.readMail = async (req, res) => {
    try {

        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;

        const { token } = await oAuthClient.getAccessToken();

        const config = createConfig(url, token);
        const response = await axios(config);

        let data = await response.data;

        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}


const nodemailer = require("nodemailer");
const config = require("./config.js");
const moment = require("moment");
const https = require("https");

const _url = 'URL_APP';

function _sendMail(statusHTTP) {
  var transporter = nodemailer.createTransport({
    host: "HOST_EMAIL",
    auth: {
      user: config.EMAIL,
      pass: config.SENHA,
    },
  });
  moment.locale("pt-br");
  let currentData = moment().format("LLLL");
  var mailOptions = {
    from: "SEU_EMAIL",
    to: "EMAIL_DO_REMETENTE",
    subject: `${currentData}`,
    text: `Ops! O seu serviço está com problemas.
           Descrição do problema:
           Código recebido: ${statusHTTP}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
}

function healthCheck() {
  https.get(_url, function (res) {
    if (res.statusCode !== 200) {
      _sendMail();
    }
  });
}

healthCheck();

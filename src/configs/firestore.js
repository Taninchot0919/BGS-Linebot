const firebase = require('firebase-admin');
const { cert } = require('firebase-admin/app');

let certObj = {
  projectId: process.env.project_id,
  clientEmail: process.env.client_email,
  privateKey: process.env.private_key.replace(/\\n/g, '\n'),
}

firebase.initializeApp({ credential: cert(certObj) })

module.exports = firebase


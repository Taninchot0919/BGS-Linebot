const firestore = require('firebase-admin');
const { cert } = require('firebase-admin/app');

let certJSON = {
  projectId: process.env.project_id,
  clientEmail: process.env.client_email,
  privateKey: process.env.private_key,
}

firestore.initializeApp({ credential: cert(certJSON) })

module.exports = firestore


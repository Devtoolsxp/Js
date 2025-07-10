const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-key.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://SEU_PROJECT_ID.firebaseio.com" // ← altere aqui
  });
}

module.exports = admin.database();

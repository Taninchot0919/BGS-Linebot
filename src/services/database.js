const fs = require("../configs/firestore")

const db = fs.firestore()

const createDocument = async (collectionName, id) => {
  const userCollection = db.collection(collectionName)
  await userCollection.doc(id).set({
    isArrived: true
  })
  return userCollection
}

const getByDocument = async (collectionName, id) => {
  const data = await db.collection(collectionName).doc(id).get();
  return data.data()
}

module.exports = { createDocument, getByDocument }
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newUserRegister = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});

exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to add a request"
    );
  }
  if (data.title.length > 30) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Request must not be more than 30 characters"
    );
  }
  return admin.firestore().collection("requests").add({
    title: data.title,
    upvotes: 0,
  });
});

exports.upvote = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to upvote"
    );
  }
  // get collection ref
  const user = admin.firestore().collection("users").doc(context.auth.uid);
  const request = admin.firestore().collection("requests").doc(data.id);

  return user.get().then((doc) => {
    // check if user has already upvoted, if yes then throw error
    if (doc.data().upvotedOn.includes(data.id)) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "You can only upvote a tutorial once"
      );
    }
    // if not upvoted already then allow upvote
    return user
      .update({
        upvotedOn: [...doc.data().upvotedOn, data.id],
      })
      .then(() => {
        // increase upvotes on request by 1
        return request.update({
          upvotes: admin.firestore.FieldValue.increment(1),
        });
      });
  });
});

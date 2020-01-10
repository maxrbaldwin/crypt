const env = require('dotenv').config();
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const id = require('shortid');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs = require('fs');

const ObjectId = mongoose.Types.ObjectId;

const clientSecret = env.client_secret;
const clientID = env.auth_client_id;
const redirectURI = env.auth_redirect;

const OAuth2 = google.auth.OAuth2;

const db = mongoose.connect(env.DATABASE_URI).connection;
const Users = db.collection('users');
const UsersPromise = Promise.promisifyAll(db.collection('users'));

var google_auth = function() {

    var view = {
        stash: {},
        getAuthUrl: function() {
            var oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
            var authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: ['https://www.googleapis.com/auth/drive']
            });

            return authUrl;
        },
        getAccessToken: function(code, callback) {
            var code = decodeURIComponent(code);

            view.createUserAndGetToken(code, function(user) {
                callback(user);
            })
        },
        createUserAndGetToken: function(code, callback) {
            var oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);


            oauth2Client.getToken(code, function(err, token) {
                view.createNewUser(code, token, function(newUser) {
                    callback(newUser);
                });
            });
        },
        createNewUser: function(code, token, callback) {
            var user = new view.base(code, token);
            var userRef = user.ref;

            UsersPromise.insertAsync(user)
                .then(function(result) {
                    view.stash[userRef] = result.ops[0];
                    callback(result.ops[0]);
                });
        },
        base: function(code, token) {
            return {
                ref: id.generate(),
                auth: {
                    code: code,
                    token: token
                },
                in : true,
                stamp: Date.now()
            }
        },
        fetchUserDocsById: function(id, callback) {
            Users.findOne({ _id: ObjectId(id) }, function(err, user) {
                view.getDriveDocs(user, function(userWithDocs) {
                    callback(userWithDocs);
                });
            });
        },
        getDriveDocs: function(user, callback) {
            var oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);

            oauth2Client.credentials = user.auth.token;

            google.drive({ version: 'v3', auth: oauth2Client }).files.list({
                auth: oauth2Client,
            }, function(err, docs) {
                if (!err) {
                    Users.findOneAndUpdate({ _id: ObjectId(user._id) }, {
                        $set: {
                            docs: view.getDocumentsOnly(docs.files)
                        }
                    }, { returnOriginal: false }, function(err, userWithDocs) {
                        callback(userWithDocs.value);
                    });
                } else {
                    // Need to refresh token
                    console.log(err);
                }
            });
        },
        getDocumentsOnly: function(docs) {
            return docs.filter(function(value) {
                if (value.mimeType === 'application/vnd.google-apps.document') {
                    return value
                }
            });
        },
        fetchOneDocById: function (docId, userId, callback) {
            Users.findOne({ _id: ObjectId(userId) }, function(err, user) {
                view.fetchDriveDocById(docId, user, function(userWithDocs) {
                    callback(userWithDocs);
                });
            });
        },
        fetchDriveDocById: function (docId, user, callback) {
            var oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
            var dest = fs.createWriteStream('./tmp/' + user.ref + '/' + docId + '.txt');

            oauth2Client.credentials = user.auth.token

            // should update and save
            google.drive({ version: 'v3', auth: oauth2Client }).files.export({
                'fileId': docId,
                'mimeType': 'application/vnd.google-apps.document'
            })
            .on('end', function() {
                console.log('done')
                callback();
            })
            .on('error', function(err) {
                console.log(err);
            }).pipe(dest);
        }
    }

    return {
        getAuthUrl: view.getAuthUrl,
        getAccessToken: view.getAccessToken,
        fetchUserDocsById: view.fetchUserDocsById,
        fetchOneDocById: view.fetchOneDocById
    }

}();

module.exports = google_auth;

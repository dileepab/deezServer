import { Model } from '@mean-expert/model';
import * as fs from 'fs';
import * as readline from 'readline';

const google = require('googleapis');

const googleAuth = require('google-auth-library');

/**
 * @module container
 * @description
 * Write a useful container Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class container {
  // LoopBack model instance is injected in constructor
  constructor(public model: any, public file: any) {
    model.afterRemote('upload', function(context: any, container: any, next: any) {
      console.log('> container.afterRemote triggered ' + container.result.files.uploadFile[0].name);

      let file = container.result.files.uploadFile[0];

      fs.readFile('./.credentials/client_secret.json', function processClientSecrets(err: any, content: any) {
        if (err) {
          console.log('Error loading client secret file: ' + err);
          return;
        }

        // Authorize a client with the loaded credentials, then call the
        // Drive API.
        authorize(JSON.parse(content), createFile, file);

      });


      let authorize = (credentials: any, callback: any, file: any) => {
        let clientSecret = credentials.web.client_secret;
        let clientId = credentials.web.client_id;
        let redirectUrl = credentials.web.redirect_uris[0];
        let auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        fs.readFile('./.credentials/drive-nodejs-quickstart.json', function(err: any, token: any) {
          if (err) {
            getNewToken(oauth2Client, callback, file);
          }else if(JSON.parse(token).expiry_date < new Date().getTime()) {
            oauth2Client.refreshAccessToken(function(err: any, tokens: any) {
              // your access_token is now refreshed and stored in oauth2Client
              // store these new tokens in a safe place (e.g. database)
              oauth2Client.credentials = JSON.parse(token);
              callback(oauth2Client, file);
            });


            // getNewToken(oauth2Client, callback);

          } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client, file);
          }
        });
      };

      let getNewToken = (oauth2Client: any, callback: any, file: any) =>  {
        let authUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: ['https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.appdata',
            'https://www.googleapis.com/auth/drive.file']
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        let rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function(code) {
          rl.close();
          oauth2Client.getToken(code, function(err: any, token: any) {
            if (err) {
              console.log('Error while trying to retrieve access token', err);
              return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client, file);
          });
        });
      };

      let storeToken = (token: any) =>  {
        try {
          fs.mkdirSync('./.credentials/');
        } catch (err) {
          if (err.code != 'EEXIST') {
            throw err;
          }
        }
        console.log(token);
        fs.writeFile('./.credentials/drive-nodejs-quickstart.json', JSON.stringify(token));
        console.log('Token stored to ' + './.credentials/drive-nodejs-quickstart.json');
      };

      let createFile = (auth: any, file: any) => {

        const service = google.drive('v3');

        let fileMetadata = {
          name: file.name,
          parents: [ '0B9-MezGugrwaVEFES0FYa3h3RVE' ]
        };
        let media = {
          mimeType: 'image/jpeg',
          body: fs.createReadStream('./server/storage/test/'+ file.name)
        };

        service.files.create({
          auth: auth,
          resource: fileMetadata,
          media: media,
          fields: 'webContentLink, id, thumbnailLink',

          // "contentHints": {
          //   "thumbnail": {
          //     "image": new Buffer(fs.readFileSync('./server/storage/test/'+ file.name)).toString('base64'),
          //     "mimeType": 'image/jpeg'
          //   },
          //   "indexableText": 'thumb'
          // }

        }, function(err: any, response: any) {
          if(err) {
            // Handle error
            console.log(err);

            context.res.status(400).json({
              title: 'Bad Request',
              content: 'Bad Request'
            });
          } else {
            console.log('File Id: ', response.id);

            context.res.status(200).json(response);
          }

          model.app.models.container.removeFile('test', file.name, function () {});

        });
      };

    });

  }
  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('container: Before Save');
    next();
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = container;

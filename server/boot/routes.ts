// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class routes {
  constructor(app: any) {
    const router = app.loopback.Router();
    const User = app.models.AppUser;
    // router.post('/reset', (req: any, res: any)=>{
    //   res.sendFile(__dirname + '../../dist/index.html');
    // });


    router.post('/request-password-reset', function(req: any, res: any, next: Function) {
      User.resetPassword({
        email: req.body.email
      }, function(err: any) {
        if (err) return res.status(401).send(err);

        res.send(200);
      });
    });

    //show password reset form
    router.get('/reset-password', function(req: any, res: any, next: Function) {
      if (!req.accessToken) return res.sendStatus(401);
      res.render('password-reset', {
        accessToken: req.accessToken.id
      });
    });

    router.post('/reset-password', function(req: any, res: any, next: Function) {
      if (!req.accessToken) return res.sendStatus(401);

      //verify passwords match
      if (!req.body.password ||
        !req.body.confirmation ||
        req.body.password !== req.body.confirmation) {
        return res.sendStatus(400, new Error('Passwords do not match'));
      }

      User.findById(req.accessToken.userId, function(err: any, user: any) {
        if (err) return res.sendStatus(404);
        user.updateAttribute('password', req.body.password, function(err: any, user: any) {
          if (err) return res.sendStatus(404);
          console.log('> password reset processed successfully');
          res.status(200).send({content:'password reset processed successfully'});
        });
      });
    });

    app.use(router);
  }
}

module.exports = routes;

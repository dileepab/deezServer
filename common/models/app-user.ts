import { Model } from '@mean-expert/model';
import * as path from 'path';

var config = require('../../server/config.json');


/**
 * @module AppUser
 * @description
 * Write a useful AppUser Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' },
    afterSave: {name: 'after save', type: 'operation'}
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class AppUser {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

    model.afterRemote('create', function(context: any, user: any, next: any) {
      console.log('> user.afterRemote triggered');

      let options = {
        type: 'email',
        to: user.email,
        from: 'noreply@loopback.com',
        subject: 'Thanks for registering.',
        template: path.resolve(__dirname, '../../server/views/verify.ejs'),
        redirect: '/auth/login',
        user: user
      };

      let Role = model.app.models.Role;
      let RoleMapping = model.app.models.RoleMapping;

      Role.find({where: {name: user.userRole}}, function(err: any, role: any) {
        if (err) {return console.log(err);}


        RoleMapping.create({
          principalType: "USER",
          principalId: user.id,
          roleId: role[0].id
        }, function(err: any, roleMapping: any) {

          if (err) {return console.log(err);}

          console.log('User assigned RoleID ' + role[0].id + ' (' + user.userRole + ')');

        })

      });

      user.verify(options, function(err: any, response: any) {
        if (err) {
          model.deleteById(user.id);
          return next(err);
        }

        console.log('> verification email sent:', response);

        context.res.status(200).json({
          title: 'Signed up successfully',
          content: 'Please check your email and click on the verification link ' +
          'before logging in.',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });
    });

    //send password reset link when requested
    model.on('resetPasswordRequest', function(info: any) {
      let url = 'http://' + config.host + ':' + config.port + '/auth/changePassword';
      let html = 'Click <a href="' + url + '/' +
        info.accessToken.id + '">here</a> to reset your password';


      model.app.models.Email.send({
        to: info.email,
        subject: 'Password reset',
        html: html
      }, function(err: any) {
        if (err) return console.log('> error sending password reset email');
        console.log('> sending password reset email to:', info.email);
      });
    });

  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('AppUser: Before Save');
    next();
  }

  afterSave(ctx: any, next: Function): void {
    next();
  }


  // Example Remote Method
  myRemote(next: Function): void {
    // this.model.find(next);
  }

}

module.exports = AppUser;


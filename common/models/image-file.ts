import {Model} from '@mean-expert/model';
/**
 * @module ImageFile
 * @description
 * Write a useful ImageFile Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'}
  },
  remotes: {
    upload: {
        description: 'Uploads a file',
        accepts: [
          {arg: 'ctx', type: 'object', http: {source: 'context'}},
          {arg: 'options', type: 'object', http: {source: 'query'}}
        ],
        returns: {
          arg: 'fileObject', type: 'object', root: true
        },
        http: {verb: 'post'}
      }
  }
})

class ImageFile {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('ImageFile: Before Save');
    next();
  }

  // Example Remote Method
  upload(ctx: any, next: Function): void {

    // ctx.req.params.container = 'public';
    //
    // this.model.app.models.container.upload(ctx.req, ctx.result, options, function (err, fileObj) {
    //
    //   if (err) {
    //     cb(err);
    //   } else {
    //
    //     if (typeof fileObj.files.file == "undefined" || fileObj.files.file === null) {
    //       var err = new Error(g.f('Upload error. Param of file should have name is: file'));
    //       cb(err);
    //     } else {
    //
    //       var fileInfo = fileObj.files.file[0];
    //       File.create({
    //         name: fileInfo.name,
    //         type: fileInfo.type,
    //         container: fileInfo.container,
    //         size: fileInfo.size,
    //         userId: ctx.req.accessToken.userId
    //       }, function (err, obj) {
    //         if (err !== null) {
    //           cb(err);
    //         } else {
    //           cb(null, obj);
    //         }
    //       });
    //
    //
    //     }
    //
    //   }
    // });
  }
}

module.exports = ImageFile;

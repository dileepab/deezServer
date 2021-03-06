import {BootScript} from "@mean-expert/boot-script";

@BootScript()
class Script {
    constructor(app: any) {

        let AppUser = app.models.AppUser;
        let Role = app.models.Role;
        let RoleMapping = app.models.RoleMapping;

        AppUser.find({where: {"email": "bmdbalasuriya@gmail.com"}},
            (err: any, user: any) => {
                if (err) return console.log(err);
                if (user.length === 0) {

                    AppUser.create([
                            {username: 'admin', email: 'bmdbalasuriya@gmail.com', password: 'admin123', userRole: 'admin', emailVerified: true}
                        ],

                        (err: any, user: any) => {
                            if (err) return console.log(err);

                            //create the admin role
                            Role.create({
                                name: 'admin'
                            }, (err: any, role: any) => {
                                if (err) return console.log(err);

                                console.log(user[0].id);

                                //make bob an admin
                                role.principals.create({
                                    principalType: RoleMapping.USER,
                                    principalId: user[0].id
                                }, (err: any, principal: any) => {
                                    if (err) return console.log(err);
                                });
                            });
                        }
                    )

                }

            }
        );

        AppUser.find({where: {"email": "duhimaya@gmail.com"}},
            (err: any, user: any) => {
                if (err) return console.log(err);
                if (user.length === 0) {

                    AppUser.create([
                            {username: 'Himaya', email: 'duhimaya@gmail.com', password: 'dileepa1234', userRole: 'user', emailVerified: true}
                        ],

                        (err: any, user: any) => {
                            if (err) return console.log(err);

                            //create the admin role
                            Role.create({
                                name: 'user'
                            }, (err: any, role: any) => {
                                if (err) return console.log(err);

                                console.log(user[0].id);

                                //make bob an admin
                                role.principals.create({
                                    principalType: RoleMapping.USER,
                                    principalId: user[0].id
                                }, (err: any, principal: any) => {
                                    if (err) return console.log(err);
                                });
                            });
                        }
                    )

                }

            }
        )

    }

}

module.exports = Script;

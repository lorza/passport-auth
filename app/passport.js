var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/User");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-signup", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({
                    "local.username": username
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        console.log("user already exists");
                        return done(null, false, req.flash("signupMessage", "That username is already in use"));
                    }
                    else {
                        console.log("success - Saving user details")
                        var newUser = new User();
                        newUser.local.username = username;
                        newUser.local.password = newUser.generateHash(password);
                        console.log(newUser);
                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                })
            });
        }
    ))

    passport.use("local-login", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {
            User.findOne({"local.username": username}, function(err, user) {
                if (err) {
                    console.log("db err?");
                    return done(err)
                }
                
                if (!user) {
                    return done(null, false, req.flash("loginMessage", "The username or password you have entered is incorrect - un"))
                }
                
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash("loginMessage", "The username or password you have entered is incorrect - pw"));
                }
                
                return done(null, user);
            })
        }));

}

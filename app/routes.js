module.exports = function(app, passport, crypt){
    app.get("/", function(req, res){
        res.render("index.ejs");
    });
    
    app.get("/login", function(req, res){
        res.render("login.ejs", {message: req.flash("loginMessage")})
    })
    
    app.get("/register", function(req, res){
        res.render("reg.ejs", {message: req.flash("signupMessage")});
    });
    
    app.post("/register", passport.authenticate("local-signup", {
        successRedirect: "/profile",
        failureRedirect: "/fail",
        failureFlash: true
    }));
    
    app.get("/profile", isLoggedIn, function(req, res){
        res.render("profile.ejs", {user: req.user});
    });
    
    app.get("/logout", function(req, res){
        req.logout();
        res.redirect("/");
    });
    
    app.get("/fail", function(req, res){
        res.send("fail to reg");
    });
    
    function isLoggedIn(req, res, next){
        if (req.isAuthenticated())
            return next();
        res.redirect("/");
    }
}
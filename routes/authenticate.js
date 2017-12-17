var authController = require('../controllers/auth_controller.js');

module.exports = function (app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/logout', authController.logout);
    app.get('/', authController.home);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    // app.get('/signup', function(req,res) {
    //       res.render("signup")
    //
    //   })

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}

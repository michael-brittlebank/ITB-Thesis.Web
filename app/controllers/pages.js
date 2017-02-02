var pages = {};

/*
 main pages
 */
pages.getIndex = function(req, res, next) {
    res.render('pages/homepage');
};

pages.getLoginPage = function(req, res, next) {
    res.render('pages/login');
};

pages.getRegisterPage = function(req, res, next) {
    res.render('pages/register');
};

pages.getForgotPasswordPage = function(req, res, next) {
    res.render('pages/forgot-password');
};

pages.getPasswordResetPage = function(req, res, next) {
    res.render('pages/password-reset');
};

/*
 error pages
 */
pages.get500Page = function(req, res, next) {
    res.render('errors/500');
};

pages.get404Page = function(req, res, next) {
    res.render('errors/404');
};

module.exports = pages;
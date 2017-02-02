const // packages
    express = require('express'),
    router = express.Router(),
// services
    utilService = require('../services/util'),
//controllers
    pagesController = require('../controllers/pages');

/* GET home page. */
router.route('/')
    .get(pagesController.getIndex);

router.route('/login')
    .get(pagesController.getLoginPage);

router.route('/register')
    .get(pagesController.getRegisterPage);

router.route('/forgot-password')
    .get(pagesController.getForgotPasswordPage);

router.route('/password-reset')
    .get(pagesController.getPasswordResetPage);

if(utilService.isLocalConfig()){
    router.route('/500')
        .get(pagesController.get500Page);

    router.route('/404')
        .get(pagesController.get404Page);
}

module.exports = router;

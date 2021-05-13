const express = require('express');
const router = express.Router();

//get user
router.get('/', async (req, res) => {
    try {
        const userInfo = await User.findAll({
            attributes: { exclude: ['password'] }
        }).then(userInfo => res.json(userInfo))
    } catch (err) {
        res.status(500).json(err)
    }
})


//login user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});



//logout
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/').end()
        });

    } else {
        res.status(400).end();
    };
});

module.exports = router;

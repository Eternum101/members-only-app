const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.createUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                }
                            });
                        });
                });
            });
        });
};

exports.updateUserMembership = async (req, res, next) => {
    const { passcode, adminPasscode } = req.body;
    const user = req.user;

    if (passcode === 'member101') {
        user.membershipStatus = 'Member';
        await user.save();
        res.json({ user, message: 'Membership status upgraded successfully' });
    } else if (adminPasscode === 'admin111') {
        user.membershipStatus = 'Admin';
        await user.save();
        res.json({ user, message: 'Admin status granted successfully' });
    } else {
        res.status(400).json({ message: 'Incorrect passcode' });
    }
};



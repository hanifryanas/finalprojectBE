const userServiceModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class controllerUsers {
    static async getUserById(req, res) {
        const userId = req.params.id;
        const user = await userServiceModel.findUserById(userId);
        (user) ? res.status(200).json(user) : res.status(404).send('user not found');
    }
    static async createUser(req, res) {
        let user = req.body;
        const existingUserEmail = await userServiceModel.findUserByEmail(req.body.email);
        if (existingUserEmail) {
            res.status(400).send('user email already used');
        }
        else {
            userServiceModel.createUser(user)
                .then(() => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    }
    static async loginUser(req, res) {
        const user = await userServiceModel.findUserByEmail(req.body.email);
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (user) {
            if (isPasswordValid) {
                const token = jwt.sign({
                    id: user.id
                }, process.env.SECRET_KEY, { expiresIn: '4h' });
                res.status(200).json({
                    message: 'login success',
                    token: token,
                    user: user
                });
            }
            else {
                res.status(400).send('wrong password');
            }
        }
        else {
            res.status(400).send('user not found');
        }
    }
    static async updateUser(req, res) {
        const userId = req.params.id;
        const user = req.body;
        const updatedUser = await userServiceModel.updateUserById(userId, user);
        (updatedUser) ? res.status(201).json(updatedUser) : res.status(404).send('user not found');
    }
    static async deleteUser(req, res) {
        const userId = req.params.id;
        const user = await userServiceModel.findUserById(userId);
        if (user) {
            userServiceModel.deleteUserById(userId)
                .then(() => {
                    res.status(204).send('user deleted');
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
        else {
            res.status(400).send('user not found');
        }
    }
}

module.exports = controllerUsers;

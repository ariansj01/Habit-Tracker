const userService = require('../services/user.sevice');
const { successResponse, errorResponse } = require('../utils/response');
const { notify } = require('../utils/userEmitter');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAll();
        successResponse(res, 200, users, 'Users fetched successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        successResponse(res, 200, user, 'User fetched successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const createUser = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        notify('userCreated', user);
        successResponse(res, 201, user, 'User created successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, req.body);
        notify('userUpdated', user);
        successResponse(res, 200, user, 'User updated successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        notify('userDeleted', user);
        successResponse(res, 200, user, 'User deleted successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const getUserCount = async (req, res) => {
    try {
        const user = await userService.count();
        notify('userCount', user);
        successResponse(res, 200, user, 'User count fetched successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserCount
}
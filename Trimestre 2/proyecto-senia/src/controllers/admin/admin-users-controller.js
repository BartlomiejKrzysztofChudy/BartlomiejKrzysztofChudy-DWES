import * as adminUsersService from "../../services/admin/admin-users-service.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await adminUsersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await adminUsersService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

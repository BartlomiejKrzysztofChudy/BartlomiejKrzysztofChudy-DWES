import User from "../models/user.js";

export const getAllUsers = (req, res) =>{
    const users = User.findAll();
    res.json(users);
}

export const getUserById = (req, res) =>{
    const id = req.params.id
    const user = User.findById(id)

    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: "Usuario no encontrado"})
    }
}

export const createUser = (req, res) =>{
    const userToSave = req.body
    const savedUser = User.create(userToSave);
    res.status(201).json(savedUser);
}


export const updateUser = (req, res) =>{
    const id = req.params.id
    const userToUpdate = req.body
    const updateUser = User.update(id, userToUpdate);

    if(updateUser){
        res.json(updateUser);

    }else{
        res.status(404).json({message: "Usuario no encontrado"});
    }
}

export const deleteUser = (req, res) =>{
    const id = req.params.id;
    const isDelted = User.delete(id);
    if(isDelted){
        return res.status(204).send();
    }else{
        return res.status(404).json({message: "Error al borrar usuario"})
    }
}
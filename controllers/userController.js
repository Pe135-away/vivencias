import {
  listUsers,
  getUser,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
} from '../services/userService.js';

const handleControllerError = (response, error) => {
  if (error.status) {
    response.status(error.status).json({ message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ message: 'Erro interno no servidor' });
};

export const getUsers = async (request, response) => {
  try {
    const users = await listUsers();
    response.status(200).json(users);
  } catch (error) {
    handleControllerError(response, error);
  }
};

export const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await getUser(Number(id));
    response.status(200).json(user);
  } catch (error) {
    handleControllerError(response, error);
  }
};

export const createUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      response
        .status(400)
        .json({ message: 'name, email e password são obrigatórios' });
      return;
    }

    const createdUser = await createNewUser({ name, email, password });
    response.status(201).json(createdUser);
  } catch (error) {
    handleControllerError(response, error);
  }
};

export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      response
        .status(400)
        .json({ message: 'name, email e password são obrigatórios' });
      return;
    }

    const updatedUser = await updateExistingUser(Number(id), {
      name,
      email,
      password,
    });

    response.status(200).json(updatedUser);
  } catch (error) {
    handleControllerError(response, error);
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    await deleteExistingUser(Number(id));
    response.status(204).send();
  } catch (error) {
    handleControllerError(response, error);
  }
};


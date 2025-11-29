import {
  findAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../repositories/userRepository.js';

const ensureUserExists = async (id) => {
  const existingUser = await findUserById(id);

  if (!existingUser) {
    const error = new Error('Usuário não encontrado');
    error.status = 404;
    throw error;
  }

  return existingUser;
};

const ensureUniqueEmail = async (email, ignoreUserId = null) => {
  const userWithEmail = await findUserByEmail(email);

  if (userWithEmail && userWithEmail.id !== ignoreUserId) {
    const error = new Error('E-mail já cadastrado');
    error.status = 409;
    throw error;
  }
};

export const listUsers = () => findAllUsers();

export const getUser = (id) => ensureUserExists(id);

export const createNewUser = async ({ name, email, password }) => {
  await ensureUniqueEmail(email);

  const result = await createUser({ name, email, password });
  return findUserById(result.id);
};

export const updateExistingUser = async (id, { name, email, password }) => {
  await ensureUserExists(id);
  await ensureUniqueEmail(email, id);

  await updateUser({ id, name, email, password });
  return findUserById(id);
};

export const deleteExistingUser = async (id) => {
  await ensureUserExists(id);
  await deleteUser(id);
};



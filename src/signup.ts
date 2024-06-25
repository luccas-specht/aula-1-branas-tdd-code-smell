import {
  validateCarPlate,
  validateCpf,
  validateEmail,
  validateName,
} from './validations';

import { signupRepository, databaseConnection } from './database';

export async function signup(input: any): Promise<any> {
  const { getConnection, finishConnection } = databaseConnection();
  const { getUserByEmail, insertUserIntoDatabase } = signupRepository({
    databaseConnection: getConnection(),
  });

  try {
    if (!validateCpf({ rawCpf: input.cpf })) {
      throw new Error('Invalid cpf');
    }

    if (!validateEmail({ email: input.email })) {
      throw new Error('Invalid email');
    }

    if (!validateName({ name: input.name })) {
      throw new Error('Invalid name');
    }

    if (input.isDriver && !validateCarPlate({ plate: input.carPlate })) {
      throw new Error('Invalid car plate');
    }

    const account = await getUserByEmail(input.email);
    if (account) {
      throw new Error('Account already exists');
    }

    const newAccount = {
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      carPlate: input.carPlate,
      isPassenger: input.isPassenger,
      isDriver: input.isDriver,
    };
    const accountId = await insertUserIntoDatabase(newAccount);
    return { accountId };
  } catch (error) {
    throw error;
  }
}

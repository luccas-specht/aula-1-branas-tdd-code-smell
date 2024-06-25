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

  if (!validateCpf({ rawCpf: input.cpf })) {
    return -1;
  }

  if (!validateEmail({ email: input.email })) {
    return -2;
  }

  if (!validateName({ name: input.name })) {
    return -3;
  }

  if (input.isDriver && !validateCarPlate({ plate: input.carPlate })) {
    return -5;
  }

  try {
    const account = await getUserByEmail(input.email);
    if (account) {
      return -4;
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
    console.log({ error });
  }
}

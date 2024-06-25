import crypto from 'crypto';
import pgp from 'pg-promise';

import {
  validateCarPlate,
  validateCpf,
  validateEmail,
  validateName,
} from './validations';

const connection = pgp()('postgres://postgres:231123@localhost:5432/branas');

export async function signup(input: any): Promise<any> {
  if (!validateName({ name: input.name })) {
    return -3;
  }

  if (!validateEmail({ email: input.email })) {
    return -2;
  }

  if (!validateCpf({ rawCpf: input.cpf })) {
    return -1;
  }

  try {
    const id = crypto.randomUUID();

    const [acc] = await connection.query(
      'select * from cccat17.account where email = $1',
      [input.email]
    );

    if (!acc) {
      if (input.isDriver) {
        if (validateCarPlate({ plate: input.carPlate })) {
          await connection.query(
            'insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)',
            [
              id,
              input.name,
              input.email,
              input.cpf,
              input.carPlate,
              !!input.isPassenger,
              !!input.isDriver,
            ]
          );

          const obj = {
            accountId: id,
          };
          return obj;
        } else {
          // invalid car plate
          return -5;
        }
      } else {
        await connection.query(
          'insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)',
          [
            id,
            input.name,
            input.email,
            input.cpf,
            input.carPlate,
            !!input.isPassenger,
            !!input.isDriver,
          ]
        );

        const obj = {
          accountId: id,
        };
        return obj;
      }
    } else {
      // already exists
      return -4;
    }
  } finally {
    await connection.$pool.end();
  }
}

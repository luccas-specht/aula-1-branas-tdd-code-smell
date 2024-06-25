import crypto from 'crypto';
import pgp from 'pg-promise';
import { validateCpf } from './validations/validateCpf';
import { validateName } from './validations/validateName';
import { validateEmail } from './validations/validateEmail';

export async function signup(input: any): Promise<any> {
  const connection = pgp()('postgres://postgres:231123@localhost:5432/branas');

  try {
    const id = crypto.randomUUID();

    const [acc] = await connection.query(
      'select * from cccat17.account where email = $1',
      [input.email]
    );

    if (!acc) {
      if (validateName({ name: input.name })) {
        if (validateEmail({ email: input.email })) {
          if (validateCpf(input.cpf)) {
            if (input.isDriver) {
              if (input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
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
            // invalid cpf
            return -1;
          }
        } else {
          // invalid email
          return -2;
        }
      } else {
        // invalid name
        return -3;
      }
    } else {
      // already exists
      return -4;
    }
  } finally {
    await connection.$pool.end();
  }
}

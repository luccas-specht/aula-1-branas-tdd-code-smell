import { signup } from '../src/signup';

/**
 * test('Should insert driver user correctly', async () => {
  const input = {
    name: 'Luccas Specht',
    email: 'luccas@gmai1l.com',
    cpf: '037.106.150-46',
    carPlate: 'MDM1784',
    isPassenger: false,
    isDriver: true,
  };

  const response = await signup(input);
  expect(response).toHaveProperty('accountId');
});
 * 
 * 
 * 
 */

test('Should not insert driver user when email already exists', async () => {
  const input = {
    name: 'Luccas Specht',
    email: 'luki@',
  };

  const response = await signup(input);
  expect(response).toEqual(-2);
});

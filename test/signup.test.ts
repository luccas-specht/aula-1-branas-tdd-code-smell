import { signup } from '../src/signup';

test('Should not insert driver user when email already exists', async () => {
  const input = {
    name: 'Luccas Specht',
    email: 'luccas@gmai1l.com',
    cpf: '037.106.150-46',
    carPlate: 'MDM1784',
    isPassenger: false,
    isDriver: true,
  };

  const response = await signup(input);
  expect(response).toEqual(-4);
});

test('Should not insert driver user when name not matched', async () => {
  const input = {
    name: 'bob',
    cpf: '97456321558',
    email: 'luccassilva@gmail.com',
  };

  const response = await signup(input);
  expect(response).toEqual(-3);
});

test('Should not insert driver user when email is invalid', async () => {
  const input = {
    name: 'Bob Singer',
    cpf: '97456321558',
    email: 'bob1111',
  };

  const response = await signup(input);
  expect(response).toEqual(-2);
});

test('Should not insert driver user when cpf is invalid', async () => {
  const input = {
    name: 'Bob Singer',
    email: 'luccas123@gmail.com',
    cpf: '12312',
  };

  const response = await signup(input);
  expect(response).toEqual(-1);
});

test('Should not insert driver user when car plate is invalid', async () => {
  const input = {
    name: 'Luccas Specht',
    email: 'luccas@gmai123.com',
    cpf: '037.106.150-46',
    carPlate: 'xxx-xxx',
    isDriver: true,
  };

  const response = await signup(input);
  expect(response).toEqual(-5);
});

test('Should insert driver user ', async () => {
  const input = {
    name: 'Luccas Specht',
    email: `luccas@gmai123${Math.random()}.com`,
    cpf: '037.106.150-46',
    carPlate: 'ABC1234',
    isPassenger: false,
    isDriver: true,
  };

  const response = await signup(input);
  expect(response.accountId).toBeDefined();
});

test('Should insert passenger user ', async () => {
  const input = {
    name: 'Luccas Specht',
    email: `luccas@gmai123${Math.random()}.com`,
    cpf: '037.106.150-46',
    isPassenger: true,
    isDriver: false,
  };

  const response = await signup(input);
  expect(response.accountId).toBeDefined();
});

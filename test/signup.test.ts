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

  await expect(signup(input)).rejects.toThrow('Account already exists');
});

test('Should not insert driver user when name not matched', async () => {
  const input = {
    name: 'bob',
    cpf: '97456321558',
    email: 'luccassilva@gmail.com',
  };

  await expect(signup(input)).rejects.toThrow('Invalid name');
});

test('Should not insert driver user when email is invalid', async () => {
  const input = {
    name: 'Bob Singer',
    cpf: '97456321558',
    email: 'bob1111',
  };

  await expect(signup(input)).rejects.toThrow('Invalid email');
});

test('Should not insert driver user when cpf is invalid', async () => {
  const input = {
    name: 'Bob Singer',
    email: 'luccas123@gmail.com',
    cpf: '12312',
  };

  await expect(signup(input)).rejects.toThrow('Invalid cpf');
});

test('Should not insert driver user when car plate is invalid', async () => {
  const input = {
    name: 'Luccas Specht',
    email: 'luccas@gmai123.com',
    cpf: '037.106.150-46',
    carPlate: 'xxx-xxx',
    isDriver: true,
  };

  await expect(signup(input)).rejects.toThrow('Invalid car plate');
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

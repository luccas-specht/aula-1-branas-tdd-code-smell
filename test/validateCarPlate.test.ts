import { validateCarPlate } from '../src/validations';

test.each(['12342as', 'xxxxx'])(
  'Should not be able to accept invalid car plate when %s',
  (carPlate) => {
    const response = validateCarPlate({ plate: carPlate });
    expect(response).toEqual(false);
  }
);

test.each(['ABC1234', 'XYZ5678', 'MDM1784'])(
  'Should be able to accept valid car plate when %s',
  (carPlate) => {
    const response = validateCarPlate({ plate: carPlate });
    expect(response).toEqual(true);
  }
);

import { validateName } from '../src/validations';

test.each(['', 'bob', 'joss', '@uhauhaus', '@#$!1233', 'LÇLÇLÇLÇL', ''])(
  'Should not be able to accept unmatching name',
  (name) => {
    const response = validateName({ name });
    expect(response).toEqual(false);
  }
);

test.each(['Bob Smith', 'Luccas specht'])(
  'Should be able to accept matching name',
  (name) => {
    const response = validateName({ name });
    expect(response).toEqual(true);
  }
);

import { validateEmail } from '../src/validations';

test.each(['', 'bob', 'joss', '@uhauhaus', '@#$!1233', 'LÇLÇLÇLÇL', ''])(
  'Should not be able to accept invalid email when %s',
  (email) => {
    const response = validateEmail({ email });
    expect(response).toEqual(false);
  }
);

test.each(['luccas.specht127182@gmail.com'])(
  'Should be able to accept valid email when %s',
  (email) => {
    const response = validateEmail({ email });
    expect(response).toEqual(true);
  }
);

type Params = {
  email: string;
};

export function validateEmail({ email }: Params) {
  return email.match(/^(.+)@(.+)$/) ? true : false;
}

type Params = {
  name: string;
};

export function validateName({ name }: Params) {
  return name.match(/[a-zA-Z] [a-zA-Z]+/) ? true : false;
}

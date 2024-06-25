type Params = {
  plate: string;
};

export function validateCarPlate({ plate }: Params) {
  return plate.match(/[A-Z]{3}[0-9]{4}/) ? true : false;
}

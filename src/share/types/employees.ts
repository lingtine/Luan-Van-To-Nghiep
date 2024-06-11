interface IAddress {
  number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface IEmployeeInput {
  email: string;
  name: string;
  password: string;
  phone: string;
  address: IAddress;
  departmentId: string;
}

export interface IEmployee {
  id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  address: IAddress;
  departmentId: string;
}

export interface IProfileInput {
  name: string;
  phone: string;
  addressNumber: string;
  addressStress: string;
  addressWard: string;
  addressDistrict: string;
  addressCity: string;
  image: File;
}

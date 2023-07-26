export interface User {
  fullName: string;
  email: string;
  phoneNumber: string[];
  address: {
    city: string
    postalCode: string
    street: string
  };
  password: string;
  confirmPassword: string;
  delivery: string;
  deliveryDay: string;
}

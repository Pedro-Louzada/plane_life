interface IDataUser {
  name: string;
  email: string;
  password: string;
  type_profile?: string;
  id: number;
  token_authentication?: string;
}

export default IDataUser;

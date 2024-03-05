import dataUser from '../mocks/Perfil Teste';

interface IDadosUser {
  nome: string;
  email: string;
  senha: string;
}

export const carregaDadosUser = (): IDadosUser => {
  return dataUser;
};

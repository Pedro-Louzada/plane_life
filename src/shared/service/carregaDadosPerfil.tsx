import detalhesPerfil from '../../shared/mocks/Perfis';
import {IDetailUser} from '../interfaces/IDetailUser';

function carregaDadosPerfil(): IDetailUser[] {
  return detalhesPerfil;
}

export default carregaDadosPerfil;

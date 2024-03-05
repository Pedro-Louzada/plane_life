import objReserva from '../../shared/mocks/Reserva diária';

interface Props {
  titulo: string;
  dados: {id: number; day: string; sigla: string; valor: string}[];
}

function carregaReserva(): Props {
  return objReserva;
}

export default carregaReserva;

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TableOne = () => {
  const sampleData = [
    {
      id: '1',
      campaign: 'Promoção Black Friday',
      date: new Date('2024-12-01T10:30:00'),
      contact: 'João Silva',
      phone: '(11) 99988-7766',
      message: 'Olá João! Aproveite nossa super promoção de Black Friday com até 70% de desconto! Acesse nosso site e garante já o seu.',
      status: 'delivered'
    },
    {
      id: '2',
      campaign: 'Lançamento Produto',
      date: new Date('2024-12-01T11:15:00'),
      contact: 'Maria Santos',
      phone: '(11) 98877-6655',
      message: 'Oi Maria! Temos novidades incríveis para você. Confira nosso novo produto que vai revolucionar seu dia a dia!',
      status: 'sent'
    },
    {
      id: '3',
      campaign: 'Recuperação Carrinho',
      date: new Date('2024-12-01T09:45:00'),
      contact: 'Pedro Costa',
      phone: '(11) 97766-5544',
      message: 'Oi Pedro! Você esqueceu alguns itens no seu carrinho. Finalize sua compra e ganhe 10% de desconto!',
      status: 'failed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            Entregue
          </p>
        );
      case 'sent':
        return (
          <p className="inline-flex rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">
            Enviado
          </p>
        );
      case 'failed':
        return (
          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            Falhou
          </p>
        );
      case 'pending':
        return (
          <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
            Pendente
          </p>
        );
      default:
        return (
          <p className="inline-flex rounded-full bg-gray bg-opacity-10 py-1 px-3 text-sm font-medium text-gray">
            Desconhecido
          </p>
        );
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Histórico de Envios
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Campanha
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Data Envio
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Contato
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Telefone
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {sampleData.map((item, index) => (
          <div key={item.id} className={`grid grid-cols-3 sm:grid-cols-5 ${index < sampleData.length - 1 ? 'border-b border-stroke dark:border-strokedark' : ''}`}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">
                    {item.campaign.charAt(0)}
                  </span>
                </div>
              </div>
              <p className="hidden text-black dark:text-white sm:block font-medium">
                {item.campaign}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white text-sm">
                {format(item.date, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="text-center">
                <p className="text-black dark:text-white font-medium">{item.contact}</p>
              </div>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {item.phone}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {getStatusBadge(item.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;

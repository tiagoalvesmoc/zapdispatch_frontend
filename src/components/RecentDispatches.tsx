import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DispatchLog } from '../types';

interface RecentDispatchesProps {
  dispatches: DispatchLog[];
}

const RecentDispatches: React.FC<RecentDispatchesProps> = ({ dispatches }) => {
  const getStatusBadge = (status: DispatchLog['status']) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">Pendente</span>;
      case 'sent':
        return <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">Enviado</span>;
      case 'delivered':
        return <span className="inline-flex rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">Entregue</span>;
      case 'failed':
        return <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">Falhou</span>;
      default:
        return <span className="inline-flex rounded-full bg-gray bg-opacity-10 py-1 px-3 text-sm font-medium text-gray">Desconhecido</span>;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Envios Recentes
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

        {dispatches.slice(0, 10).map((dispatch) => (
          <div key={dispatch.id} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">
                    {dispatch.campaignId.slice(-2).toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                Campanha #{dispatch.campaignId.slice(-6)}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white text-sm">
                {dispatch.sentAt ? format(dispatch.sentAt, 'dd/MM/yyyy HH:mm', { locale: ptBR }) : '-'}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="text-center">
                <p className="text-black dark:text-white font-medium">{dispatch.contactName}</p>
              </div>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {dispatch.contactPhone}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {getStatusBadge(dispatch.status)}
            </div>
          </div>
        ))}

        {dispatches.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">Nenhum envio realizado ainda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentDispatches;
import React from 'react';
import { MessageCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Campaign } from '../types';

interface DispatchStatsProps {
  campaigns: Campaign[];
}

const DispatchStats: React.FC<DispatchStatsProps> = ({ campaigns }) => {
  const stats = campaigns.reduce((acc, campaign) => {
    acc.total += campaign.totalCount || campaign.contacts.length;
    acc.sent += campaign.sentCount || 0;
    acc.failed += campaign.failedCount || 0;
    
    if (campaign.status === 'sending') acc.processing++;
    
    return acc;
  }, {
    total: 0,
    sent: 0,
    failed: 0,
    processing: 0
  });

  const successRate = stats.total > 0 ? ((stats.sent / stats.total) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {/* Total de Mensagens */}
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.total.toLocaleString()}
            </h4>
            <span className="text-sm font-medium">Total de Mensagens</span>
          </div>
        </div>
      </div>

      {/* Em Processamento */}
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <Clock className="h-6 w-6 text-warning" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.processing}
            </h4>
            <span className="text-sm font-medium">Em Processamento</span>
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-warning">
            <Clock className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Enviadas com Sucesso */}
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <CheckCircle className="h-6 w-6 text-success" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.sent.toLocaleString()}
            </h4>
            <span className="text-sm font-medium">Enviadas com Sucesso</span>
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-success">
            {successRate}%
            <CheckCircle className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Falha no Envio */}
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <XCircle className="h-6 w-6 text-danger" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.failed.toLocaleString()}
            </h4>
            <span className="text-sm font-medium">Falha no Envio</span>
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-danger">
            <XCircle className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DispatchStats;
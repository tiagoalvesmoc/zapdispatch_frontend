import { useState, useEffect } from 'react';
import DispatchStats from '../../components/DispatchStats';
import ChartOne from '../../components/ChartOne.tsx';
import RecentDispatches from '../../components/RecentDispatches';
import { Campaign, DispatchLog } from '../../types';
import DefaultLayout from '../../layout/DefaultLayout.tsx';

const ECommerce = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'camp_1',
      name: 'Promoção Black Friday',
      message: 'Olá {nome}! Aproveite nossa super promoção de Black Friday com até 70% de desconto!',
      contacts: [],
      intervalBetweenMessages: 5,
      status: 'completed',
      createdAt: new Date('2024-11-25'),
      sentCount: 1250,
      totalCount: 1300,
      failedCount: 50
    },
    {
      id: 'camp_2',
      name: 'Lançamento Produto',
      message: 'Oi {nome}! Temos novidades incríveis para você. Confira nosso novo produto!',
      contacts: [],
      intervalBetweenMessages: 8,
      status: 'sending',
      createdAt: new Date('2024-12-01'),
      sentCount: 450,
      totalCount: 800,
      failedCount: 15
    }
  ]);

  const [recentDispatches] = useState<DispatchLog[]>([
    {
      id: 'dispatch_1',
      campaignId: 'camp_1',
      contactId: 'contact_1',
      contactName: 'João Silva',
      contactPhone: '11999887766',
      message: 'Olá João! Aproveite nossa super promoção...',
      status: 'delivered',
      sentAt: new Date('2024-12-01T10:30:00')
    },
    {
      id: 'dispatch_2',
      campaignId: 'camp_1',
      contactId: 'contact_2',
      contactName: 'Maria Santos',
      contactPhone: '11988776655',
      message: 'Olá Maria! Aproveite nossa super promoção...',
      status: 'sent',
      sentAt: new Date('2024-12-01T10:30:05')
    },
    {
      id: 'dispatch_3',
      campaignId: 'camp_2',
      contactId: 'contact_3',
      contactName: 'Pedro Costa',
      contactPhone: '11977665544',
      message: 'Oi Pedro! Temos novidades incríveis...',
      status: 'failed',
      sentAt: new Date('2024-12-01T11:15:00'),
      errorMessage: 'Número inválido'
    }
  ]);

  return (
    <DefaultLayout>
      {/* Estatísticas */}
      <DispatchStats campaigns={campaigns} />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Gráfico de Performance */}
        <ChartOne />
        
        {/* Envios Recentes */}
        <div className="col-span-12">
          <RecentDispatches dispatches={recentDispatches} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;

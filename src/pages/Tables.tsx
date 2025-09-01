import Breadcrumb from '../components/Breadcrumb';
import RecentDispatches from '../components/RecentDispatches';
import { useState } from 'react';
import { DispatchLog } from '../types';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  const [dispatches] = useState<DispatchLog[]>([
    {
      id: 'dispatch_1',
      campaignId: 'camp_001',
      contactId: 'contact_1',
      contactName: 'João Silva',
      contactPhone: '(11) 99988-7766',
      message: 'Olá João! Aproveite nossa super promoção de Black Friday com até 70% de desconto! Acesse: bit.ly/blackfriday2024',
      status: 'delivered',
      sentAt: new Date('2024-12-01T10:30:00')
    },
    {
      id: 'dispatch_2',
      campaignId: 'camp_001',
      contactId: 'contact_2',
      contactName: 'Maria Santos',
      contactPhone: '(11) 98877-6655',
      message: 'Olá Maria! Aproveite nossa super promoção de Black Friday com até 70% de desconto! Acesse: bit.ly/blackfriday2024',
      status: 'sent',
      sentAt: new Date('2024-12-01T10:30:05')
    },
    {
      id: 'dispatch_3',
      campaignId: 'camp_002',
      contactId: 'contact_3',
      contactName: 'Pedro Costa',
      contactPhone: '(11) 97766-5544',
      message: 'Oi Pedro! Temos novidades incríveis para você. Confira nosso novo produto! Link: bit.ly/novoproduto',
      status: 'failed',
      sentAt: new Date('2024-12-01T11:15:00'),
      errorMessage: 'Número inválido'
    },
    {
      id: 'dispatch_4',
      campaignId: 'camp_002',
      contactId: 'contact_4',
      contactName: 'Ana Oliveira',
      contactPhone: '(11) 96655-4433',
      message: 'Oi Ana! Temos novidades incríveis para você. Confira nosso novo produto! Link: bit.ly/novoproduto',
      status: 'pending',
      sentAt: undefined
    },
    {
      id: 'dispatch_5',
      campaignId: 'camp_001',
      contactId: 'contact_5',
      contactName: 'Carlos Ferreira',
      contactPhone: '(11) 95544-3322',
      message: 'Olá Carlos! Aproveite nossa super promoção de Black Friday com até 70% de desconto! Acesse: bit.ly/blackfriday2024',
      status: 'delivered',
      sentAt: new Date('2024-12-01T10:30:10')
    }
  ]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Envios Recentes" />

      <div className="flex flex-col gap-10">
        <RecentDispatches dispatches={dispatches} />
      </div>
    </DefaultLayout>
  );
};

export default Tables;

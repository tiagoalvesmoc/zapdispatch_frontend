import React from 'react';
import { Calendar, Clock, Users, Play, Pause, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Campaign } from '../types';

interface CampaignListProps {
  campaigns: Campaign[];
  onCampaignStart: (campaignId: string) => void;
  onCampaignPause: (campaignId: string) => void;
  onCampaignDelete: (campaignId: string) => void;
  onCampaignView: (campaign: Campaign) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onCampaignStart,
  onCampaignPause,
  onCampaignDelete,
  onCampaignView
}) => {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Campaign['status']) => {
    switch (status) {
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendada';
      case 'sending': return 'Enviando';
      case 'completed': return 'Concluída';
      case 'paused': return 'Pausada';
      case 'failed': return 'Falhou';
      default: return status;
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-8 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black dark:text-white mb-2">
            Nenhuma campanha criada
          </h3>
          <p className="text-gray-500">
            Importe contatos e crie sua primeira campanha de disparo
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Campanhas ({campaigns.length})
        </h3>
      </div>
      
      <div className="p-6.5">
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="border border-stroke rounded-lg p-4 hover:shadow-md transition-shadow dark:border-strokedark"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-black dark:text-white">
                      {campaign.name}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusText(campaign.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {campaign.message.substring(0, 100)}
                    {campaign.message.length > 100 && '...'}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{campaign.contacts.length} contatos</span>
                    </div>
                    
                    {campaign.scheduledDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(campaign.scheduledDate, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{campaign.intervalBetweenMessages}s intervalo</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {campaign.status === 'sending' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progresso</span>
                        <span>{campaign.sentCount}/{campaign.totalCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(campaign.sentCount / campaign.totalCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onCampaignView(campaign)}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                    title="Visualizar"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {campaign.status === 'draft' || campaign.status === 'scheduled' ? (
                    <button
                      onClick={() => onCampaignStart(campaign.id)}
                      className="p-2 text-green-500 hover:text-green-600 transition-colors"
                      title="Iniciar"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  ) : campaign.status === 'sending' ? (
                    <button
                      onClick={() => onCampaignPause(campaign.id)}
                      className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors"
                      title="Pausar"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                  ) : null}
                  
                  <button
                    onClick={() => onCampaignDelete(campaign.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
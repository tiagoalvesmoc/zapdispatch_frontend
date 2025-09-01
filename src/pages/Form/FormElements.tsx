import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ContactImport from '../../components/ContactImport';
import CampaignForm from '../../components/CampaignForm';
import CampaignList from '../../components/CampaignList';
import { Contact, Campaign } from '../../types';
import { CampaignScheduler } from '../../utils/campaignScheduler';
import DefaultLayout from '../../layout/DefaultLayout';

const FormElements = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const scheduler = CampaignScheduler.getInstance();

  const handleContactsImported = (newContacts: Contact[]) => {
    setContacts(prev => [...prev, ...newContacts]);
  };

  const handleCampaignCreate = (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'sentCount' | 'totalCount' | 'failedCount'>) => {
    const campaign: Campaign = {
      ...campaignData,
      id: `campaign_${Date.now()}`,
      createdAt: new Date(),
      sentCount: 0,
      totalCount: campaignData.contacts.length,
      failedCount: 0
    };

    setCampaigns(prev => [...prev, campaign]);

    // Se tem data agendada, agenda a campanha
    if (campaign.scheduledDate) {
      scheduler.scheduleCampaign(campaign, (progress) => {
        setCampaigns(prev => prev.map(c => 
          c.id === campaign.id 
            ? { ...c, status: 'sending' as const, sentCount: Math.floor((progress / 100) * c.totalCount) }
            : c
        ));
      });
    }
  };

  const handleCampaignStart = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    setCampaigns(prev => prev.map(c => 
      c.id === campaignId ? { ...c, status: 'sending' as const } : c
    ));

    scheduler.scheduleCampaign(campaign, (progress) => {
      setCampaigns(prev => prev.map(c => 
        c.id === campaignId 
          ? { ...c, sentCount: Math.floor((progress / 100) * c.totalCount) }
          : c
      ));

      if (progress === 100) {
        setCampaigns(prev => prev.map(c => 
          c.id === campaignId ? { ...c, status: 'completed' as const } : c
        ));
      }
    });
  };

  const handleCampaignPause = (campaignId: string) => {
    scheduler.pauseCampaign(campaignId);
    setCampaigns(prev => prev.map(c => 
      c.id === campaignId ? { ...c, status: 'paused' as const } : c
    ));
  };

  const handleCampaignDelete = (campaignId: string) => {
    scheduler.pauseCampaign(campaignId);
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  const handleCampaignView = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dispatch" />
      
      <div className="space-y-6">
        {/* Importação de Contatos */}
        <ContactImport onContactsImported={handleContactsImported} />
        
        {/* Formulário de Campanha */}
        {contacts.length > 0 && (
          <CampaignForm 
            contacts={contacts} 
            onCampaignCreate={handleCampaignCreate} 
          />
        )}
        
        {/* Lista de Campanhas */}
        {campaigns.length > 0 && (
          <CampaignList
            campaigns={campaigns}
            onCampaignStart={handleCampaignStart}
            onCampaignPause={handleCampaignPause}
            onCampaignDelete={handleCampaignDelete}
            onCampaignView={handleCampaignView}
          />
        )}
      </div>

      {/* Modal de Visualização de Campanha */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-boxdark rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {selectedCampaign.name}
              </h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-black dark:text-white mb-2">Mensagem:</h4>
                <div className="p-4 bg-gray-50 dark:bg-meta-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedCampaign.message}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-2">Contatos:</h4>
                  <p>{selectedCampaign.contacts.length}</p>
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-2">Intervalo:</h4>
                  <p>{selectedCampaign.intervalBetweenMessages}s</p>
                </div>
              </div>
              
              {selectedCampaign.scheduledDate && (
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-2">Agendado para:</h4>
                  <p>{format(selectedCampaign.scheduledDate, 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default FormElements;

import { Campaign, DispatchLog } from '../types';

export class CampaignScheduler {
  private static instance: CampaignScheduler;
  private scheduledCampaigns: Map<string, NodeJS.Timeout> = new Map();
  private activeCampaigns: Map<string, { campaign: Campaign; currentIndex: number }> = new Map();

  static getInstance(): CampaignScheduler {
    if (!CampaignScheduler.instance) {
      CampaignScheduler.instance = new CampaignScheduler();
    }
    return CampaignScheduler.instance;
  }

  scheduleCampaign(campaign: Campaign, onProgress?: (progress: number) => void): void {
    if (!campaign.scheduledDate) {
      this.startCampaign(campaign, onProgress);
      return;
    }

    const now = new Date();
    const delay = campaign.scheduledDate.getTime() - now.getTime();

    if (delay <= 0) {
      this.startCampaign(campaign, onProgress);
      return;
    }

    const timeout = setTimeout(() => {
      this.startCampaign(campaign, onProgress);
      this.scheduledCampaigns.delete(campaign.id);
    }, delay);

    this.scheduledCampaigns.set(campaign.id, timeout);
  }

  private async startCampaign(campaign: Campaign, onProgress?: (progress: number) => void): Promise<void> {
    this.activeCampaigns.set(campaign.id, { campaign, currentIndex: 0 });
    
    for (let i = 0; i < campaign.contacts.length; i++) {
      const contact = campaign.contacts[i];
      
      try {
        // Simula o envio da mensagem
        await this.sendMessage(campaign, contact);
        
        // Atualiza o progresso
        const progress = ((i + 1) / campaign.contacts.length) * 100;
        onProgress?.(progress);
        
        // Aguarda o intervalo entre mensagens (exceto na última)
        if (i < campaign.contacts.length - 1) {
          await this.delay(campaign.intervalBetweenMessages * 1000);
        }
        
      } catch (error) {
        console.error(`Erro ao enviar mensagem para ${contact.name}:`, error);
      }
    }
    
    this.activeCampaigns.delete(campaign.id);
  }

  private async sendMessage(campaign: Campaign, contact: any): Promise<void> {
    // Simula o tempo de envio
    await this.delay(1000 + Math.random() * 2000);
    
    // Simula falha ocasional (5% de chance)
    if (Math.random() < 0.05) {
      throw new Error('Falha na conexão com WhatsApp');
    }
    
    // Aqui seria a integração real com a API do WhatsApp
    console.log(`Mensagem enviada para ${contact.name} (${contact.phone}): ${campaign.message}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  pauseCampaign(campaignId: string): void {
    const timeout = this.scheduledCampaigns.get(campaignId);
    if (timeout) {
      clearTimeout(timeout);
      this.scheduledCampaigns.delete(campaignId);
    }
  }

  getCampaignStatus(campaignId: string): 'scheduled' | 'running' | 'idle' {
    if (this.scheduledCampaigns.has(campaignId)) return 'scheduled';
    if (this.activeCampaigns.has(campaignId)) return 'running';
    return 'idle';
  }

  getCampaignProgress(campaignId: string): number {
    const activeCampaign = this.activeCampaigns.get(campaignId);
    if (!activeCampaign) return 0;
    
    return (activeCampaign.currentIndex / activeCampaign.campaign.contacts.length) * 100;
  }
}
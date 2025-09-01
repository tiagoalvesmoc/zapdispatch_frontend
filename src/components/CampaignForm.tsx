import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Campaign, Contact } from '../types';

interface CampaignFormProps {
  contacts: Contact[];
  onCampaignCreate: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'sentCount' | 'totalCount' | 'failedCount'>) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ contacts, onCampaignCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    image: null as File | null,
    scheduledDate: '',
    scheduledTime: '',
    intervalBetweenMessages: 5,
    selectedContacts: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedContacts = contacts.filter(contact => 
      formData.selectedContacts.includes(contact.id)
    );

    let scheduledDate: Date | undefined;
    if (formData.scheduledDate && formData.scheduledTime) {
      scheduledDate = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
    }

    const campaign: Omit<Campaign, 'id' | 'createdAt' | 'sentCount' | 'totalCount' | 'failedCount'> = {
      name: formData.name,
      message: formData.message,
      contacts: selectedContacts,
      scheduledDate,
      intervalBetweenMessages: formData.intervalBetweenMessages,
      status: scheduledDate ? 'scheduled' : 'draft'
    };

    onCampaignCreate(campaign);
    
    // Reset form
    setFormData({
      name: '',
      message: '',
      image: null,
      scheduledDate: '',
      scheduledTime: '',
      intervalBetweenMessages: 5,
      selectedContacts: []
    });
  };

  const toggleContactSelection = (contactId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedContacts: prev.selectedContacts.includes(contactId)
        ? prev.selectedContacts.filter(id => id !== contactId)
        : [...prev.selectedContacts, contactId]
    }));
  };

  const selectAllContacts = () => {
    setFormData(prev => ({
      ...prev,
      selectedContacts: prev.selectedContacts.length === contacts.length 
        ? [] 
        : contacts.map(c => c.id)
    }));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Nova Campanha
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6.5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Nome da Campanha */}
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Nome da Campanha
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Promoção Black Friday"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required
            />
          </div>

          {/* Intervalo entre mensagens */}
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Intervalo entre mensagens (segundos)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="300"
                value={formData.intervalBetweenMessages}
                onChange={(e) => setFormData(prev => ({ ...prev, intervalBetweenMessages: parseInt(e.target.value) || 5 }))}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-12 pr-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 5-10 segundos para evitar bloqueios
            </p>
          </div>
        </div>

        {/* Mensagem */}
        <div className="mt-6">
          <label className="mb-3 block text-black dark:text-white">
            Mensagem
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={6}
              placeholder="Digite sua mensagem aqui... Use {nome} para personalizar com o nome do contato"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-12 pr-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Caracteres: {formData.message.length}/1000
          </p>
        </div>

        {/* Agendamento */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Data do Envio (opcional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-12 pr-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Horário do Envio
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-12 pr-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Seleção de Contatos */}
        {contacts.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-black dark:text-white">
                Selecionar Contatos ({formData.selectedContacts.length}/{contacts.length})
              </label>
              <button
                type="button"
                onClick={selectAllContacts}
                className="text-sm text-primary hover:underline"
              >
                {formData.selectedContacts.length === contacts.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto border border-stroke rounded-lg dark:border-strokedark">
              {contacts.map((contact) => (
                <label
                  key={contact.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-meta-4 cursor-pointer border-b border-stroke last:border-b-0 dark:border-strokedark"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedContacts.includes(contact.id)}
                    onChange={() => toggleContactSelection(contact.id)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-black dark:text-white">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  {contact.group && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {contact.group}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={formData.selectedContacts.length === 0 || !formData.message.trim() || !formData.name.trim()}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Users className="h-4 w-4" />
            {formData.scheduledDate ? 'Agendar Campanha' : 'Criar Campanha'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
import * as XLSX from 'xlsx';
import { Contact } from '../types';

export const importContactsFromExcel = (file: File): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const contacts: Contact[] = jsonData.map((row: any, index: number) => {
          // Aceita diferentes formatos de colunas
          const name = row['Nome'] || row['Name'] || row['nome'] || row['NOME'] || `Contato ${index + 1}`;
          const phone = row['Telefone'] || row['Phone'] || row['telefone'] || row['TELEFONE'] || 
                       row['Celular'] || row['celular'] || row['CELULAR'] || row['WhatsApp'] || row['whatsapp'];
          const email = row['Email'] || row['email'] || row['EMAIL'] || row['E-mail'] || row['e-mail'];
          const group = row['Grupo'] || row['Group'] || row['grupo'] || row['GRUPO'];
          
          if (!phone) {
            throw new Error(`Telefone não encontrado na linha ${index + 1}`);
          }
          
          // Limpa e valida o número de telefone
          const cleanPhone = phone.toString().replace(/\D/g, '');
          
          if (cleanPhone.length < 10) {
            throw new Error(`Número de telefone inválido na linha ${index + 1}: ${phone}`);
          }
          
          return {
            id: `contact_${Date.now()}_${index}`,
            name: name.toString(),
            phone: cleanPhone,
            email: email?.toString(),
            group: group?.toString(),
            status: 'active' as const,
            createdAt: new Date()
          };
        });
        
        resolve(contacts);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
    reader.readAsBinaryString(file);
  });
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  } else if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  }
  
  return phone;
};
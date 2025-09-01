import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, Users, AlertCircle } from 'lucide-react';
import { importContactsFromExcel } from '../utils/excelImport';
import { Contact } from '../types';

interface ContactImportProps {
  onContactsImported: (contacts: Contact[]) => void;
}

const ContactImport: React.FC<ContactImportProps> = ({ onContactsImported }) => {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewContacts, setPreviewContacts] = useState<Contact[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setImporting(true);
    setError(null);

    try {
      const contacts = await importContactsFromExcel(file);
      setPreviewContacts(contacts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao importar arquivo');
    } finally {
      setImporting(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const confirmImport = () => {
    onContactsImported(previewContacts);
    setPreviewContacts([]);
  };

  const cancelImport = () => {
    setPreviewContacts([]);
    setError(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Importar Contatos
        </h3>
      </div>
      
      <div className="p-6.5">
        {previewContacts.length === 0 ? (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-stroke dark:border-strokedark hover:border-primary'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {importing ? (
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Upload className="h-8 w-8 text-primary" />
                  )}
                </div>
                
                <div>
                  <p className="text-lg font-medium text-black dark:text-white">
                    {isDragActive ? 'Solte o arquivo aqui' : 'Arraste um arquivo Excel ou clique para selecionar'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Formatos aceitos: .xlsx, .xls, .csv
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Formato da Planilha:</h4>
              <p className="text-sm text-blue-700 mb-2">
                Sua planilha deve conter as seguintes colunas:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Nome</strong> - Nome do contato</li>
                <li>• <strong>Telefone</strong> - Número do WhatsApp (obrigatório)</li>
                <li>• <strong>Email</strong> - Email do contato (opcional)</li>
                <li>• <strong>Grupo</strong> - Grupo do contato (opcional)</li>
              </ul>
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FileSpreadsheet className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-medium text-black dark:text-white">
                  {previewContacts.length} contatos encontrados
                </h4>
                <p className="text-sm text-gray-500">
                  Revise os dados antes de importar
                </p>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto border border-stroke rounded-lg dark:border-strokedark">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-meta-4">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">Nome</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Telefone</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Grupo</th>
                  </tr>
                </thead>
                <tbody>
                  {previewContacts.slice(0, 10).map((contact, index) => (
                    <tr key={index} className="border-t border-stroke dark:border-strokedark">
                      <td className="px-4 py-2 text-sm">{contact.name}</td>
                      <td className="px-4 py-2 text-sm">{contact.phone}</td>
                      <td className="px-4 py-2 text-sm">{contact.group || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {previewContacts.length > 10 && (
                <div className="p-2 text-center text-sm text-gray-500">
                  ... e mais {previewContacts.length - 10} contatos
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={confirmImport}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Users className="h-4 w-4" />
                Importar Contatos
              </button>
              <button
                onClick={cancelImport}
                className="px-6 py-2 border border-stroke rounded-lg hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactImport;
import React, { useState } from 'react';

interface UploadSectionProps {
  onDocumentsValidated: (isValid: boolean, documentInfo?: any) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onDocumentsValidated }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

      // Create preview URLs for images
      filesArray.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrls(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
    setPreviewUrls(urls => urls.filter((_, i) => i !== index));
  };

  const validateDocuments = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Por favor, faça upload de pelo menos um documento de identificação.');
      return;
    }

    setValidationStatus('validating');

    try {
      const results = await Promise.all(
        selectedFiles.map(async (file) => {
          const text = await extractTextFromFile(file);
          const cpfMatch = text.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/);
          const rgMatch = text.match(/\d{1,2}\.?\d{3}\.?\d{3}-?[A-Z0-9]?/);

          return {
            fileName: file.name,
            text,
            cpf: cpfMatch ? cpfMatch[0] : null,
            rg: rgMatch ? rgMatch[0] : null,
          };
        })
      );

      const hasValidDocument = results.some(res => res.cpf || res.rg);

      if (hasValidDocument) {
        setValidationStatus('success');
        onDocumentsValidated(true, {
          documentCount: selectedFiles.length,
          documents: results,
        });
      } else {
        throw new Error('Nenhum CPF ou RG detectado');
      }

    } catch (error) {
      setValidationStatus('error');
      setErrorMessage('Falha na validação dos documentos. Verifique se o conteúdo está legível.');
      onDocumentsValidated(false);
    }

  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'por');
    formData.append('isOverlayRequired', 'false');

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        apikey: 'K88116183188957',
      },
      body: formData,
    });

    const result = await response.json();
    return result.ParsedResults?.[0]?.ParsedText || '';
  };


  const renderDocumentsList = () => {
    if (selectedFiles.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          Nenhum documento selecionado
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium truncate" title={file.name}>
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>

            {file.type.startsWith('image/') && previewUrls[index] && (
              <div className="h-40 overflow-hidden rounded border bg-white flex items-center justify-center">
                <img
                  src={previewUrls[index]}
                  alt={`Preview of ${file.name}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            {!file.type.startsWith('image/') && (
              <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-600">
                  {file.type.split('/')[1]?.toUpperCase() || 'Documento'}
                </span>
              </div>
            )}

            <div className="text-sm text-gray-500 mt-2">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload de Documentos</h2>
      <p className="text-gray-600 mb-4">
        Faça o upload de documentos de identificação (RG, CPF) para validarmos sua identidade.
        Aceitamos arquivos nos formatos JPG, PNG e PDF.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          id="document-upload"
          multiple
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="document-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Selecionar Arquivos
        </label>
        <p className="text-gray-500 text-sm mt-2">
          Arraste seus arquivos para cá ou clique para selecionar
        </p>
      </div>

      {renderDocumentsList()}

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={validateDocuments}
          disabled={selectedFiles.length === 0 || validationStatus === 'validating'}
          className={`w-full cursor-pointer py-2 px-4 rounded-md ${validationStatus === 'validating'
              ? 'bg-gray-400 cursor-not-allowed'
              : validationStatus === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium`}
        >
          {validationStatus === 'validating' ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Validando...
            </span>
          ) : validationStatus === 'success' ? (
            'Documentos Validados ✓'
          ) : (
            'Validar Documentos'
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
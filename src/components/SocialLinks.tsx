import React, { useState } from 'react';

interface SocialLinksProps {
  onSocialLinksSubmitted: (socialData: SocialData) => void;
}

export interface SocialData {
  twitter: string;
  instagram: string;
  facebook: string;
  twitch: string;
  discord: string;
  steam: string;
  esportsLinks: {
    platform: string;
    username: string;
    url: string;
    isValidated: boolean;
  }[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ onSocialLinksSubmitted }) => {
  const [socialData, setSocialData] = useState<SocialData>({
    twitter: '',
    instagram: '',
    facebook: '',
    twitch: '',
    discord: '',
    steam: '',
    esportsLinks: []
  });

  const [newEsportsLink, setNewEsportsLink] = useState({
    platform: '',
    username: '',
    url: ''
  });

  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEsportsLinkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEsportsLink(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addEsportsLink = async () => {
    if (!newEsportsLink.platform || !newEsportsLink.url) {
      setValidationResult({
        isValid: false,
        message: 'Por favor, preencha a plataforma e URL.'
      });
      return;
    }

    setValidating(true);
    setValidationResult(null);

    try {
      // Simulação de validação via IA - em um cenário real, isso seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular uma validação bem-sucedida
      const isValid = true; // Aqui você poderia verificar se o conteúdo é relevante ao perfil do usuário
      
      if (isValid) {
        setSocialData(prev => ({
          ...prev,
          esportsLinks: [
            ...prev.esportsLinks,
            {
              ...newEsportsLink,
              isValidated: true
            }
          ]
        }));
        
        setNewEsportsLink({
          platform: '',
          username: '',
          url: ''
        });
        
        setValidationResult({
          isValid: true,
          message: 'Link validado com sucesso!'
        });
      } else {
        setValidationResult({
          isValid: false,
          message: 'O conteúdo não parece estar relacionado com esports ou FURIA.'
        });
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: 'Erro ao validar o link. Por favor, tente novamente.'
      });
    } finally {
      setValidating(false);
    }
  };

  const removeEsportsLink = (index: number) => {
    setSocialData(prev => ({
      ...prev,
      esportsLinks: prev.esportsLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSocialLinksSubmitted(socialData);
  };

  const esportsPlatforms = [
    { value: '', label: 'Selecione uma plataforma' },
    { value: 'faceit', label: 'FACEIT' },
    { value: 'esea', label: 'ESEA' },
    { value: 'battlefy', label: 'Battlefy' },
    { value: 'challengermode', label: 'Challengermode' },
    { value: 'gamersclub', label: 'Gamers Club' },
    { value: 'esl', label: 'ESL' },
    { value: 'leetify', label: 'Leetify' },
    { value: 'tracker', label: 'Tracker.gg' },
    { value: 'other', label: 'Outro' }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Redes Sociais</h2>
      <p className="text-gray-600 mb-6">
        Conecte suas redes sociais para melhorarmos sua experiência e identificarmos suas interações com FURIA.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Principais Redes Sociais</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitter/X</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="twitter"
                  value={socialData.twitter}
                  onChange={handleSocialInputChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300"
                  placeholder="username"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="instagram"
                  value={socialData.instagram}
                  onChange={handleSocialInputChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300"
                  placeholder="username"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                type="text"
                name="facebook"
                value={socialData.facebook}
                onChange={handleSocialInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Seu perfil do Facebook"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitch</label>
              <input
                type="text"
                name="twitch"
                value={socialData.twitch}
                onChange={handleSocialInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Seu canal da Twitch"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Discord</label>
              <input
                type="text"
                name="discord"
                value={socialData.discord}
                onChange={handleSocialInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Seu usuário do Discord"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Steam</label>
              <input
                type="text"
                name="steam"
                value={socialData.steam}
                onChange={handleSocialInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Seu ID da Steam"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Links de E-Sports</h3>
          <p className="text-sm text-gray-600">
            Adicione links para seus perfis em plataformas de e-sports. Nosso sistema validará se o conteúdo é relevante para seu perfil.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Plataforma</label>
              <select
                name="platform"
                value={newEsportsLink.platform}
                onChange={handleEsportsLinkChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {esportsPlatforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
              <input
                type="text"
                name="username"
                value={newEsportsLink.username}
                onChange={handleEsportsLinkChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Seu nome de usuário na plataforma"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">URL do Perfil</label>
              <input
                type="url"
                name="url"
                value={newEsportsLink.url}
                onChange={handleEsportsLinkChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://plataforma.com/seu-perfil"
              />
            </div>
            
            <div>
              <button
                type="button"
                onClick={addEsportsLink}
                disabled={validating}
                className={`w-full py-2 font-medium rounded-md ${
                  validating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {validating ? (
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
                ) : (
                  'Adicionar e Validar Link'
                )}
              </button>
            </div>
            
            {validationResult && (
              <div
                className={`p-3 rounded-md ${
                  validationResult.isValid
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {validationResult.message}
              </div>
            )}
          </div>
          
          {socialData.esportsLinks.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-medium mb-2">Links adicionados:</h4>
              <ul className="space-y-2">
                {socialData.esportsLinks.map((link, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
                  >
                    <div>
                      <span className="font-medium">{link.platform}</span>
                      {link.username && <span className="ml-2 text-gray-600">({link.username})</span>}
                      <div className="text-sm text-gray-500">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link.url}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {link.isValidated && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                          Validado
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeEsportsLink(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              Concluir
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SocialLinks;
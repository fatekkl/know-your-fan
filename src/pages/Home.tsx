import React, { useState } from 'react';
import FanForm, { FanFormData } from '../components/FanForm';
import UploadSection from '../components/UploadSection';
import SocialLinks, { SocialData } from '../components/SocialLinks';
import Header from '../components/Header';
// Importando a imagem
import pantherBackground from '../assets/panther.jpg';

const Home: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  const [documentsValidated, setDocumentsValidated] = useState(false);
  const [socialLinksSubmitted, setSocialLinksSubmitted] = useState(false);

  console.log(formCompleted)
  console.log(documentsValidated)
  console.log(socialLinksSubmitted)
  
  const [userData, setUserData] = useState<{
    fanData?: FanFormData;
    documentInfo?: any;
    socialData?: SocialData;
  }>({});

  const handleFormSubmit = (formData: FanFormData) => {
    setUserData(prev => ({ ...prev, fanData: formData }));
    setFormCompleted(true);
    setCurrentStep(2);
  };

  const handleDocumentsValidated = (isValid: boolean, documentInfo?: any) => {
    if (isValid) {
      setUserData(prev => ({ ...prev, documentInfo }));
      setDocumentsValidated(true);
      setCurrentStep(3);
    }
  };

  const handleSocialLinksSubmitted = (socialData: SocialData) => {
    setUserData(prev => ({ ...prev, socialData }));
    setSocialLinksSubmitted(true);
    setCurrentStep(4); // Final summary step
  };

  const handleFinish = async () => {
    console.log('All data collected:', userData);
    
    try {
      const response = await fetch('http://localhost:5000/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) throw new Error('Erro ao salvar');
  
      const data = await response.json();
      console.log('Salvo com sucesso, ID:', data.id);
      setCurrentStep(5);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };
  

  const renderProgressBar = () => {
    

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
         
        </div>
        
        <div className="mt-4 relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <FanForm onFormSubmit={handleFormSubmit} />;
      case 2:
        return <UploadSection onDocumentsValidated={handleDocumentsValidated} />;
      case 3:
        return <SocialLinks onSocialLinksSubmitted={handleSocialLinksSubmitted} />;
      case 4:
        return renderSummary();
      case 5:
        return renderSuccess();
      default:
        return <FanForm onFormSubmit={handleFormSubmit} />;
    }
  };

  const renderSummary = () => {
    const { fanData, documentInfo, socialData } = userData;

    if (!fanData) return null;

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Resumo das Informações</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Dados do Fã</h3>
            <div className="mt-2 bg-gray-50 rounded-md p-4">
              <p><span className="font-medium">Nome:</span> {fanData.name}</p>
              <p><span className="font-medium">Email:</span> {fanData.email}</p>
              <p><span className="font-medium">CPF:</span> {fanData.cpf}</p>
              <p><span className="font-medium">Data de Nascimento:</span> {fanData.birthDate}</p>
              
              <div className="mt-2">
                <p className="font-medium">Endereço:</p>
                <p>
                  {fanData.address.street}, {fanData.address.number}
                  {fanData.address.complement && `, ${fanData.address.complement}`}<br />
                  {fanData.address.city} - {fanData.address.state}, CEP: {fanData.address.zipCode}
                </p>
              </div>
            </div>
          </div>
          
          {documentInfo && (
            <div>
              <h3 className="text-lg font-semibold">Documentos</h3>
              <div className="mt-2 bg-gray-50 rounded-md p-4">
                <p><span className="font-medium">Tipo:</span> {documentInfo.documentType}</p>
                <p><span className="font-medium">Data de Validação:</span> {new Date(documentInfo.validationDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Documentos Enviados:</span> {documentInfo.documentCount}</p>
              </div>
            </div>
          )}
          
          {socialData && (
            <div>
              <h3 className="text-lg font-semibold">Redes Sociais</h3>
              <div className="mt-2 bg-gray-50 rounded-md p-4">
                {socialData.twitter && <p><span className="font-medium">Twitter/X:</span> @{socialData.twitter}</p>}
                {socialData.instagram && <p><span className="font-medium">Instagram:</span> @{socialData.instagram}</p>}
                {socialData.facebook && <p><span className="font-medium">Facebook:</span> {socialData.facebook}</p>}
                {socialData.twitch && <p><span className="font-medium">Twitch:</span> {socialData.twitch}</p>}
                {socialData.discord && <p><span className="font-medium">Discord:</span> {socialData.discord}</p>}
                {socialData.steam && <p><span className="font-medium">Steam:</span> {socialData.steam}</p>}
                
                {socialData.esportsLinks.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Links de E-Sports:</p>
                    <ul className="list-disc pl-5 mt-1">
                      {socialData.esportsLinks.map((link, index) => (
                        <li key={index}>
                          {link.platform}: {link.username} - <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ver perfil</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleFinish}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-medium"
          >
            Finalizar Cadastro
          </button>
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mt-4 mb-2">Cadastro Concluído!</h2>
        <p className="text-gray-600 mb-6">
          Obrigado por se cadastrar como fã da FURIA! Suas informações foram salvas com sucesso.
          Agora você receberá experiências e serviços exclusivos baseados no seu perfil de fã.
        </p>
        
        <div className="text-center">
          <p className="font-medium mb-2">O que acontece agora?</p>
          <ul className="text-left text-gray-600 inline-block">
            <li className="flex items-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Você receberá um email de confirmação.
            </li>
            <li className="flex items-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nossa equipe vai analisar seus dados para personalizar sua experiência.
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Em breve você terá acesso a promoções exclusivas e eventos especiais!
            </li>
          </ul>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 font-medium"
          >
            Ir para o Dashboard
          </button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-furia_black py-12 w-screen"
      style={{
        backgroundImage: `url(${pantherBackground})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Header />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Know Your Fan</h1>
          
          {renderProgressBar()}
          
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Home;
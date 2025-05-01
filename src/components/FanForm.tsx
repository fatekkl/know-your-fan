import React, { useState, useEffect } from 'react';

interface FanFormProps {
    onFormSubmit: (formData: FanFormData) => void;
}

export interface FanFormData {
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    interests: string[];
    eventsAttended: string[];
    purchasedItems: string[];
}

const FanForm: React.FC<FanFormProps> = ({ onFormSubmit }) => {
    const [formData, setFormData] = useState<FanFormData>({
        name: '',
        email: '',
        cpf: '',
        birthDate: '',
        address: {
            street: '',
            number: '',
            complement: '',
            city: '',
            state: '',
            zipCode: '',
        },
        interests: [],
        eventsAttended: [],
        purchasedItems: [],
    });

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [newInterest, setNewInterest] = useState<string>('');
    const [newEvent, setNewEvent] = useState<string>('');
    const [newPurchase, setNewPurchase] = useState<string>('');
    
    // Objetos para controlar a validação de cada campo
    const [validations, setValidations] = useState({
        name: true,
        email: true,
        cpf: true,
        birthDate: true,
        address: {
            street: true,
            number: true,
            city: true,
            state: true,
            zipCode: true,
        }
    });

    // Para verificar se o passo atual está válido
    const [currentStepValid, setCurrentStepValid] = useState<boolean>(false);

    // Atualiza o status de validação do passo atual quando os dados mudam
    useEffect(() => {
        validateCurrentStep();
    }, [formData, currentStep, validations]);

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            // Verifica os campos do passo 1
            const isStep1Valid = 
                formData.name.trim() !== '' && 
                formData.email.trim() !== '' && 
                formData.cpf.trim() !== '' && 
                formData.birthDate.trim() !== '' &&
                validations.name && 
                validations.email && 
                validations.cpf && 
                validations.birthDate;
            
            setCurrentStepValid(isStep1Valid);
        } else if (currentStep === 2) {
            // Verifica os campos do passo 2
            const isStep2Valid = 
                formData.address.street.trim() !== '' && 
                formData.address.number.trim() !== '' && 
                formData.address.city.trim() !== '' && 
                formData.address.state.trim() !== '' && 
                formData.address.zipCode.trim() !== '' &&
                validations.address.street &&
                validations.address.number &&
                validations.address.city &&
                validations.address.state &&
                validations.address.zipCode;
            
            setCurrentStepValid(isStep2Valid);
        } else if (currentStep === 3) {
            // O passo 3 não tem validações obrigatórias específicas
            setCurrentStepValid(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent as keyof FanFormData] as object,
                    [child]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateName = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (value.trim().length < 3) {
            e.target.style.border = "2px solid red";
            setValidations(prev => ({...prev, name: false}));
            return false;
        }

        e.target.style.border = "";
        setValidations(prev => ({...prev, name: true}));
        return true;
    };

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(value)) {
            e.target.style.border = "2px solid red";
            setValidations(prev => ({...prev, email: false}));
            return false;
        }

        e.target.style.border = "";
        setValidations(prev => ({...prev, email: true}));
        return true;
    };

    const validateCPF = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
    
        // Remove caracteres não numéricos
        const cpf = value.replace(/[^\d]+/g, '');
    
        // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            e.target.style.border = "2px solid red";
            setValidations(prev => ({...prev, cpf: false}));
            return false;
        }
    
        let soma = 0;
        let resto;
    
        // Valida o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf[i - 1]) * (11 - i);
        }
    
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) {
            e.target.style.border = "2px solid red";
            setValidations(prev => ({...prev, cpf: false}));
            return false;
        }
    
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf[i - 1]) * (12 - i);
        }
    
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) {
            e.target.style.border = "2px solid red";
            setValidations(prev => ({...prev, cpf: false}));
            return false;
        }
    
        e.target.style.border = "";
        setValidations(prev => ({...prev, cpf: true}));
        return true;
    };

    const validateBirthDate = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const currentDate = new Date();
        const birthDate = new Date(value);

        // Verifica se a data de nascimento é válida
        if (isNaN(birthDate.getTime())) {
            e.target.style.border = '2px solid red';
            setValidations(prev => ({...prev, birthDate: false}));
            return false;
        }

        // Verifica se a data de nascimento não é no futuro
        if (birthDate > currentDate) {
            e.target.style.border = '2px solid red';
            setValidations(prev => ({...prev, birthDate: false}));
            return false;
        }

        // Verifica se a pessoa tem pelo menos 18 anos
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const month = currentDate.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            e.target.style.border = '2px solid red';
            setValidations(prev => ({...prev, birthDate: false}));
            return false;
        }

        // Se tudo estiver correto, limpa a borda e o estado de erro
        e.target.style.border = '';
        setValidations(prev => ({...prev, birthDate: true}));
        return true;
    };
    
    const validateZipCode = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        
        // Remove caracteres não numéricos
        const zipCode = value.replace(/[^\d]+/g, '');
        
        // CEP brasileiro deve ter 8 dígitos
        if (zipCode.length !== 8) {
            e.target.style.border = '2px solid red';
            setValidations(prev => ({
                ...prev, 
                address: {...prev.address, zipCode: false}
            }));
            return false;
        }
        
        e.target.style.border = '';
        setValidations(prev => ({
            ...prev, 
            address: {...prev.address, zipCode: true}
        }));
        return true;
    };
    
    const validateAddressField = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const field = name.split('.')[1];
        
        if (value.trim() === '') {
            e.target.style.border = '2px solid red';
            setValidations(prev => ({
                ...prev, 
                address: {...prev.address, [field]: false}
            }));
            return false;
        }
        
        e.target.style.border = '';
        setValidations(prev => ({
            ...prev, 
            address: {...prev.address, [field]: true}
        }));
        return true;
    };

    const handleAddInterest = () => {
        if (newInterest.trim()) {
            setFormData({
                ...formData,
                interests: [...formData.interests, newInterest.trim()]
            });
            setNewInterest('');
        }
    };

    const handleAddEvent = () => {
        if (newEvent.trim()) {
            setFormData({
                ...formData,
                eventsAttended: [...formData.eventsAttended, newEvent.trim()]
            });
            setNewEvent('');
        }
    };

    const handleAddPurchase = () => {
        if (newPurchase.trim()) {
            setFormData({
                ...formData,
                purchasedItems: [...formData.purchasedItems, newPurchase.trim()]
            });
            setNewPurchase('');
        }
    };

    const handleRemoveItem = (array: keyof FanFormData, index: number) => {
        const updatedArray = [...formData[array] as string[]];
        updatedArray.splice(index, 1);
        setFormData({
            ...formData,
            [array]: updatedArray
        });
    };

    const nextStep = () => {
        // Verifica se o passo atual está válido antes de avançar
        if (currentStepValid) {
            setCurrentStep(currentStep + 1);
        } else {
            // Mostrar mensagem de erro ou indicar visualmente que há campos inválidos
            alert("Por favor, preencha corretamente todos os campos obrigatórios.");
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Verifica se todos os dados obrigatórios estão preenchidos antes de enviar
        if (currentStepValid) {
            onFormSubmit(formData);
        } else {
            alert("Por favor, verifique se todos os dados estão preenchidos corretamente.");
        }
    };

    const renderPersonalInfoStep = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Informações Pessoais</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                        handleChange(e);
                        validateName(e);
                    }}
                    onBlur={validateName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
                {!validations.name && formData.name.trim() !== '' && (
                    <p className="text-red-500 text-sm mt-1">Nome inválido. Mínimo de 3 caracteres.</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                        handleChange(e);
                        validateEmail(e);
                    }}
                    onBlur={validateEmail}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
                {!validations.email && formData.email.trim() !== '' && (
                    <p className="text-red-500 text-sm mt-1">Email inválido.</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">CPF *</label>
                <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={(e) => {
                        handleChange(e);
                        validateCPF(e);
                    }}
                    onBlur={validateCPF}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
                {!validations.cpf && formData.cpf.trim() !== '' && (
                    <p className="text-red-500 text-sm mt-1">CPF inválido.</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Data de Nascimento *</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={(e) => {
                        handleChange(e);
                        validateBirthDate(e);
                    }}
                    onBlur={validateBirthDate}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
                {!validations.birthDate && formData.birthDate.trim() !== '' && (
                    <p className="text-red-500 text-sm mt-1">Data inválida. Você deve ter pelo menos 18 anos.</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!currentStepValid}
                    className={`px-4 py-2 rounded-md ${
                        currentStepValid 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                >
                    Próximo
                </button>
            </div>
        </div>
    );

    const renderAddressStep = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Endereço</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Rua *</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={(e) => {
                        handleChange(e);
                        validateAddressField(e);
                    }}
                    onBlur={validateAddressField}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Número *</label>
                    <input
                        type="text"
                        name="address.number"
                        value={formData.address.number}
                        onChange={(e) => {
                            handleChange(e);
                            validateAddressField(e);
                        }}
                        onBlur={validateAddressField}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Complemento</label>
                    <input
                        type="text"
                        name="address.complement"
                        value={formData.address.complement}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">CEP *</label>
                <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={(e) => {
                        handleChange(e);
                        validateZipCode(e);
                    }}
                    onBlur={validateZipCode}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
                {!validations.address.zipCode && formData.address.zipCode.trim() !== '' && (
                    <p className="text-red-500 text-sm mt-1">CEP inválido. Deve conter 8 dígitos.</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cidade *</label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={(e) => {
                            handleChange(e);
                            validateAddressField(e);
                        }}
                        onBlur={validateAddressField}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado *</label>
                    <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={(e) => {
                            handleChange(e);
                            validateAddressField(e);
                        }}
                        onBlur={validateAddressField}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Anterior
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!currentStepValid}
                    className={`px-4 py-2 rounded-md ${
                        currentStepValid 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                >
                    Próximo
                </button>
            </div>
        </div>
    );

    const renderInterestsStep = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Interesses e Atividades</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Adicionar Interesse em E-Sports</label>
                <div className="flex mt-1 gap-4">
                    <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                        placeholder="Ex: Counter-Strike, League of Legends"
                    />
                    <button
                        type="button"
                        onClick={handleAddInterest}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            {formData.interests.length > 0 && (
                <div>
                    <h3 className="text-md font-semibold">Seus interesses:</h3>
                    <ul className="mt-2 space-y-2">
                        {formData.interests.map((interest, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                <span>{interest}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('interests', index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Eventos que Participou no Último Ano</label>
                <div className="flex mt-1 gap-4">
                    <input
                        type="text"
                        value={newEvent}
                        onChange={(e) => setNewEvent(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                        placeholder="Ex: Major Rio 2022, CBLOL Finals"
                    />
                    <button
                        type="button"
                        onClick={handleAddEvent}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            {formData.eventsAttended.length > 0 && (
                <div>
                    <h3 className="text-md font-semibold">Eventos que você participou:</h3>
                    <ul className="mt-2 space-y-2">
                        {formData.eventsAttended.map((event, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                <span>{event}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('eventsAttended', index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Produtos que Comprou no Último Ano</label>
                <div className="flex mt-1 gap-4">
                    <input
                        type="text"
                        value={newPurchase}
                        onChange={(e) => setNewPurchase(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                        placeholder="Ex: Camisa FURIA 2023, Mousepad"
                    />
                    <button
                        type="button"
                        onClick={handleAddPurchase}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            {formData.purchasedItems.length > 0 && (
                <div>
                    <h3 className="text-md font-semibold">Produtos que você comprou:</h3>
                    <ul className="mt-2 space-y-2">
                        {formData.purchasedItems.map((item, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                <span>{item}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('purchasedItems', index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Anterior
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Finalizar
                </button>
            </div>
        </div>
    );

    const steps = [
        renderPersonalInfoStep,
        renderAddressStep,
        renderInterestsStep
    ];

    return (
        <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="mb-6">
                <div className="relative h-2 bg-gray-200 rounded-full">
                    <div
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    />
                </div>
            </div>

            {steps[currentStep - 1]()}
        </form>
    );
};

export default FanForm;
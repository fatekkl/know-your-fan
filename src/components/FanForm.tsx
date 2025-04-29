import React, { useState } from 'react';

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
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFormSubmit(formData);
    };

    const renderPersonalInfoStep = () => (
        <div className="space-y-4 ">
            <h2 className="text-xl font-bold">Informações Pessoais</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">CPF</label>
                <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
                <label className="block text-sm font-medium text-gray-700">Rua</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Número</label>
                    <input
                        type="text"
                        name="address.number"
                        value={formData.address.number}
                        onChange={handleChange}
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
                <label className="block text-sm font-medium text-gray-700">CEP</label>
                <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-furia_black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
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
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
                <div className="flex mt-1">
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
                <div className="flex mt-1">
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
                <div className="flex mt-1">
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
                    type="button"
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
        <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
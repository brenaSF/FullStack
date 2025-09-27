// ModalContext.js
import { createContext, useState, useContext } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [avisoMessage, setAvisoMessage] = useState(''); // Estado mantido por você

    // Função única para abrir o modal, recebendo o tipo e a mensagem
    const abrirModal = (message, isError = true) => {
        if (isError) {
            setErrorMessage(message);
            setAvisoMessage(''); // Limpa o aviso se for um erro
        } else {
            setAvisoMessage(message);
            setErrorMessage(''); // Limpa o erro se for um aviso
        }
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        // Opcional: Limpar mensagens ao fechar
        setErrorMessage('');
        setAvisoMessage('');
    };

    const value = {
        modalOpen,
        errorMessage,
        avisoMessage,
        abrirModal,
        fecharModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
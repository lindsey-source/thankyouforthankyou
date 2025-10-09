import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WizardCardData {
  // Step 1
  occasion: string | null;
  
  // Step 2
  templateId: string | null;
  colorPalette: any;
  fontChoice: string | null;
  
  // Step 3
  messageHeadline: string;
  messageBody: string;
  closing: string;
  
  // Step 4
  photoUrl: string | null;
  envelopeColor: string | null;
  texture: string | null;
  signatureStyle: string | null;
  
  // Step 5
  charityId: string | null;
  donationAmount: number;
  recipientName: string;
  recipientEmail: string;
}

interface CardWizardContextType {
  currentStep: number;
  cardData: WizardCardData;
  setCurrentStep: (step: number) => void;
  updateCardData: (data: Partial<WizardCardData>) => void;
  resetWizard: () => void;
}

const initialCardData: WizardCardData = {
  occasion: null,
  templateId: null,
  colorPalette: {},
  fontChoice: null,
  messageHeadline: '',
  messageBody: '',
  closing: '',
  photoUrl: null,
  envelopeColor: null,
  texture: null,
  signatureStyle: null,
  charityId: null,
  donationAmount: 0,
  recipientName: '',
  recipientEmail: ''
};

const CardWizardContext = createContext<CardWizardContextType | undefined>(undefined);

export const CardWizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cardData, setCardData] = useState<WizardCardData>(initialCardData);

  const updateCardData = (data: Partial<WizardCardData>) => {
    setCardData(prev => ({ ...prev, ...data }));
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setCardData(initialCardData);
  };

  return (
    <CardWizardContext.Provider
      value={{
        currentStep,
        cardData,
        setCurrentStep,
        updateCardData,
        resetWizard
      }}
    >
      {children}
    </CardWizardContext.Provider>
  );
};

export const useCardWizard = () => {
  const context = useContext(CardWizardContext);
  if (!context) {
    throw new Error('useCardWizard must be used within CardWizardProvider');
  }
  return context;
};

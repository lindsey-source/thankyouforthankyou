import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  
  // Step 5 - Impact / charity
  charityId: string | null;
  charityName: string | null;
  guestCount: number;
  donationAmount: number;
  recipientName: string;
  recipientEmail: string;
  senderName: string;

  // Guest list (multi-recipient)
  guests: GuestEntry[];
}

export interface GuestEntry {
  id: string;
  guestName: string;
  emailAddress: string;
  giftDescription: string;
  thankYouMessage?: string;
}

interface CardWizardContextType {
  currentStep: number;
  cardData: WizardCardData;
  setCurrentStep: (step: number) => void;
  updateCardData: (data: Partial<WizardCardData>) => void;
  resetWizard: () => void;
}

const STORAGE_KEY = 'tytft.cardWizard.v1';

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
  charityName: null,
  guestCount: 50,
  donationAmount: 0,
  recipientName: '',
  recipientEmail: '',
  senderName: '',
  guests: []
};

const loadPersistedData = (): { cardData: WizardCardData; currentStep: number } => {
  if (typeof window === 'undefined') return { cardData: initialCardData, currentStep: 1 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cardData: initialCardData, currentStep: 1 };
    const parsed = JSON.parse(raw);
    return {
      cardData: { ...initialCardData, ...(parsed.cardData || {}) },
      currentStep: typeof parsed.currentStep === 'number' ? parsed.currentStep : 1,
    };
  } catch {
    return { cardData: initialCardData, currentStep: 1 };
  }
};

const CardWizardContext = createContext<CardWizardContextType | undefined>(undefined);

export const CardWizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ cardData: initialData, currentStep: initialStep }] = useState(loadPersistedData);
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [cardData, setCardData] = useState<WizardCardData>(initialData);

  // Persist on every change so the occasion (and other choices) survive
  // page refreshes, auth redirects, and accidental navigations.
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cardData, currentStep })
      );
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [cardData, currentStep]);

  const updateCardData = (data: Partial<WizardCardData>) => {
    setCardData(prev => ({ ...prev, ...data }));
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setCardData(initialCardData);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
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

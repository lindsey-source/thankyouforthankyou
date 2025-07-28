import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardDesigner } from '@/components/CardDesigner/CardDesigner';

const CardDesign = () => {
  const navigate = useNavigate();

  const handleSaveDesign = (design: any) => {
    // Here you would typically save the design to your database
    console.log('Saved card design:', design);
    
    // Navigate back to send thanks or dashboard with the design
    navigate('/send-thanks', { state: { cardDesign: design } });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <CardDesigner 
      onSaveDesign={handleSaveDesign}
      onCancel={handleCancel}
    />
  );
};

export default CardDesign;
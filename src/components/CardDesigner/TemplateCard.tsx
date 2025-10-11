import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  name: string;
  image: string;
  colors: any;
  fonts: any;
  selected: boolean;
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  image,
  colors,
  fonts,
  selected,
  onSelect
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all ${
        selected ? 'ring-4 ring-violet-400' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Select ${name} template`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-violet-500 rounded-full p-1.5"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm font-medium text-center truncate mb-3" title={name}>
          {name}
        </p>
        
        {/* Color Palette */}
        {colors && (
          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1.5">Colors</p>
            <div className="flex gap-1.5 justify-center">
              {colors.primary && (
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: colors.primary }}
                  title="Primary"
                />
              )}
              {colors.secondary && (
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: colors.secondary }}
                  title="Secondary"
                />
              )}
              {colors.accent && (
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: colors.accent }}
                  title="Accent"
                />
              )}
            </div>
          </div>
        )}
        
        {/* Font Preview */}
        {fonts && fonts.heading && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Font</p>
            <p className="text-xs text-center" style={{ fontFamily: fonts.heading }}>
              {fonts.heading}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

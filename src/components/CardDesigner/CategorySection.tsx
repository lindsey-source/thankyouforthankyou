import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { getTemplateImage } from '@/lib/templateImageMap';

interface Template {
  id: string;
  name: string;
  preview_image: string;
  colors: any;
  fonts: any;
}

interface CategorySectionProps {
  emoji: string;
  title: string;
  templates: Template[];
  initiallyVisible?: number;
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  emoji,
  title,
  templates,
  initiallyVisible = 4,
  selectedTemplateId,
  onSelectTemplate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (templates.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-3xl">{emoji}</span>
          <span>{title}</span>
        </h2>
        <p className="text-muted-foreground text-sm italic">New designs arriving soon.</p>
      </div>
    );
  }

  const visibleTemplates = isExpanded ? templates : templates.slice(0, initiallyVisible);
  const hasMore = templates.length > initiallyVisible;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-3xl">{emoji}</span>
        <span>{title}</span>
      </h2>
      
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4"
      >
        <AnimatePresence>
          {visibleTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <TemplateCard
                id={template.id}
                name={template.name}
                image={getTemplateImage(template.preview_image)}
                colors={template.colors}
                fonts={template.fonts}
                selected={selectedTemplateId === template.id}
                onSelect={() => onSelectTemplate(template.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 text-sm font-medium text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show more {title} templates ({templates.length - initiallyVisible} more)
            </>
          )}
        </button>
      )}
    </div>
  );
};

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const TemplateGallerySkeleton: React.FC = () => {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((section) => (
        <div key={section}>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="w-10 h-10 rounded" />
            <Skeleton className="w-48 h-8 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="rounded-xl overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-3 bg-white">
                  <Skeleton className="w-32 h-4 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

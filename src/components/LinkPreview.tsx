import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkPreviewProps {
  url: string;
  title: string;
}

export function LinkPreview({ url, title }: LinkPreviewProps) {
  const hostname = new URL(url).hostname;

  return (
    <div 
      className="absolute z-50 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-4 w-96"
      style={{
        top: 'calc(100% + 10px)',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-medium line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <ExternalLink className="w-4 h-4" />
          <span>{hostname}</span>
        </div>
      </div>
    </div>
  );
}
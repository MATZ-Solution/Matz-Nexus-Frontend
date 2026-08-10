import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ onClick, label = "Back to projects" }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 text-xs font-semibold text-[#0f9f59] hover:text-[#0d8a4e] transition-colors cursor-pointer mb-6"
  >
    <ArrowLeft className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

export default BackButton;
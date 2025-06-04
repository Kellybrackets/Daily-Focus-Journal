import React, { useState } from 'react';
import { useJournal } from '../context/JournalContext';
import { Download, ChevronDown } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const ExportJournal: React.FC = () => {
  const { entries } = useJournal();
  const [isOpen, setIsOpen] = useState(false);

  const exportToCSV = () => {
    if (entries.length === 0) return;

    const csvHeader = 'Date,Type,Title,Notes\n';
    const csvContent = entries
      .map(entry => {
        const formattedDate = formatDate(entry.date);
        const title = `"${entry.title.replace(/"/g, '""')}"`;
        const notes = `"${entry.notes.replace(/"/g, '""')}"`;
        return `${formattedDate},${entry.type},${title},${notes}`;
      })
      .join('\n');

    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.setAttribute('download', `daily-focus-journal-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  const exportToText = () => {
    if (entries.length === 0) return;

    let textContent = 'DAILY FOCUS JOURNAL EXPORT\n\n';
    
    entries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach(entry => {
        textContent += `Date: ${formatDate(entry.date)}\n`;
        textContent += `Type: ${entry.type}\n`;
        textContent += `Title: ${entry.title}\n`;
        textContent += `Notes: ${entry.notes}\n\n`;
        textContent += '------------------------\n\n';
      });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.setAttribute('download', `daily-focus-journal-export-${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Export journal"
      >
        <Download className="h-5 w-5" />
        <span className="hidden sm:inline">Export</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={exportToCSV}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              role="menuitem"
            >
              Export as CSV
            </button>
            <button
              onClick={exportToText}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              role="menuitem"
            >
              Export as Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportJournal;
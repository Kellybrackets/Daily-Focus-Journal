import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { formatDate } from '../utils/dateUtils';
import { PenLine, BookOpen, Target, Trash2, Edit, X, Check } from 'lucide-react';
import { useJournal } from '../context/JournalContext';

interface EntryCardProps {
  entry: JournalEntry;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useJournal();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(entry.title);
  const [editNotes, setEditNotes] = useState(entry.notes);

  const handleUpdate = () => {
    updateEntry({
      ...entry,
      title: editTitle,
      notes: editNotes
    });
    setIsEditing(false);
  };

  const getTypeIcon = () => {
    switch (entry.type) {
      case 'Goal':
        return <Target className="h-5 w-5 text-green-500" />;
      case 'Reflection':
        return <PenLine className="h-5 w-5 text-blue-500" />;
      case 'Bible Verse':
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (entry.type) {
      case 'Goal':
        return 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-100';
      case 'Reflection':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-100';
      case 'Bible Verse':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {isEditing ? (
        <div className="p-4">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
          <textarea
            value={editNotes}
            onChange={e => setEditNotes(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={handleUpdate}
              className="p-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200"
            >
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{entry.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor()} flex items-center gap-1`}>
                {getTypeIcon()}
                {entry.type}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">{entry.notes}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{formatDate(entry.date)}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:text-blue-500 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="p-1 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EntryCard;
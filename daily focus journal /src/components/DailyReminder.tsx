import React from 'react';
import { useJournal } from '../context/JournalContext';
import { getTodayISODate } from '../utils/dateUtils';
import { LightbulbIcon } from 'lucide-react';

const DailyReminder: React.FC = () => {
  const { entries } = useJournal();
  const today = getTodayISODate();

  // Check if there's an entry for today
  const todayEntry = entries.find(entry => entry.date === today);

  if (todayEntry) {
    return null; // Don't show reminder if there's already an entry for today
  }

  return (
    <div className="mb-6 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-md animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <LightbulbIcon className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-100">What's your focus today?</h3>
          <p className="text-sm text-amber-700 dark:text-amber-200">
            Take a moment to set your intention for the day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyReminder;
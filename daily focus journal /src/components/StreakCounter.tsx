import React from 'react';
import { useJournal } from '../context/JournalContext';
import { Flame } from 'lucide-react';

const StreakCounter: React.FC = () => {
  const { streakCount } = useJournal();

  if (streakCount === 0) return null;

  return (
    <div className="flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400">
      <Flame className="h-4 w-4 text-orange-500" />
      <span>{streakCount} day streak</span>
    </div>
  );
};

export default StreakCounter;
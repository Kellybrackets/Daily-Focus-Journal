import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { JournalProvider } from './context/JournalContext';
import ThemeToggle from './components/ThemeToggle';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import SearchFilter from './components/SearchFilter';
import ExportJournal from './components/ExportJournal';
import StreakCounter from './components/StreakCounter';
import { BookOpen } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <JournalProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            <header className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Daily Focus Journal</h1>
                </div>
                <div className="flex items-center gap-2">
                  <StreakCounter />
                  <ExportJournal />
                  <ThemeToggle />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Your space for daily reflection and focus.
              </p>
            </header>

            <main>
              <EntryForm />
              <SearchFilter />
              <EntryList />
            </main>

            <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Daily Focus Journal — Reflect, focus, and grow every day.
              </p>
            </footer>
          </div>
        </div>
      </JournalProvider>
    </ThemeProvider>
  );
}

export default App;
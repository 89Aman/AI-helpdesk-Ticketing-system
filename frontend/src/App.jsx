import { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import Analytics from './components/Analytics';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' or 'analytics'

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleTicketCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen w-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">AI Helpdesk</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Instant AI Support</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Tab Navigation */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'tickets'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Tickets
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'analytics'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Analytics
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="sm:hidden flex gap-2 pb-3">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-2 rounded-lg font-medium transition text-sm ${
                activeTab === 'tickets'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Tickets
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-2 rounded-lg font-medium transition text-sm ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 py-6 sm:py-8 lg:py-10">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            {activeTab === 'tickets' ? 'How can we help you today?' : 'Analytics Dashboard'}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 px-4">
            {activeTab === 'tickets' 
              ? 'Submit a ticket and get instant AI-powered assistance'
              : 'Monitor ticket performance and AI effectiveness'
            }
          </p>
        </div>

        {activeTab === 'tickets' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-[2000px] mx-auto">
            <TicketForm onTicketCreated={handleTicketCreated} />
            <TicketList key={refreshKey} />
          </div>
        ) : (
          <div className="w-full max-w-[2000px] mx-auto">
            <Analytics />
          </div>
        )}
      </main>

      <footer className="w-full mt-8 sm:mt-12 lg:mt-16 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © 2025 AI Helpdesk. Powered by Groq AI.
            </p>
            <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

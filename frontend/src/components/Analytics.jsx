import { useEffect, useState } from 'react';
import { ticketService } from '../services/api';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await ticketService.getAnalytics();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tickets"
          value={stats.total_tickets}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Open Tickets"
          value={stats.open_tickets}
          icon="🔓"
          color="yellow"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved_tickets}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Response Rate"
          value="98%"
          icon="⚡"
          color="purple"
        />
      </div>

      {/* Priority Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tickets by Priority
        </h3>
        <div className="space-y-3">
          {stats.tickets_by_priority?.map((item) => (
            <PriorityBar
              key={item.priority}
              priority={item.priority}
              count={item.count}
              total={stats.total_tickets}
            />
          ))}
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tickets by Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.tickets_by_category?.map((item) => (
            <CategoryCard
              key={item.category}
              category={item.category}
              count={item.count}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function PriorityBar({ priority, count, total }) {
  const percentage = (count / total) * 100;
  
  const priorityColors = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    normal: 'bg-blue-500',
    low: 'bg-gray-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 dark:text-gray-300 capitalize">{priority}</span>
        <span className="text-gray-600 dark:text-gray-400">{count} ({percentage.toFixed(0)}%)</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${priorityColors[priority] || 'bg-gray-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, count }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{count}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
        {category?.replace('_', ' ') || 'Uncategorized'}
      </p>
    </div>
  );
}

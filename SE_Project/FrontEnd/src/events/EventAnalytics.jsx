import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';

const EventAnalytics = ({ eventId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  useEffect(() => {
    fetchAnalytics();
  }, [eventId, timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`/api/events/${eventId}/analytics?range=${timeRange}`);
      const formattedData = response.data.map(item => ({
        ...item,
        date: format(parseISO(item.date), 'MMM dd'),
      }));
      setData(formattedData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch analytics data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Ticket Sales Analytics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded-md ${
              timeRange === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded-md ${
              timeRange === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded-md ${
              timeRange === 'year'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis
              tick={{ fill: '#6B7280' }}
              label={{ value: 'Tickets Sold', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="ticketsSold"
              name="Tickets Sold"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ fill: '#4F46E5' }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue ($)"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {data && data.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800">Total Tickets Sold</h3>
            <p className="mt-2 text-2xl font-semibold text-indigo-900">
              {data.reduce((sum, item) => sum + item.ticketsSold, 0)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Total Revenue</h3>
            <p className="mt-2 text-2xl font-semibold text-green-900">
              ${data.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

EventAnalytics.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventAnalytics; 
 
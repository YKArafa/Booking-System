import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventCard from './EventCard';
import ConfirmationDialog from '../admin/ConfirmationDialog';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events/my-events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/events/${selectedEvent.id}`);
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
        <Link
          to="/events/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-600 p-8">
          <p className="mb-4">You haven't created any events yet.</p>
          <Link
            to="/events/create"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative">
              <EventCard event={event} />
              <div className="absolute top-4 right-4 space-x-2">
                <Link
                  to={`/events/edit/${event.id}`}
                  className="inline-flex items-center px-3 py-1 bg-white text-indigo-600 rounded-md shadow hover:bg-indigo-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event)}
                  className="inline-flex items-center px-3 py-1 bg-white text-red-600 rounded-md shadow hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default MyEventsPage; 
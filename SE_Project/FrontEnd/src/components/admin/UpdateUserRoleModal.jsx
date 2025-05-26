import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateUserRoleModal = ({ user, isOpen, onClose, onSuccess }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roles = ['User', 'Organizer', 'Admin'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`/api/users/${user.id}`, {
        role: selectedRole,
      });
      onSuccess();
    } catch (err) {
      setError('Failed to update user role');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Update User Role</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Role for {user.name}
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateUserRoleModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default UpdateUserRoleModal; 
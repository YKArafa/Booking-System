import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';
import UpdateUserRoleModal from './admin/UpdateUserRoleModal';
import ConfirmationDialog from './admin/ConfirmationDialog';
import axios from 'axios';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateSuccess = () => {
    setIsUpdateModalOpen(false);
    fetchUsers();
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/users/${selectedUser.id}`);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users in the system including their name, email, and role.
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onUpdateRole={handleUpdateRole}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <>
          <UpdateUserRoleModal
            user={selectedUser}
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            onSuccess={handleUpdateSuccess}
          />
          <ConfirmationDialog
            isOpen={isDeleteDialogOpen}
            title="Delete User"
            message={`Are you sure you want to delete ${selectedUser.name}?`}
            onConfirm={handleDeleteConfirm}
            onClose={() => setIsDeleteDialogOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default AdminUsersPage; 
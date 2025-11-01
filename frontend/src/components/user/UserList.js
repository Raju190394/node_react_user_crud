import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../services/userService';
import { Link } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // You can change this (e.g., 10 per page)

  const load = async () => {
    try {
      const res = await fetchUsers();
      // console.log(res.data);
      setUsers(res.data.users);
      setRoles(res.data.roles);
    } catch (err) {
      console.error(err);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToPage = (pageNum) => setCurrentPage(pageNum);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <Link to="/users/create" className="btn btn-primary">Add User</Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 && (
            <tr><td colSpan="8">No users</td></tr>
          )}
          {currentUsers.map((u, i) => (
            <tr key={u.id}>
              <td>{indexOfFirstUser + i + 1}</td>
              <td>
                {u.photo ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/uploads/${u.photo}`}
                    alt="p"
                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                  />
                ) : '—'}
              </td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.mobile_no}</td>
              <td>{u.gender}</td>
              <td> {roles.find(r => r.role_code === u.role)?.role || 'hhh'}</td>
              <td>
                <Link to={`/users/view/${u.id}`} className="btn btn-sm btn-info me-1">View</Link>
                <Link to={`/users/edit/${u.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                <button onClick={() => handleDelete(u.id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

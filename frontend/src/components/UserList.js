import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/userService';
import { Link } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load users');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <Link to="/create" className="btn btn-primary">Add User</Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead><tr>
          <th>#</th><th>Photo</th><th>Name</th><th>Email</th><th>Mobile</th><th>Gender</th><th>Role</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {users.length===0 && <tr><td colSpan="8">No users</td></tr>}
          {users.map((u,i) => (
            <tr key={u.id}>
              <td>{i+1}</td>
              <td>
                {u.photo ? <img src={`${process.env.REACT_APP_API_URL.replace('/api','')}/uploads/${u.photo}`} alt="p" style={{width:60,height:60,objectFit:'cover'}} /> : '—'}
              </td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.mobile_no}</td>
              <td>{u.gender}</td>
              <td>{u.role}</td>
              <td>
                <Link to={`/view/${u.id}`} className="btn btn-sm btn-info me-1">View</Link>
                <Link to={`/edit/${u.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                <button onClick={()=>handleDelete(u.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

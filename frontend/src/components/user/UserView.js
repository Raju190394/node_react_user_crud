import React, { useEffect, useState } from 'react';
import { fetchUser } from '../../services/userService';
import { useParams, Link } from 'react-router-dom';

export default function UserView() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUser(id);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load user');
      }
    })();
  }, [id]);

  if (!user) return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">User Details</h3>
        <Link to="/users" className="btn btn-secondary btn-sm">← Back</Link>
      </div>

      <div className="d-flex flex-column flex-md-row align-items-start border rounded-3 p-4 bg-white shadow-sm">
        <div>
          {user.photo ? (
            <img
              src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/uploads/${user.photo}`}
              alt="User"
              className="rounded-3"
              style={{ width: 150, height: 150, objectFit: 'cover' }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-light text-muted"
              style={{ width: 150, height: 150 }}
            >
              No Photo
            </div>
          )}
        </div>

        <div className="ms-md-4 mt-3 mt-md-0 w-100">
          <table className="table table-borderless mb-0">
            <tbody>
              <tr>
                <th style={{ width: '150px' }}>Name</th>
                <td>{user.first_name} {user.last_name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Mobile</th>
                <td>{user.mobile_no}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td><span className="badge bg-primary">{user.role}</span></td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <Link to={`/users/edit/${user.id}`} className="btn btn-warning btn-sm me-2">
              ✏️ Edit
            </Link>
            <Link to="/users" className="btn btn-outline-secondary btn-sm">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

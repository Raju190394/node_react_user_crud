import React, { useEffect, useState } from 'react';
import { fetchUser } from '../services/userService';
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

  if (!user) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>View User</h3>
      <div className="card p-3" style={{maxWidth:600}}>
        <div className="d-flex">
          <div style={{width:120}}>
            {user.photo ? <img src={`${process.env.REACT_APP_API_URL.replace('/api','')}/uploads/${user.photo}`} alt="p" style={{width:120,height:120,objectFit:'cover'}} /> : <div style={{width:120,height:120,background:'#eee'}} />}
          </div>
          <div className="ms-3">
            <h5>{user.first_name} {user.last_name}</h5>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile_no}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Link to={`/edit/${user.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
            <Link to="/" className="btn btn-sm btn-secondary">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

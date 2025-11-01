import React, { useEffect, useState } from 'react';
import { fetchStaff } from '../../services/staffService';
import { useParams, Link } from 'react-router-dom';

export default function StaffView() {
  const [staff, setStaff] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchStaff(id);
        setStaff(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load data');
      }
    })();
  }, [id]);

  if (!staff) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>View staff</h3>
      <div className="card p-3" style={{maxWidth:600}}>
        <div className="d-flex">
          <div style={{width:120}}>
            {staff.photo ? <img src={`${process.env.REACT_APP_API_URL.replace('/api','')}/uploads/${staff.photo}`} alt="p" style={{width:120,height:120,objectFit:'cover'}} /> : <div style={{width:120,height:120,background:'#eee'}} />}
          </div>
          <div className="ms-3">
            <h5>{staff.first_name} {staff.last_name}</h5>
            <p><strong>Email:</strong> {staff.email}</p>
            <p><strong>Mobile:</strong> {staff.mobile_no}</p>
            <p><strong>Gender:</strong> {staff.gender}</p>
            <p><strong>Role:</strong> {staff.role}</p>
            <Link to={`/staffs/edit/${staff.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
            <Link to="/staffs/" className="btn btn-sm btn-secondary me-2">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="container mt-5" style={{ maxWidth: '800px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Staff Details</h3>
          <Link to="/staffs" className="btn btn-secondary btn-sm">← Back</Link>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-start border rounded-3 p-4 bg-white shadow-sm">
          <div>
            {staff.photo ? (
              <img
                src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/uploads/${staff.photo}`}
                alt="Staff"
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
                  <td>{staff.first_name} {staff.last_name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{staff.email}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{staff.mobile_no}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{staff.gender}</td>
                </tr>
                
              </tbody>
            </table>

            <div className="mt-4">
              <Link to={`/staffs/edit/${staff.id}`} className="btn btn-warning btn-sm me-2">
                ✏️ Edit
              </Link>
              <Link to="/staffs" className="btn btn-outline-secondary btn-sm">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}



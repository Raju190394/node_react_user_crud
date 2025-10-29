import React, { useState, useEffect } from 'react';
import { createStaff, fetchStaff, updateStaff } from '../../services/staffService';
import { useNavigate, useParams, Link } from 'react-router-dom';
const empty = { first_name:'', last_name:'', email:'', mobile_no:'', gender:'Male', role:'Staff', photo:null };

export default function StaffForm() {
  const [form, setForm] = useState(empty);
  const [preview, setPreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) { // edit
      setIsEdit(true);
      (async () => {
        const res = await fetchStaff(params.id);
        setForm({ ...res.data, photo: null }); // don't set photo file
        if (res.data.photo) setPreview(`${process.env.REACT_APP_API_URL.replace('/api','')}/uploads/${res.data.photo}`);
      })();
    }
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, photo: file }));
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('first_name', form.first_name);
    fd.append('last_name', form.last_name);
    fd.append('email', form.email);
    fd.append('mobile_no', form.mobile_no);
    fd.append('gender', form.gender);
    fd.append('role', form.role);
    if (form.photo) fd.append('photo', form.photo);

    try {
      if (isEdit) {
        await updateStaff(params.id, fd);
        alert('Staff updated');
      } else {
        await createStaff(fd);
        alert('Staff created');
      }
      navigate('/staff/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isEdit ? 'Edit Staff' : 'Add Staff'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label>First Name</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Last Name</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3 col-md-6">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Mobile No</label>
            <input name="mobile_no" value={form.mobile_no} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3 col-md-4">
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="form-control">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-3 col-md-4">
            <label>Role</label>
            <input name="role" value={form.role} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3 col-md-4">
            <label>Photo</label>
            <input type="file" accept="image/*" onChange={handleFile} className="form-control" />
            {preview && <img src={preview} alt="preview" style={{width:100,height:100,objectFit:'cover', marginTop:8}} />}
          </div>
        </div>

        <button className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        <Link to="/staffs/" className="btn btn-secondary m-1">Back</Link>
      </form>
    </div>
  );
}

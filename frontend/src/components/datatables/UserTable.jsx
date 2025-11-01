import DataTable from 'react-data-table-component';

const columns = [
  { name: '#', selector: (row, index) => index + 1, width: '60px' },
  {
    name: 'Photo',
    cell: row => row.photo
      ? <img src={`${process.env.REACT_APP_API_URL.replace('/api','')}/uploads/${row.photo}`} alt="p" width="50" height="50" />
      : '—',
  },
  { name: 'Name', selector: row => `${row.first_name} ${row.last_name}` },
  { name: 'Email', selector: row => row.email },
  { name: 'Mobile', selector: row => row.mobile_no },
  { name: 'Gender', selector: row => row.gender },
  { name: 'Role', selector: row => row.role },
  {
    name: 'Actions',
    cell: row => (
      <>
        <Link to={`/users/view/${row.id}`} className="btn btn-sm btn-info me-1">View</Link>
        <Link to={`/users/edit/${row.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
        <button onClick={() => handleDelete(row.id)} className="btn btn-sm btn-danger">Delete</button>
      </>
    )
  },
];

return (
  <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h3>Users</h3>
      <Link to="/users/create" className="btn btn-primary">Add User</Link>
    </div>

    <DataTable
      columns={columns}
      data={users}
      pagination
      highlightOnHover
      dense
      responsive
    />
  </div>
);

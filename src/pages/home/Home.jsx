import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import capIcon from '../../assets/cap.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
export const Home = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const handleCustomers = async () => {
    try {
      const response = await axios.get("https://cms-sde1.onrender.com/customer/AllCustomers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error during fetch the data from sources", error);
      toast.error("Error during fetch the data from sources");
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  // Handle create new customer
  const handleCreate = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create New Customer',
      html:
        `<div style="display: flex; flex-direction: column; text-align: left;">
           <div style="display: flex; align-items: center; margin-bottom: 10px;">
             <label for="swal-new-username" style="width: 100px;">Username</label>
             <input id="swal-new-username" class="swal2-input" placeholder="Username" style="flex-grow: 1;">
           </div>
           <div style="display: flex; align-items: center; margin-bottom: 10px;">
             <label for="swal-new-email" style="width: 100px;">Email</label>
             <input id="swal-new-email" class="swal2-input" placeholder="Email" style="flex-grow: 1;">
           </div>
           <div style="display: flex; align-items: center; margin-bottom: 10px;">
             <label for="swal-new-password" style="width: 100px;">Password</label>
             <input id="swal-new-password" class="swal2-input" placeholder="Password" type="password" style="flex-grow: 1;">
           </div>
         </div>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          username: document.getElementById('swal-new-username').value,
          email: document.getElementById('swal-new-email').value,
          password: document.getElementById('swal-new-password').value
        };
      }
    });

    if (formValues) {
      if (!formValues.username || !formValues.email || !formValues.password) {
        Swal.fire('Validation Error', 'All fields are required.', 'warning');
        return;
      }
      try {
        await axios.post(`https://cms-sde1.onrender.com/customer/createCustomer`, {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password
        });
        Swal.fire('Created!', 'New customer has been created.', 'success');
        handleCustomers();
      } catch (error) {
        console.error('Create error:', error.response?.data || error.message || error);
        Swal.fire('Error', 'Failed to create customer.', 'error');
      }
    }
  };

  // Handle update customer info
  const handleUpdate = async (id) => {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;

    const { value: formValues } = await Swal.fire({
      title: 'Update User Info',
      html:
        `<div style="text-align: left; margin-bottom: 10px;">
           <label for="swal-username">Username</label>
           <input id="swal-username" class="swal2-input" placeholder="Username" value="${customer.username}">
         </div>
         <div style="text-align: left; margin-bottom: 10px;">
           <label for="swal-password">Password</label>
           <input id="swal-password" class="swal2-input" placeholder="Password" type="password" value="${customer.password}">
         </div>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          username: document.getElementById('swal-username').value,
          password: document.getElementById('swal-password').value
        };
      }
    });

    setTimeout(() => {
      const usernameInput = document.getElementById('swal-username');
      const passwordInput = document.getElementById('swal-password');
      if (usernameInput) {
        usernameInput.focus();
        const len = usernameInput.value.length;
        usernameInput.setSelectionRange(len, len);
      }
      if (passwordInput) {
        passwordInput.focus();
        const len = passwordInput.value.length;
        passwordInput.setSelectionRange(len, len);
      }
    }, 0);

    if (formValues) {
      try {
        await axios.put(`https://cms-sde1.onrender.com/customer/update/${id}`, {
          username: formValues.username,
          password: formValues.password
        });
        Swal.fire('Updated!', 'User information has been updated.', 'success');
        handleCustomers();
      } catch (error) {
        console.error('Update error:', error);
        Swal.fire('Error', 'Failed to update user info.', 'error');
      }
    }
  };

  // Handle delete customer
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://cms-sde1.onrender.com/customer/delete/${id}`);
        Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
        handleCustomers();
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire('Error', 'Failed to delete the customer.', 'error');
      }
    }
  };

  useEffect(() => {
    handleCustomers();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-warning mx-5" href="/home"><img src={capIcon} />lms</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Workspace</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Course</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-outline-warning ms-2" href="#">Get a Quote</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle"></i> Profile
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Update Password</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
              {/*
              <li className="nav-item">
                <a className="nav-link text-light" href="#" onClick={handleLogout}>Logout</a>
              </li>
              */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="mt-4" style={{ width: '100vw', padding: '0 2rem' }}>
        <h3>Customer List</h3>
        <div className="mb-3 text-end">
          <button className="btn btn-primary" onClick={handleCreate}>
            Create Customer
          </button>
        </div>
        <div className="w-100" style={{ width: '100%' }}>
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th className="text-center">Username</th>
                <th className="text-center">Email</th>
                <th className="text-center">Password</th>
                <th className="text-center" style={{ width: '10%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td className="text-center">{customer.username}</td>
                  <td className="text-center">{customer.email}</td>
                  <td className="text-center">{customer.password}</td>
                  <td className="text-center" style={{ width: '19%' }}>
                    <button
                      className="btn btn-warning ms-5 me-2"
                      onClick={() => handleUpdate(customer.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger ms-4 me-2"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home

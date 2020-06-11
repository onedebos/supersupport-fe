import React, { useEffect, useState } from "react";
import userServices from "../services/users";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [showUsers, setShowUsers] = useState([]);

  const { user } = useSelector(usersSelector);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await userServices.getAllUsers(user.token);
        setShowUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [user.token, user.role]);

  const handleChangeRole = async (id, role) => {
    try {
      await userServices.updateUserRole(id, role, user.token);
      toast.success("User role updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      console.log(error);
    }
  };
  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {showUsers.length === 0 ? (
        "Loading..."
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {showUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleChangeRole(user.id, "admin")}
                    className="btn btn-primary"
                  >
                    Make admin
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleChangeRole(user.id, "agent")}
                    className="btn btn-info"
                  >
                    Make agent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;

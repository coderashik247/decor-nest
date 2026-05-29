import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  FaUserShield,
  FaUser,
  FaTrashCan,
  FaEye,
  FaUsers,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${debouncedSearch}`
      );
      return res.data;
    },
  });

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        role,
      });

      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          icon: "success",
          title: `Role updated to ${role}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E1E1E",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/users/${id}`);

      if (res.data.deletedCount > 0) {
        refetch();

        Swal.fire({
          icon: "success",
          title: "User Deleted",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleView = (user) => {
    Swal.fire({
      showCloseButton: true,
      showConfirmButton: false,
      width: 500,
      html: `
        <div style="padding:10px">
          <img
            src="${user.photoURL}"
            style="
              width:100px;
              height:100px;
              border-radius:50%;
              object-fit:cover;
              border:4px solid #CAEB66;
              margin:auto;
            "
          />

          <h2 style="
            margin-top:15px;
            font-size:24px;
            font-weight:700;
          ">
            ${user.displayName}
          </h2>

          <p style="color:gray;">
            ${user.email}
          </p>

          <div style="
            margin-top:15px;
            background:#f5f5f5;
            border-radius:16px;
            padding:15px;
            text-align:left;
          ">
            <p><b>Role:</b> ${user.role}</p>
            <p><b>Joined:</b> ${new Date(
              user.createdAt
            ).toLocaleString()}</p>
          </div>
        </div>
      `,
    });
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>
          <h2 className="text-4xl font-black text-secondary">
            User Management
          </h2>

          <p className="text-base-content/60 mt-2">
            Manage all registered users
          </p>
        </div>

        {/* STATS */}
        <div className="bg-secondary text-white rounded-[28px] px-6 py-5 shadow-xl min-w-60">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-white/70">
                Total Users
              </p>

              <h3 className="text-5xl font-black text-primary">
                {users.length}
              </h3>
            </div>

            <FaUsers
              size={40}
              className="text-primary"
            />

          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-base-100 rounded-[28px] border border-base-300 p-5 shadow-sm">

        <div className="relative max-w-md">

          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

          <input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input w-full pl-12 rounded-2xl border border-primary/20 focus:border-primary focus:outline-none"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-base-100 rounded-[30px] border border-base-300 overflow-hidden shadow-lg">

        <div className="overflow-x-auto">

          <table className="table">

            <thead className="bg-secondary text-white">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Role Action</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200 transition"
                >

                  <td className="font-semibold">
                    {index + 1}
                  </td>

                  <td>
                    <div className="flex items-center gap-4">

                      <div className="avatar">
                        <div className="w-14 rounded-2xl border border-base-300">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                            }
                            alt=""
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold">
                          {user.displayName}
                        </h3>

                        <p className="text-xs text-base-content/50">
                          Joined{" "}
                          {new Date(
                            user.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                        user.role === "admin"
                          ? "bg-primary text-secondary"
                          : "bg-primary/10 text-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>

                    {user.role === "admin" ? (
                      <button
                        onClick={() =>
                          handleRoleChange(user._id, "user")
                        }
                        className="btn btn-sm rounded-xl bg-base-200 text-secondary border border-base-300 hover:bg-primary hover:text-secondary"
                      >
                        <FiShieldOff />
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleRoleChange(user._id, "admin")
                        }
                        className="btn btn-primary btn-sm rounded-xl text-secondary border-none"
                      >
                        <FaUserShield />
                        Make Admin
                      </button>
                    )}

                  </td>

                  <td>

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleView(user)}
                        className="btn btn-sm rounded-xl bg-primary/10 text-secondary border-none hover:bg-primary hover:text-secondary"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        className="btn btn-sm rounded-xl bg-secondary text-white border-none hover:bg-black"
                      >
                        <FaTrashCan />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {users.length === 0 && (
          <div className="py-20 text-center">

            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <FaUser className="text-primary text-4xl" />
            </div>

            <h3 className="text-2xl font-bold mt-5">
              No Users Found
            </h3>

            <p className="text-base-content/60 mt-2">
              Try another search keyword.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default UserManagement;
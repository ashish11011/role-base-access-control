"use client";
import { hasPermission } from "@/dictionaryPermission";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";

const ShowAllUsers = (params: any) => {
  const user = JSON.parse(params.user);
  const token = params.token;
  const Roles = [
    "editDictionary",
    "createDictionary",
    "deleteDictionary",
    "user",
    "userManager",
  ];

  async function handleUserRoleChange(e: any) {
    const userId = e.target.id;
    const role = e.target.value;
    const response = await axios.post("/api/user/setUserRole", {
      userId,
      role,
    });
  }

  async function handleDeleteUser(e: any) {
    const userId = e.target.id;
    const response = await axios.post("/api/user/deleteUser", { userId });
  }
  return (
    <div>
      <div className=" w-[52rem] mx-auto mt-24 flex flex-col">
        {user.map((item: any) => (
          <div
            key={item._id}
            className="grid grid-cols-3 gap-2 py-1 px-2 items-center"
          >
            <h1>{item.name}</h1>
            <h1>{item.email}</h1>
            <div className=" flex items-center justify-between gap-2">
              {/* Create a select box for each role    */}
              {item.role === "admin" ? (
                <p className=" text-gray-500">Admin</p>
              ) : (
                hasPermission(token, "edit:user") && (
                  <select
                    id={item._id}
                    key={Roles[1]}
                    onChange={handleUserRoleChange}
                    className=" border rounded p-2"
                  >
                    <option value="editDictionary">Edit Dictionary</option>
                    <option value="createDictionary">Create Dictionary</option>
                    <option value="deleteDictionary">Delete Dictionary</option>
                    <option value="user">User</option>
                    <option value="userManager">User Manager</option>
                  </select>
                )
              )}
              {hasPermission(token, "delete:user") && (
                <div
                  id={item._id}
                  onClick={handleDeleteUser}
                  className=" cursor-pointer"
                >
                  <Trash2 color="#ff6666" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllUsers;

import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import User from "./User";
import { instance } from "../../Instance/Instanse";

const LeftSideBar = ({ setSelectedUser, SelectedUser }) => {
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await instance.get("http://localhost:5000/users/");
      setUsers(res.data.users);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error.data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {Loading ? (
        <Typography variant="h6">Loading</Typography>
      ) : (
        <>
          {Users.map((user) => {
            return (
              <User
                key={user._id}
                id={user._id}
                fn={user.first_name}
                ln={user.last_name}
                username={user.username}
                setSelectedUser={setSelectedUser}
                SelectedUser={SelectedUser}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default LeftSideBar;

import { useEffect, useState } from "react";
import Button from "../../components/Button";

import { getUsers } from "../../api/users.js";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.data);
    });
  }, []);

  return (
    users.length > 0 &&
    users.map((user) => (
      <div key={user.id}>
        <h2>{user.username}</h2>
        <p>{user.password}</p>
      </div>
    ))
  );
}

export default Users;

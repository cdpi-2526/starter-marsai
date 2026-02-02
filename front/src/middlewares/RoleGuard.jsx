import { useEffect } from "react";
import { useState } from "react";
import instance from "../api/config";

export function RoleGuard({ allowedRoles, children }) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  // API Call /checkToken
  useEffect(() => {
    fetch(instance + "/auth/checkToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error checking token:", error);
      });
  }, [token]);

  if (allowedRoles.includes(user?.role)) {
    return children;
  } else {
    return <div>Access Denied</div>;
  }
}

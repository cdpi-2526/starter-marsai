import { useEffect } from "react";
import { useState } from "react";
import instance from "../api/config";

export function RoleGuard({ allowedRoles, children }) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  // API Call /checkToken
  useEffect(() => {
    instance
      .post("/auth/checkToken", { token: token })
      .then((response) => {
        console.log("Token is valid:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error checking token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
        window.location.href = "/";
      });
  }, [token]);

  if (allowedRoles.includes(user?.role)) {
    return children;
  } else {
    return <div>Access Denied</div>;
  }
}

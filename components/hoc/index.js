import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (Components) => (props) => {
  const router = useRouter();
  const [isSystemAdmin, setIsSystemAdmin] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const isSystemAdmin = localStorage.getItem("is_system_admin") === "true";
      setIsSystemAdmin(isSystemAdmin);
      if (!isSystemAdmin) {
        router.replace("/");
      }
    }
  }, []);

  if (!isSystemAdmin) return null;
  return <Components {...props} />;
};

export default withAuth;

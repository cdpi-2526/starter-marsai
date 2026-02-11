import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";

function t(key) {
  if (localStorage.getItem("language") === "fr") {
    return fr[key];
  } else {
    return en[key];
  }
}

export default function PublicLayout() {
  return (
    <div>
      <Navbar t={t} />
      <main>
        <Outlet context={{ t }} />
      </main>
      <footer>Footer</footer>
    </div>
  );
}

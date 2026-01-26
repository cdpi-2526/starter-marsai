import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div>
      <div>Navbar</div>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}

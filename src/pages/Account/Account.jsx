// pages/Account/Account.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function Account() {
  return (
    <section className="flex gap-6 max-w-screen-xl mx-auto mt-8 justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl text-zinc-600">Account</h1>
        <nav className="flex flex-col gap-3">
          <NavLink end to="." className="text-base text-zinc-500 hover:text-teal-500">Basic</NavLink>
          <NavLink to="connections" className="text-base text-zinc-500 hover:text-teal-500">Connections</NavLink>
          <NavLink to="security" className="text-base text-zinc-500 hover:text-teal-500">Security</NavLink>
          <NavLink to="posts" className="text-base text-zinc-500 hover:text-teal-500">Posts</NavLink>
        </nav>
      </div>
      <Outlet />
    </section>
  );
}

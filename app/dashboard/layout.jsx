export default function DashboardLayout({ children }) {
  return (
    <div>
      <nav>Dashboard Sidebar</nav>
      <main>{children}</main>
    </div>
  );
}

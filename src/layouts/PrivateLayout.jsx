export default function PrivateLayout({ user, children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

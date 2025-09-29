import Navbar from "../components/NavBar/NavBar";

export default function PrivateLayout({ children }) {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
}

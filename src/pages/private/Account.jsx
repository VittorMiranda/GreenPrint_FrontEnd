import PrivateLayout from "../../layouts/PrivateLayout";
import NavBar from "../../components/NavBar/NavBar";

export default function Account() {
  return (
    <PrivateLayout>
      <div>
        <NavBar />
        <h2>Account Page</h2>
        <p>Welcome to your account page. Here you can manage your profile and settings.</p>
      </div>
    </PrivateLayout>
  );
}

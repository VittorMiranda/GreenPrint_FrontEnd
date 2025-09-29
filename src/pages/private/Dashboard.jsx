import PrivateLayout from "../../layouts/PrivateLayout";

export default function Dashboard() {
  return (
    <PrivateLayout>
      <h1>Painel do Usuário</h1>
      <p>Esta é uma página privada.</p>
    </PrivateLayout>
  );
}

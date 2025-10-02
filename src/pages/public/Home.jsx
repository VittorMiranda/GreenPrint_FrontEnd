import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Buttons/Button";
export default function Home() {
  return (
    <PublicLayout>
        <NavBar/>
        <main>
          <Button/>
        </main>
        
    </PublicLayout>
  );
}

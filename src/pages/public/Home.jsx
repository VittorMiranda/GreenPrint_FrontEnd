import PublicLayout from "../../layouts/PublicLayout";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import Carousel from "../../components/Carrossel/Carousel";
import { ErrorBoundary } from "../../components/ErrorBoundary";
export default function Home() {
  return (
    <PublicLayout>
        <ErrorBoundary>
          <NavBar/>
        </ErrorBoundary>
        
        <main>
          <Carousel/>       
        </main>
        
    </PublicLayout>
  );
}

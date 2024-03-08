import HomeSection from "@/components/home/home-section/home-section";
import NavbarHome from "@/components/home/navbar-home/navbar-home";

export default async function Home() {
  return (
    <main>
      <NavbarHome />
      <HomeSection />

      <section className="container mx-auto mb-12 space-y-12 sm:px-12 max-w-screen-xl">

      </section>

    </main>
  );
}

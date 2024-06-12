import HomeSection from "@/components/home/home-section/home-section";
import AlertMsg from "@/components/shared/messages/AlertMsg/AlertMsg";

export default async function Home() {
  return (
    <div>
      <div className="flex justify-end w-full">
        <AlertMsg>
          <span className="font-medium">Importante!!</span> La base de datos se
          actualiza todas las noches a las 12 a.m hora de Cuba.
        </AlertMsg>
      </div>
      <HomeSection />
    </div>
  );
}

import DiscountsList from "@/components/home/DiscountsList";
import TodayOffers from "@/components/home/TodayOffers";
import WeekOffers from "@/components/home/WeekOffers";
import LayoutWrapper from "@/components/layout/PublicLayoutWrapper/PublicLayoutWrapper";

export default async function Home() {
  return (
    <LayoutWrapper>
      <div className="space-y-8 container sm:mx-auto max-w-screen-xl max-sm:px-4">
        <TodayOffers />
        <DiscountsList />
        <WeekOffers />
      </div>
    </LayoutWrapper>
  );
}

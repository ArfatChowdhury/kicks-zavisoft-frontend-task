import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <Reviews />
    </main>
  );
}

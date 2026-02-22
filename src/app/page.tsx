import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="animate-fade-up">
        <Hero />
      </div>
      <div className="animate-fade-up [animation-delay:200ms]">
        <Categories />
      </div>
      <div className="animate-fade-up [animation-delay:400ms]">
        <Reviews />
      </div>
    </main>
  );
}

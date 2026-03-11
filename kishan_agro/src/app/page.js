import Products from "@/components/Products";

export const metadata = {
  title: "Shop Products - Kishan Agro",
  description: "Browse our extensive catalog of premium building materials. Built for construction excellence.",
  alternates: {
    canonical: "/",
  },
};

export const dynamic = 'force-dynamic';

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';

  return (
    <div className="flex min-h-screen flex-col bg-transparent transition-colors duration-200">
      <main className="flex flex-col flex-1 w-full relative">
        <Products initialQuery={query} />
      </main>
    </div>
  );
}
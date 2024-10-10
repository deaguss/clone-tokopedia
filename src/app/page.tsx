import Card from "@/components/Card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Promo from "@/components/Promo";
import Slider from "@/components/Slider";

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <Slider />
      <section id="promo">
        <Promo />
      </section>
      <section id="showcase_product">
        <div className="container mx-auto p-8">
          {/* Category Tabs */}
          <div className="flex justify-start space-x-4 mb-8 sticky py-2 bg-white top-0">
            <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-md">
              Makanan Jadi
            </div>
            <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-md">
              Suplemen Diet
            </div>
            <div className="px-6 py-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold rounded-md">
              Perlengkapan Medis
            </div>
            <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-md">
              Mirip yang kamu cek
            </div>
          </div>
          {/* Product Cards Section */}
          <div className="flex gap-x-4 gap-y-6 flex-wrap">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

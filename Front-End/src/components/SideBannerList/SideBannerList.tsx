export default function SideBannerList() {
  const banner = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
  return (
    <>
      {banner.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className="w-full rounded-xl shadow object-cover transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
        />
      ))}
    </>
  );
}

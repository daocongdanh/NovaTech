export default function Banner() {
  const banner = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
      {banner.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className="w-full rounded-xl shadow transition-transform duration-300 hover:scale-102 hover:shadow-lg object-cover"
        />
      ))}
    </div>
  );
}

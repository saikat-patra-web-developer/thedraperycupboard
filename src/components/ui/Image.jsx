import images from "../../data/images.json";

function Img({
  name,
  className = "",
  alt = "",
  sizes = "(max-width: 767px) 100vw, 50vw",
  priority = false,
}) {
  const image = images[name];
  return (
    <img
      src={image?.src || `/images/${name}.jpg`}
      srcSet={image?.srcSet}
      sizes={image ? sizes : undefined}
      width={image?.width}
      height={image?.height}
      alt={alt}
      className={"object-cover " + className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

export default Img;

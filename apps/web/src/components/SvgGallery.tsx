type SvgTile = {
  url: string;
  alt: string;
  containerClass: string;
  frameClass: string;
};

const tileStyles = [
  {
    containerClass: "lg:col-span-4 lg:row-span-2",
    frameClass:
      "from-accent-soft via-white to-sky-100 border-white/80 shadow-[0_24px_60px_-36px_rgba(92,45,158,0.5)]",
  },
  {
    containerClass: "lg:col-span-2 lg:row-span-2",
    frameClass:
      "from-amber-50 via-white to-rose-100 border-white/70 shadow-[0_24px_60px_-36px_rgba(217,119,6,0.45)]",
  },
  {
    containerClass: "lg:col-span-3 lg:row-span-2",
    frameClass:
      "from-emerald-50 via-white to-teal-100 border-white/80 shadow-[0_24px_60px_-36px_rgba(16,185,129,0.45)]",
  },
  {
    containerClass: "lg:col-span-3 lg:row-span-2",
    frameClass:
      "from-indigo-50 via-white to-purple-100 border-white/80 shadow-[0_24px_60px_-36px_rgba(79,70,229,0.45)]",
  },
];

const svgModules = import.meta.glob("../assets/svgs/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const svgUrls = Object.values(svgModules) as string[];

const tiles: SvgTile[] = svgUrls.map((url, index) => {
  const style = tileStyles[index % tileStyles.length];

  return {
    url,
    alt: `Иллюстрация ${index + 1}`,
    containerClass: style.containerClass,
    frameClass: style.frameClass,
  };
});

export const SvgGallery = () => {
  if (tiles.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-accent/30 bg-white/60 p-8 text-center text-sm text-slate-500">
        Добавьте SVG-иллюстрации в <span className="font-semibold">src/assets/svgs</span>, и
        они автоматически появятся здесь.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[160px] lg:grid-cols-6">
      {tiles.map((tile) => (
        <figure key={tile.url} className={`group ${tile.containerClass}`}>
          <div
            className={`relative flex h-full items-center justify-center overflow-hidden rounded-3xl border bg-gradient-to-br p-6 ${tile.frameClass}`}
          >
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute -left-6 -top-10 h-20 w-20 rounded-full bg-white/70 blur-2xl" />
              <div className="absolute -bottom-10 -right-6 h-24 w-24 rounded-full bg-white/70 blur-2xl" />
            </div>
            <img
              src={tile.url}
              alt={tile.alt}
              className="relative z-10 h-full max-h-[200px] w-full object-contain drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)]"
            />
          </div>
        </figure>
      ))}
    </div>
  );
};

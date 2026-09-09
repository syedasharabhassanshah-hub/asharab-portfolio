import Image from "next/image";

type Props = {
  slug: string;
  name: string;
  tint: [string, string];
  priority?: boolean;
  sizes: string;
  className?: string;
};

/**
 * A captured screenshot of a deployed site, served from public/work and
 * resized by the image optimizer. Screenshots are captured ahead of time by
 * `npm run shots` rather than proxied live, so the page never waits on a
 * third-party service. The tinted plate sits behind the image, which keeps
 * the layout intact if a file is ever missing.
 */
export default function SiteShot({
  slug,
  name,
  tint,
  priority = false,
  sizes,
  className = "",
}: Props) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${tint[0]}, ${tint[1]})`,
      }}
    >
      <Image
        src={`/work/${slug}.webp`}
        alt={`The ${name} website`}
        fill
        sizes={sizes}
        priority={priority}
        quality={80}
        className="object-cover object-top"
      />
    </div>
  );
}

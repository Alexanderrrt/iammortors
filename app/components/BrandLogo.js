import Image from "next/image";

export default function BrandLogo({ className = "", alt = "IAM Motors", width = 220, height = 70, priority = false }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <Image
        className="brand-logo__image"
        src="/media/brand/logo.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        draggable={false}
      />
    </span>
  );
}

import Image from "next/image";

// Intrinsic size of the trimmed logo mark (2.5:1). Display size is controlled
// via CSS height + width:auto, so these only set the aspect ratio.
export default function BrandLogo({ className = "", alt = "IAM Motors", priority = false, wordmark = false }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <Image
        className="brand-logo__image"
        src="/media/brand/logo-mark.png"
        alt={alt}
        width={1102}
        height={441}
        priority={priority}
        draggable={false}
      />
      {wordmark && (
        <span className="brand-logo__word" aria-hidden="true">
          <span className="brand-logo__word-a">IAM</span>
          <span className="brand-logo__word-b">MOTORS</span>
        </span>
      )}
    </span>
  );
}

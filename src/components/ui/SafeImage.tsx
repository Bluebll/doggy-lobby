"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=400';

type SafeImageProps = Omit<ImageProps, 'src' | 'onError'> & {
  src: string | undefined | null;
  fallbackSrc?: string;
  isNextImage?: boolean;
};

export default function SafeImage({ src, fallbackSrc = DEFAULT_FALLBACK, isNextImage = false, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  if (isNextImage) {
    return (
      <Image
        {...props}
        src={imgSrc}
        alt={alt || "Product image"}
        onError={handleError}
      />
    );
  }

  return (
    <img
      {...props as React.ImgHTMLAttributes<HTMLImageElement>}
      src={imgSrc}
      alt={alt || "Product image"}
      onError={handleError}
    />
  );
}

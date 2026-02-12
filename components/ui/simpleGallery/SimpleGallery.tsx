'use client';

import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import Image from 'next/image';
const SimpleGallery = ({
  galleryID,
  images,
}: {
  galleryID: string;
  images: { id: number; src: string; width: number; height: number }[];
}) => {
  useEffect(() => {
    let lightBox = new PhotoSwipeLightbox({
      gallery: `#${galleryID}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightBox.init();

    return () => {
      lightBox.destroy();
    };
  }, []);
  return (
    <div id={galleryID} className="my-10">
      <div className="m-4 grid grid-cols-1 gap-4 sm:m-0 sm:grid-cols-3">
        {images.map((item) => (
          <a
            href={item.src}
            key={item.id}
            target="_blank"
            rel="noreferrer"
            data-pswp-width={item.width}
            data-pswp-height={item.height}
          >
            <Image
              key={item.id}
              id={`${item.id}`}
              src={item.src}
              alt="gallery-image"
              width={500}
              height={500}
              className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SimpleGallery;

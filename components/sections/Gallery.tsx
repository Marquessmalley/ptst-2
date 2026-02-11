import SimpleGallery from "@/components/ui/simpleGallery/SimpleGallery";
import { galleryImages } from "@/lib/data/placeholder-data";

const Gallery: React.FC = () => {
  return (
    <div id="gallery" className="mb-16 pt-8 sm:mb-32 sm:pt-24">
      {/* GALLERY HEADER */}
      <div className="mx-auto mb-4 max-w-md sm:max-w-xl md:max-w-3xl lg:text-center">
        <div className="mx-4">
          <p className="text-center text-xl font-bold tracking-tight text-slate-900/80 sm:text-4xl">
            Our Auto Detailing Gallery
          </p>
          <p className="my-4 text-center text-sm font-normal text-gray-700 sm:text-lg">
            See the transformation of our detailing services through our
            gallery.
          </p>
        </div>
      </div>
      {/* GALLERY */}

      <div className="mx-auto grid max-w-7xl justify-items-center">
        <SimpleGallery galleryID="pt-gallery" images={galleryImages} />
      </div>
    </div>
  );
};

export default Gallery;

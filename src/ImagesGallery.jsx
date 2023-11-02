// src/components/ImageGallery.js
import{ useState } from "react";
import classNames from "classnames";
import './ImageGallery.css';
import image1 from './assets/images/image-1.webp';
import image2 from './assets/images/image-2.webp';
import image3 from './assets/images/image-3.webp';
import image4 from './assets/images/image-4.webp';
import image5 from './assets/images/image-5.webp';
import image6 from './assets/images/image-6.webp';
import image7 from './assets/images/image-7.webp';
import image8 from './assets/images/image-8.webp';
import image9 from './assets/images/image-9.webp';
import image10 from './assets/images/image-10.jpeg';
import image11 from './assets/images/image-11.jpeg';


const ImagesGallery = () => {
  const [images, setImages] = useState([
    { id: 1, url: image1, isFeatured: false },
    { id: 2, url: image2, isFeatured: true },
    { id: 3, url: image3, isFeatured: false },
    { id: 4, url: image4, isFeatured: false },
    { id: 5, url: image5, isFeatured: false },
    { id: 6, url: image6, isFeatured: false },
    { id: 7, url: image7, isFeatured: false },
    { id: 8, url: image8, isFeatured: false },
    { id: 9, url: image9, isFeatured: false },
    { id: 10, url: image10, isFeatured: false },
    { id: 11, url: image11, isFeatured: false },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleDelete = () => {
    setImages(images.filter((image) => !selectedImages.includes(image.id)));
    setSelectedImages([]);
  };

  // const handleSetFeatured = (id) => {
  //   setImages((prevImages) =>
  //     prevImages.map((image) => ({
  //       ...image,
  //       isFeatured: image.id === id,
  //     }))
  //   );
  // };


  return (
    <div  className="bg-gray-600 py-4">
    <div className=" p-2 md:w-10/12 lg:w-5/6 mx-auto bg-white rounded-md sm:w-full lg:max-w-[850px]">
      {/* Up Area  */}
      <div className="flex justify-between px-10 py-1">
        
        <div>
          <p className="text-xl mt-1">
            {selectedImages.length > 0
              ? `${selectedImages.length} Files Selected`
              : "Gallery"}
          </p>
        </div>

        {/* Delete Images */}
        <div className="">
          <button
            onClick={handleDelete}
            disabled={selectedImages.length === 0}
            className={classNames("p-2 rounded-lg text-lg", {
              "text-red-600": selectedImages.length > 0,
              "text-black": selectedImages.length === 0,
            })}
          >
            Delete files
          </button>
        </div>
      </div>
      {/* Up Area Ends*/}

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10 border-t sm:w-full lg:max-w-[850px] ">

        {/* Featured Image Section */}

        <div className="w-full h-auto  rounded-md border">

        </div>

        {/* Show Images */}
          {images.map((image) => (
            <div
              key={image.id}
              className={classNames("relative hover:opacity-70 transition-opacity", {
                " rounded-lg ": selectedImages.includes(image.id),
              })}
            >
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className= {classNames("w-12/12 h-auto rounded-lg border", {
                " w-12/12 border border-blue-400": selectedImages.includes(image.id),
              })}
            />
          {/* Images Ends*/}

            {/* Set Featured Image */}

             

            {/* <div className="absolute top-1 left-1">
                <button
                  onClick={() => handleSetFeatured(image.id)}
                  className={classNames("p-1 rounded-full",  {
                    "bg-blue-500": image.isFeatured,
                    "bg-gray-400": !image.isFeatured,
                  })}
                >
                Set Featured
              </button>
            </div> */}
            {/* Featured Image Ends */}

            {/* Checkbox */}
            <div className="absolute bottom-2 left-2">
              <input
              className="w-16 h-4"
                type="checkbox"
                onChange={() => {
                  if (selectedImages.includes(image.id)) {
                    setSelectedImages(selectedImages.filter((id) => id !== image.id));
                  } else {
                    setSelectedImages([...selectedImages, image.id]);
                  }
                }}
                checked={selectedImages.includes(image.id)}
              />
            </div>
            {/* Checkbox End */}

          </div>
        ))}
      </div>

    </div>
    </div>
  );
};

export default ImagesGallery;

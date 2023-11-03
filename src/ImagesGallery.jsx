import{ useCallback, useState } from "react";
import classNames from "classnames";
import './ImageGallery.css';
import image1 from './assets/images/image-1.webp';
import image2 from './assets/images/image-2.webp';
import image3 from './assets/images/image-3.webp';
// import image4 from './assets/images/image-4.webp';
// import image5 from './assets/images/image-5.webp';
// import image6 from './assets/images/image-6.webp';
// import image7 from './assets/images/image-7.webp';
// import image8 from './assets/images/image-8.webp';
// import image9 from './assets/images/image-9.webp';
// import image10 from './assets/images/image-10.jpeg';
// import image11 from './assets/images/image-11.jpeg';


import {
  DndContext,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";


const ImagesGallery = () => {

  // const [images, setImages] = useState([
  //   { id: 1, url: image1},
  //   { id: 2, url: image2},
  //   { id: 3, url: image3},
  
  // ]);

  const images = [
    image1,
    image2,
    image3,
    // image4,
    // image5,
    // image6,
    // image7,
    // image8,
    // image9,
    // image10,
    // image11,
  ];
  
  const [items, setItems] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const handleDelete = () => {
    setItems(items.filter((item) => !selectedImages.includes(item)));
    setSelectedImages([]);
  };

  // const handleDeleteImg = () => {
  //   const filteredArray1 = items.filter((item) => !deletedImg.includes(item));
  //   setDeletedImg([]);
  //   setItems(filteredArray1);
  // };








  
  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);


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
     <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
     >

      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-10 border-t sm:w-full lg:max-w-[850px] ">
            
          
        {items.map((image, index) => (
        
          <SortableItem
          key={index}
          image={image}
          index={index}

          ></SortableItem>
        ))}

  
        </div>
      </SortableContext>


      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeId ? <SortableItem id={activeId} isDragging /> : null}
          </DragOverlay>
     </DndContext>

    </div>
    </div>

   
  );
};

export default ImagesGallery;
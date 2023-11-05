import { useState } from "react";
import classNames from "classnames";
import "./ImageGallery.css";
import image1 from "./assets/images/image-1.webp";
import image2 from "./assets/images/image-2.webp";
import image3 from "./assets/images/image-3.webp";
import image4 from './assets/images/image-4.webp';
import image5 from './assets/images/image-5.webp';
import image6 from './assets/images/image-6.webp';
import image7 from './assets/images/image-7.webp';
import image8 from './assets/images/image-8.webp';
import image9 from './assets/images/image-9.webp';
import image10 from './assets/images/image-10.jpeg';
import image11 from './assets/images/image-11.jpeg';
import { DndContext,  closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";


const ImagesGallery = () => {
  const images = [
    {
      id: 1,
      url: image1,
      alt: "image1",
    },
    {
      id: 2,
      url: image2,
      alt: "image2",
    },
    {
      id: 3,
      url: image3,
      alt: "image3",
    },
    {
      id: 4,
      url: image4,
      alt: "image4",
    },
    {
      id: 5,
      url: image5,
      alt: "image5",
    },
    {
      id: 6,
      url: image6,
      alt: "image6",
    },
    {
      id: 7,
      url: image7,
      alt: "image7",
    },
    {
      id: 8,
      url: image8,
      alt: "image8",
    },
    {
      id: 9,
      url: image9,
      alt: "image9",
    },
    {
      id: 10,
      url: image10,
      alt: "image10",
    },
    {
      id: 11,
      url: image11,
      alt: "image11",
    },
  ];

  const [items, setItems] = useState(images);
  const [deletedImg, setDeletedImg] = useState([]);

  const handleDeleteImg = () => {
    const filteredArray1 = items.filter((item) => !deletedImg.includes(item));
    setDeletedImg([]);
    setItems(filteredArray1);
  };

  return (
    <div className="bg-[#E9EBF7] py-4 h-[800px]">
      <div className=" p-2 md:w-10/12 lg:w-5/6 mx-auto bg-white rounded-md sm:w-full lg:max-w-[850px]">
        {/* Up Area  */}
        <div className="flex justify-between px-10 py-1">
          <div>
            <p className="text-xl mt-1">
              {deletedImg.length > 0
                ? `${deletedImg.length} Files Selected`
                : "Gallery"}
            </p>
          </div>

          <div >
            <button
              onClick={handleDeleteImg}
              disabled={deletedImg.length === 0}
              className={classNames("p-2 rounded-lg text-lg", {
                "text-red-600": deletedImg.length > 0,
                "text-black": deletedImg.length === 0,
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
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-10 border-t sm:w-full lg:max-w-[850px] ">
              {items.map((image, index) => (
                <SortableItem
                  key={index}
                  image={image}
                  deletedImg={deletedImg}
                  setDeletedImg={setDeletedImg}
                  index={index}
                ></SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  function handleDragEnd (event){
    console.log("drag end called")
    const {active, over}= event;
    console.log('active:' + active.id)
    console.log('over:' + over.id)
    if(active?.id !== over?.id){
      setItems((items) => {
        const activeIndex = items.indexOf(active?.id);
        const overIndex = items.indexOf(over?.id);
        return arrayMove(items, activeIndex, overIndex);
      })
    }
  }


};


export default ImagesGallery;

import { useEffect, useState } from "react";
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
import dark from './assets/dark.png';
import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
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

  // Dark mode
  const [theme, setTheme] = useState("light")

  useEffect(()=>{
      if(theme === "dark"){
        document.documentElement.classList.add("dark");
      }
      else{
        document.documentElement.classList.remove("dark");
      }
  }, [theme]);

  const HandleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" :"dark");
  }
  // Dark mode end

  const [items, setItems] = useState(images);
  const [deletedImg, setDeletedImg] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  
  const handleDeleteImg = () => {
    const updatedItems = items.filter((item) => !selectedImages.includes(item.id));
    setItems(updatedItems);
    console.log('clicked')
    setDeletedImg([]);
  };

  return (
    <div className="bg-[#E9EBF7] dark:bg-[#292929] py-4 h-[800px]">
      <div className=" p-2 md:w-10/12 lg:w-5/6 mx-auto bg-white dark:bg-[#121212] rounded-md sm:w-full lg:max-w-[850px]">
        {/* Up Area  */}
        <div className="flex justify-between px-10 py-1">
          <div>
            <p className="text-xl mt-1 dark:text-white">
              {selectedImages.length > 0
                ? `${selectedImages.length} Files Selected`
                : "Gallery"}
            </p>
          </div>

          <div className="flex items-center">
            <img className="w-6 h-6" onClick={HandleThemeSwitch}  src={dark} alt="" />
            <button
              onClick={handleDeleteImg}
              className={classNames("p-2 rounded-lg text-lg dark:text-white", {
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
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                ></SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );


  function handleDragEnd(event) {
    const { active, over } = event;
  
    if (!active || !over || active.id === over.id) {
      return;
    }
  
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
  
    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = [...items];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
  
      setItems(newItems);
    }
  }

};


export default ImagesGallery;

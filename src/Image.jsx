/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from "react";


const Image = forwardRef(
  (
    {
      image,
      index,
      selectedImages,
      setSelectedImages,
      isDragging,
      style,
      ...props
    },
    ref
  ) => {

    const [hovered, setHovered] = useState(false);
    const isSelected = selectedImages.includes(image.id);
    

    useEffect(() => {
      if (isSelected) {
        setHovered(true);
      }
    }, [isSelected]);


    const handleImageSelection = () => {
      if (selectedImages.includes(image.id)) {
        setSelectedImages(selectedImages.filter((id) => id !== image.id));
      } else {
        setSelectedImages([...selectedImages, image.id]);
      }
    };

    const styles = {
      opacity: "1",
      transformOrigin: "0% 0%",
      height: `${index === 0 ? "300px" : "140px"}`,
      width: `${index === 0 ? "300px" : "140px"}`,
      border: "1px solid #E9EBF7",
      borderRadius: "12px",
      gridColumn: `${index === 0 ? "1 / span 2" : ""}`,
      gridRow: `${index === 0 ? "1 / span 2" : ""}`,
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    };

    return (
      <>
        <div
          ref={ref}
          style={styles}
          {...props}
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleImageSelection}
        >
          <img className="rounded-[10px]" src={image?.url} alt="" />

        <input
          type="checkbox"
          name={image.id}
          id={image.id}
          className="absolute top-2 left-2 w-4 rounded-md h-4"
          onChange={handleImageSelection}
        />

          {hovered && (
            <div
            style={{
              position: 'absolute',
              opacity: index === 0 ? 0 : 0.4,
              backgroundColor: 'black',
              inset: 0,
              pointerEvents: 'none',
              borderRadius:'10px',
              zIndex: 10,
            }}
            ></div>
          )}

        </div>
      </>
    );
  }
);

export default Image;
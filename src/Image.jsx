/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from "react";


const Image = forwardRef(
  (
    {
      image,
      index,
      deletedImg,
      setDeletedImg,
      isDragging,
      style,
      ...props
    },
    ref
  ) => {

    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(deletedImg?.includes(image));
 
   
    useEffect(() => {
      setSelected(deletedImg?.includes(image));
    }, [deletedImg, image]);

    const handleDeletedImages = () => {
      const updatedDeletedImg = [...deletedImg];
      const isCurrentlySelected = updatedDeletedImg?.includes(image);

      if (isCurrentlySelected) {
        updatedDeletedImg?.splice(updatedDeletedImg?.indexOf(image), 1);
      } else {
        updatedDeletedImg?.push(image);
      }

      setDeletedImg(updatedDeletedImg);
      setSelected(!isCurrentlySelected);
    };

    const styles = {
      opacity: "1",
      transformOrigin: "0% 0%",
      height: `${index === 0 ? "300px" : "140px"}`,
      width: `${index === 0 ? "300px" : "140px"}`,
      borderRadius: "12px",
      gridColumn: `${index === 0 ? "1 / span 2" : ""}`,
      gridRow: `${index === 0 ? "1 / span 2" : ""}`,
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #E9EBF7",
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
        >
          <img className="rounded-[10px]" src={image?.url} alt="" />
          
        <input
            type="checkbox"
            isSelected={selected}
            name={image}
            id={image?.id}
            className='absolute top-2 left-2 w-4 rounded-md h-4'
            onChange={handleDeletedImages}
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
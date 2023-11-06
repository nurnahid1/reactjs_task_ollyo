import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "./Image";


export function SortableItem(props) {
  const { image, selectedImages, setSelectedImages } = props;
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
      <Image 
      ref={setNodeRef} 
      style={style} 
      isDragging={isDragging}
      image={image}
      {...props} 
      {...attributes} 
      {...listeners}
      selectedImages={selectedImages}
      setSelectedImages={setSelectedImages}
      ></Image>
  );
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export function SortableItem(props){
    const {
        // isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id: props.id  });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return(
        // <SingleImage
        // ref={setNodeRef}
        // style={style}
        // {...props}
        // {...attributes}
        // {...listeners}
        // >

        // </SingleImage>

        <div  ref={setNodeRef}
        style={style}
        {...props}
        {...attributes}
        {...listeners}>

 
        </div>
    )

}
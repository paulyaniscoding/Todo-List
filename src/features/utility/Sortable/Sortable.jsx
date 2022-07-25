import {
    DndProvider,
} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const Sortable = (props) => {

    return (
        <DndProvider backend={HTML5Backend}>
            {props.children}
        </DndProvider>
    );
}
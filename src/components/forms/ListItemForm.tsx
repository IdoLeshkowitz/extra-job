import {FC, FormEvent, FormEventHandler, ReactNode} from "react";
import {Form} from "react-bootstrap";

interface ListItemFormProps {
    children: ReactNode,
    onSubmit: FormEventHandler

}

const ListItemForm: FC<ListItemFormProps> = ({children, onSubmit}) => {
    return (
        <Form
            className="list-group-item-text bg-faded-light rounded p-2 border-light d-flex flex-row-reverse justify-content-between h-25 align-items-center mb-1"
            onSubmit={onSubmit}
        >
            {children}
        </Form>
    )
}

export default ListItemForm
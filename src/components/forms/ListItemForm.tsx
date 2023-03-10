import {FC, FormEvent, FormEventHandler, ReactNode} from "react";
import {Form} from "react-bootstrap";

interface ListItemFormProps {
    children: ReactNode,
    onSubmit: FormEventHandler

}

const ListItemForm: FC<ListItemFormProps> = ({children, onSubmit}) => {
    return (
        <Form
            className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center"
            onSubmit={onSubmit}
        >
            {children}
        </Form>
    )
}

export default ListItemForm
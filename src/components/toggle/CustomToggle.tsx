import { useAccordionButton, OverlayTrigger, Tooltip } from "react-bootstrap"


const CustomToggle = ({eventKey}: { eventKey: string }) => {
    const handleClick = useAccordionButton(eventKey, (e) => e.preventDefault())
    return (
        <OverlayTrigger
            placement='top'
            overlay={<Tooltip>Edit</Tooltip>}
        >
            <a
                href='#'
                className='nav-link py-0'
                onClick={handleClick}
            >
                <i className='fi-edit'></i>
            </a>
        </OverlayTrigger>
    )
}

export default CustomToggle
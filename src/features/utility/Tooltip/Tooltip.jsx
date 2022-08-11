import { cloneElement, useState } from 'react';
import ReactTooltip from 'react-tooltip';

// fix "not disappearing" for ReactTooltip
export const Tooltip = ({ tooltipId, msg, children }) => {
    const [tooltip, showTooltip] = useState(false);
    const childrenWifProps = cloneElement(
        children,
        {   
            'data-tip': true,
            'data-for': tooltipId,
            'onMouseEnter': (e) => showTooltip(true),
            'onMouseLeave': (e) => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
            },
        }
    )
    return (
        <>
            {tooltip && <ReactTooltip id={tooltipId} effect="solid" >{msg}</ReactTooltip>}
            {childrenWifProps}
        </>
    )
}
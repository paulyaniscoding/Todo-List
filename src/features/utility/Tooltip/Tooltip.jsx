import { cloneElement } from 'react';
import './toolTip.css'

export const Tooltip = ({ msg, children }) => {

    //const childrenWifProps = cloneElement(
    //    children,
    //    {
    //        class: 'tooltip',
    //        children: (<span class="tooltiptext">{msg}</span>),
    //    }
    //)    
    return (
        //<div class="tooltip">Hover over me
        //    <span class="tooltiptext">Tooltip text</span>
        //</div>       
        <div class="tooltip">
            {children}
            <span class="tooltiptext">{msg}</span>
        </div>    
    )    
}
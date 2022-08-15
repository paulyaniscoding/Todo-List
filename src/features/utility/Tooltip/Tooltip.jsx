import './toolTip.css'

export const Tooltip = ({ msg, childrenLayout, children }) => {   
    return (   
        <div class="tooltip" style={childrenLayout}>
            {children}
            <span class="tooltiptext">{msg}</span>
        </div>    
    )    
}
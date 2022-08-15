import { useState } from "react";
import styled from '@emotion/styled'

import { Tooltip } from "../Tooltip/Tooltip";

const CollapsibleLayout = styled.div`
    /*width: max(100%, 500px),*/
    display: grid;
    grid-template-columns: 7px 1fr;
    gap: 0;
    justify-content: start;
    align-items: start;
    border-bottom: 1px solid ${props => props.borderColor} ;
    border-right: 1px solid ${props => props.borderColor};
    margin: 0 -1px 10px 0; /*0 -1px -1px 0,  TODO: 負責出面layout 嘅css 應該放去出面 */  
`;
const CollapsibleMainItem = styled.div`
    display: flex; 
    align-items: center; 
    height: 100%;
    border: none; 
    padding: none; 
    gird-column: 2 / 3; 
    gird-row: 1 / 2;
`
const CollapsibleZone = styled.div`
    display: ${props => (props.isCollapsed?'none':'block')};
    padding: 10px 0 0 20px;
    margin: 0px 0 0px 0;
    gird-column: 2 / 3;
    gird-row: 2 / 3;
`

const StyledCollapsibleBtn = styled.div`
    width: 7px;
    height: 100%;
    border: none;
    padding: none;
    background-color: ${props => props.color.frame}; /*gray;*/
    cursor: pointer;
    /*
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    align-self: stretch;
    */
    margin: 0 -1px -1px 0;
`;

const CollapsibleBtn = ({ isCollapsed, setIsCollapsed, color }) => {
    return (
        <Tooltip msg={isCollapsed ? 'Expand' : 'Collapse'} childrenLayout={{
            gridColumn: '1 / 2',
            gridRow: '1 / 3',
            alignSelf: 'stretch',
        }}>
            <StyledCollapsibleBtn
                isCollapsed={isCollapsed}
                onClick={() => setIsCollapsed(!isCollapsed)}
                color={color}
            />
        </Tooltip>
    )
}

export function Collapsible({ parentNode, collapsed, color, children }) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    return (
        <CollapsibleLayout borderColor={color.frame}>
            <CollapsibleBtn 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
                color={color}
            />
            <CollapsibleMainItem>    
                {parentNode}
            </CollapsibleMainItem>
            <CollapsibleZone
                isCollapsed={isCollapsed}
                aria-expanded={isCollapsed}
            >
                {children}
            </CollapsibleZone>
        </CollapsibleLayout>
    );
}

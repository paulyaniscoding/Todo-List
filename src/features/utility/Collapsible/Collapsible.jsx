import React from "react";
import styled from '@emotion/styled'
import {css} from '@emotion/react'

import {
    MdChevronRight,
    MdExpandMore,
} from "react-icons/md";

const StyledCollapsedIcon = styled(MdChevronRight)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: gray;
    :hover {
        color: pink;
    };
`;

const StyledExpandedIcon = styled(MdExpandMore)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: gray;
    :hover {
        color: pink;
    };
`;

const CollapsibleZone = styled.div`
    display: ${props => (props.isCollapsed?'none':'block')};
    margin: 0px 0 0px 0;
    gird-column: 2 / 3;
    gird-row: 2 / 3;
`

const StyledCollapsibleBtn = styled.div`
    width: 7px;
    border: none;
    padding: none;
    background-color: gray;
    cursor: pointer;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    align-self: stretch;
`
//background-color: ${props => (props.isCollapsed ? 'gray' : 'black')};

const CollapsibleBtn = ({ isCollapsed, setIsCollapsed }) => {
    return (
        <StyledCollapsibleBtn
            isCollapsed={isCollapsed}
            onClick={() => setIsCollapsed(!isCollapsed)}
        />
    )

    // Arrow Button
    // return (
    //     isCollapsed ? (
    //         <StyledCollapsedIcon
    //             onClick={() => setIsCollapsed(!isCollapsed)}
    //         />
    //     ) : (
    //         <StyledExpandedIcon
    //             onClick={() => setIsCollapsed(!isCollapsed)}
    //         />
    //     )
    // )
}

export function Collapsible({ parentNode, collapsed, children }) {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

return (
    <div style={{
        display: 'grid', 
        gridTemplateColumns: '7px 1fr',
        gap: '0',
        justifyContent: 'start',
        alignItems: 'start',
    }}>
        <CollapsibleBtn isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            height: '100%', 
            border: 'none', 
            padding: 'none', 
            girdColumn: '2 / 3', 
            girdRow: '1 / 2', 
        }}>    
            {parentNode}
        </div>
        <CollapsibleZone
            isCollapsed={isCollapsed}
            // aria-expanded 是给 Screen Reader 用来 判断当前元素状态的辅助属性
            aria-expanded={isCollapsed}
        >
            <div style={{height: '10px'}}></div>
            {children}
        </CollapsibleZone>
    </div>
);
}

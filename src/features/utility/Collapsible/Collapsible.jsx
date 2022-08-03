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
    border-left: 7px solid  ${props => (props.isCollapsed ? 'gray' : 'black')};;  
    margin: 0px 0 0px 0;
`

const StyledCollapsibleBtn = styled.div`
    width: 7px;
    border: none;
    padding: none;
    background-color: ${props => (props.isCollapsed ? 'gray' : 'black')};
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
`

const AsistingAlignDiv = styled.div`
    width: 14px;
    background-color: black;
    position: static;
`

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
    <div style={{marginBottom: '10px', }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative', border: 'none', padding: 'none' }}>
            <CollapsibleBtn isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <AsistingAlignDiv></AsistingAlignDiv>
            {parentNode}
        </div>
        <CollapsibleZone
            isCollapsed={isCollapsed}
            // aria-expanded 是给 Screen Reader 用来 判断当前元素状态的辅助属性
            aria-expanded={isCollapsed}
        >
            {children}
        </CollapsibleZone>
    </div>
);
}



// return (
//     <div>
//         <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative', border: 'none', padding: 'none' }}>
//             <CollapsibleBtn isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//             <AsistingAlignDiv></AsistingAlignDiv>
//             {parentNode}
//         </div>
//         <CollapsibleZone
//             isCollapsed={isCollapsed}
//             // aria-expanded 是给 Screen Reader 用来 判断当前元素状态的辅助属性
//             aria-expanded={isCollapsed}
//         >
//             {children}
//         </CollapsibleZone>
//     </div>
// );
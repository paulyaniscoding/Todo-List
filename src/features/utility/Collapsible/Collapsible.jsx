import { useState } from "react";
import styled from '@emotion/styled'
import {css} from '@emotion/react'

import {
    MdChevronRight,
    MdExpandMore,
} from "react-icons/md";
import { themeColor } from "../../theme/theme";

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
    padding: 0 0 0 20px;
    margin: 0px 0 0px 0;
    gird-column: 2 / 3;
    gird-row: 2 / 3;
`

const StyledCollapsibleBtn = styled.div`
    width: 7px;
    border: none;
    padding: none;
    background-color: ${props => props.color.frame}; /*gray;*/
    cursor: pointer;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    align-self: stretch;
    margin: 0 -1px -1px 0;
`
//background-color: ${props => (props.isCollapsed ? 'gray' : 'black')};

const CollapsibleBtn = ({ isCollapsed, setIsCollapsed, color }) => {
    return (
        <StyledCollapsibleBtn
            isCollapsed={isCollapsed}
            onClick={() => setIsCollapsed(!isCollapsed)}
            color={color}
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

export function Collapsible({ parentNode, collapsed, color, children }) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    return (
        <div style={{
            //width: 'max(100%, 500px)',
            display: 'grid', 
            gridTemplateColumns: '7px 1fr',
            gap: '0',
            justifyContent: 'start',
            alignItems: 'start',
            borderBottom: `1px solid ${color.frame}`,
            borderRight: `1px solid ${color.frame}`,
            margin: '0 -1px 10px 0', //'0 -1px -1px 0', /* TODO: 負責出面layout 嘅css 應該放去出面 */
        }}>
            <CollapsibleBtn 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
                color={color}
            />
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

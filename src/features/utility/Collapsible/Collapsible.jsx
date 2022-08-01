import React from "react";
import styled from '@emotion/styled'

import {
    MdChevronRight,
    MdExpandMore,
} from "react-icons/md";

const StyledCollapsedIcon = styled(MdChevronRight)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: grey;
    :hover {
        color: pink;
    };
`;

const StyledExpandedIcon = styled(MdExpandMore)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: grey;
    :hover {
        color: pink;
    };
`;

const CollapsibleDiv = styled.div`
    display: ${props => (props.isCollapsed?'none':'block')};
    margin-left: 10px;
    border-left: 7px solid rgb(58, 244, 58);
    
`

export function Collapsible({ parentNode, collapsed, children }) {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '40px'}}>
                    {isCollapsed ? (
                        <StyledCollapsedIcon
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        />
                    ) : (
                        <StyledExpandedIcon
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        />
                    )}
                </div>
                {parentNode}
            </div>
            <CollapsibleDiv
                isCollapsed={isCollapsed}
                // aria-expanded 是给 Screen Reader 用来 判断当前元素状态的辅助属性
                aria-expanded={isCollapsed}
            >
                <hr />
                {children}
            </CollapsibleDiv>
        </div>
    );
}

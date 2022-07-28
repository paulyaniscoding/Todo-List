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

export function Collapsible({ parentNode, collapsed, children }) {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

    const style = {
        collapsed: {
            display: "none"
        },
        expanded: {
            display: "block"
        }
    };

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
            <div
                className="collapse-content"
                // 决定显示和折叠
                style={isCollapsed ? style.collapsed : style.expanded}
                // aria-expanded 是给 Screen Reader 用来 判断当前元素状态的辅助属性
                aria-expanded={isCollapsed}
            >
                <hr />
                {children}
            </div>
        </div>
    );
}


import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';

import {
    selectTodoEntities,
} from './todosSlice'

import { TodoItem } from './TodoItem'

export const MinimalRenderer = ({ treeItems, treeId }) => {
    return (
        <>
            <UncontrolledTreeEnvironment
                canDragAndDrop={true}
                canDropOnItemWithChildren={true}
                canReorderItems={true}
                dataProvider={new StaticTreeDataProvider(treeItems, (item, data) => {return ({ ...item, data });})}
                getItemTitle={item => { /*console.log('tree getItemTitle', item.data.id);*/ return item.data.id;}}  // TODO: 好似render 咗好多次咁
                viewState={{
                    [treeId]: {
                        expandedItems: ['Fruit', 'Meals', 'America', 'Europe', 'Asia', 'Desserts'],
                    },
                }}
                renderItemTitle={({ title }) => title }
                renderItemArrow={({ item, context }) =>
                    item.hasChildren ? context.isExpanded ? <span>{'>'}</span> : <span>{'v'}</span> : null
                }
                renderItem={({ title, arrow, context, children }) => (
                    <li {...context.itemContainerWithChildrenProps}>
                        {/*console.log(`tree renderItem, title:${title}`), children:${children['key']}, children.keys:${Object.keys(children)}`)*/}
                        <div {...context.itemContainerWithoutChildrenProps} {...(context.interactiveElementProps)}>
                            {arrow}
                            <TodoItem todoId={title} key={title} />
                            
                        </div>
                        {children}
                        {console.log(`Tree - ${title} - renderItem():`, children)}
                    </li>
                )}
                renderTreeContainer={({ children, containerProps }) => <div {...containerProps}>{children}</div>}
                renderItemsContainer={({ children, containerProps }) => <ul {...containerProps}>{children}</ul>}
        >
                {console.log(`Tree: rendering, treeItems:${Object.keys(treeItems)}`)}
                <Tree treeId={treeId} rootItem="root" treeLabel="Tree Example" />
            </UncontrolledTreeEnvironment>
        </>
    );
}
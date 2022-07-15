
import React from 'react'
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';

export const MinimalRenderer = ({ treeItems, treeId }) => (
    <>
        <UncontrolledTreeEnvironment
            canDragAndDrop={true}
            canDropOnItemWithChildren={true}
            canReorderItems={true}
            dataProvider={new StaticTreeDataProvider(treeItems, (item, data) => ({ ...item, data }))}
            getItemTitle={item => item.data.title}
            viewState={{
                [treeId]: {
                    expandedItems: ['Fruit', 'Meals', 'America', 'Europe', 'Asia', 'Desserts'],
                },
            }}
            renderItemTitle={({ title }) => <span>{title}</span>}
            renderItemArrow={({ item, context }) =>
                item.hasChildren ? context.isExpanded ? <span>{'>'}</span> : <span>{'v'}</span> : null
            }
            renderItem={({ title, arrow, context, children }) => (
                <li {...context.itemContainerWithChildrenProps}>
                    <button {...context.itemContainerWithoutChildrenProps} {...(context.interactiveElementProps)}>
                        {arrow}
                        {title}
                    </button>
                    {children}
                </li>
            )}
            renderTreeContainer={({ children, containerProps }) => <div {...containerProps}>{children}</div>}
            renderItemsContainer={({ children, containerProps }) => <ul {...containerProps}>{children}</ul>}
    >
            <Tree treeId={treeId} rootItem="root" treeLabel="Tree Example" />
        </UncontrolledTreeEnvironment>
    </>
);
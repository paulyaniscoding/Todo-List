import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { MinimalRenderer } from './MinimalRenderer'
import {
    selectTodoEntities,
} from './todosSlice'

export const TodosSublist = ({ listCategory, listIds }) => {
    let todoEntities = useSelector(selectTodoEntities)

    let treeItems = Object.fromEntries(
        listIds.map(itemId => [itemId, {
            index: itemId,
            canMove: true,
            hasChildren: todoEntities[itemId].children,
            children: todoEntities[itemId].children,
            data: todoEntities[itemId],
            canRename: false,
        }])
    );

    treeItems.root = {
        index: 'root',
        canMove: false,
        hasChildren: true,
        children: listIds.filter(itemId => todoEntities[itemId].parent==='root'),
        data: 'Root item',
        canRename: false,
    };

    return (
        <div style={{ margin: '10px 0', padding: '0 0 10px 0', borderBottom: '1px solid black' }} key={listCategory}>
            {console.log(`Sublist: rendering, "${listCategory}"`)}
            {console.log(`Sublist: listIds: ${listIds}`)}
            {console.log(`Sublist: treeItems: ${Object.keys(treeItems)}`)}
            <div>{listCategory}</div>
            <MinimalRenderer treeItems={treeItems} treeId={`tree-${listCategory}`} />
        </div>
    );
}
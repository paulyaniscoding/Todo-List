import update from 'immutability-helper'
import React, { 
    useCallback, 
    useEffect,
    useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { Sortable } from '../utility/Sortable/Sortable'
import { TodoSubtree } from './TodoSubtree'
import { 
    AddTodoForm, 
} from './AddTodoForm/AddTodoForm'

import {
    AddTodoFormInlineLayout,
} from './AddTodoForm/AddTodoFormInlineLayout'

import {
    AddTodoFormLayout,
} from './AddTodoForm/AddTodoFormLayout'

//import '../../App.css';

import {
    selectAllTodos,
    selectTodoEntities,
    fetchTodos,
    selectTodoIds,
    selectTodoById,

    startTodo,
    pauseTodo,
    endTodo,
    changePriority,
} from './todosSlice'

export const TodosDemo = () => {
    let todos = useSelector(selectAllTodos);
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)
    let dispatch = useDispatch();

    let dragTodoHandler = (dragIndex, hoverIndex) => {
        dispatch(changePriority([dragIndex, hoverIndex]))
    }
    
    // TODO: Category Sorting Output 要改, 一Category 上只可有一h2
    let treeRoots = todoIds.filter(id => todosEntities['root'].children.includes(id))
    let todoSubtrees = treeRoots.map(
        (id, index) => {
            let category = todosEntities[id].category;
            return (
                <>
                    <h2>{category}</h2>
                    <div style={{ marginBottom: '10px',/*marginBottom: (index === (treeRoots.length - 1) ? '0' : '10px'),*/ }}>
                        <TodoSubtree
                            itmId={id}
                            onDragTodo={dragTodoHandler}
                            key={id}
                        />
                    </div>
                </>
            );
        }
    );
    
    // Sorting Phase
    // treeRootKeyInfos structure: [{id, dragGroup}, ...]
    // Example: getOrganizedItmsBy([1, 5, 6, 9], ['category', 'recordingTime', 'timeUsed'])
    // 先Test 'day' 同埋'category'
    const getOrganizedItmsBy = (treeRootKeyInfos, organizingCodes) => {
        // 1. Check This Level
        // 1.1. Get organizedItms
        const getOrganizingVal = (id, organizingCode) => {
            const organizingFields = {  // TODO: Need to adjust
                'category': 'category',
                'day': 'recordingTime',
                'month': 'recordingTime',
                'year': 'recordingTime',
                'timeUsed': 'timeUsed',
            }
            let organizingField = organizingFields(organizingCode)
            let rawVal = todosEntities[id][organizingField];
            let organizingVal = rawVal;
            switch (organizingCode) {  // TODO: Need to adjust
                case 'day':
                    organizingVal = rawVal.substring(0, 10);
                    break;
                case 'month':
                    organizingVal = rawVal.substring(0, 7);
                    break;
                case 'year':
                    organizingVal = rawVal.substring(0, 4);
                    break;
                default:
                    break;
            }

            return organizingVal;
        }
        let organizedItms = treeRootKeyInfos
            .reduce( (prevItms, curId) => {
                let {id, dragGroup} = curId;
                let organizingVal = getOrganizingVal(id, organizingCodes[0]);    // eg, curOrganizingField='date', organizingVal='2022-01-01'
                let newDragGroup = dragGroup ? `${dragGroup}-~-~${organizingVal}` : organizingVal; // For restriction of dragging
                prevItms[organizingVal] = prevItms[organizingVal] || [];
                prevItms[organizingVal].push({ id, newDragGroup });
                return prevItms;
            }, {});

        // 1.2. Get sortedOrganizingField
        let sortedOrganizingField = Object.keys(organizedItms);
        switch (organizingCodes[0]) {  // TODO: Need to adjust
            case 'day':
                sortedOrganizingField.sort((date1, date2) => {
                    let yr1 = date1.substring(0, 4);
                    let yr2 = date2.substring(0, 4);

                    if (yr1 !== yr2) {
                        return (yr1 - yr2);
                    } else {
                        let mth1 = date1.substring(5, 7);
                        let mth2 = date2.substring(5, 7);

                        if (mth1 !== mth2) {
                            return (mth1 - mth2);
                        } else {
                            let day1 = date1.substring(8, 10);
                            let day2 = date2.substring(8, 10);
                            
                            return (day1 - day2);
                        }
                    }
                });
                break;
            case 'month':
                sortedOrganizingField.sort((date1, date2) => {
                    let yr1 = date1.substring(0, 4);
                    let yr2 = date2.substring(0, 4);
                    if (yr1 !== yr2) {
                        return (yr1 - yr2);                  
                    } else {
                        let mth1 = date1.substring(5, 7);
                        let mth2 = date2.substring(5, 7);
                        return (mth1 - mth2);  
                    }
                });
                break;
            case 'year':
                sortedOrganizingField.sort( (yr1, yr2) => (yr1-yr2) );
                break;
            default:
                sortedOrganizingField.sort();            
        }

        // 2.
        if (organizingCodes.length > 0) {
            // Check Lower Level
            Object.keys(sortedOrganizingField).forEach(key => {
                organizedItms[key] = getOrganizedItmsBy(organizedItms[key].slice(0), organizingCodes.slice(1))
            })
        } else {
            // Sort the deepest level by 'Priority' field
            Object.keys(sortedOrganizingField).forEach(key => {
                organizedItms[key] = organizedItms[key].sort((id1, id2) => (
                    todosEntities[id1.id].priority - todosEntities[id2.id].priority
                ))
            })
        }

        return {organizedItms, sortedOrganizingField}
    }

    // Render Phase
    let treeRootKeyInfos = todoIds.filter(id => todosEntities['root'].children.includes(id)).map(id => ({ id, dragGroup: '' }))
    let organizedItms = getOrganizedItmsBy(treeRootKeyInfos, ['day', 'category']);
    let todosJSX = '';
    if (typeof(organizedItms) ==='object' ) {
        todosJSX = organizedItms.sortedOrganizingField.map(val => {
            let heading = val;

            // 未寫好{
            let lowerLvContent = ;
            organizedItms.organizedItms[val]
            // }未寫好

            return (
                <>
                    <h1>{heading}</h1>
                    <div style={{ marginBottom: '10px',/*marginBottom: (index === (treeRoots.length - 1) ? '0' : '10px'),*/ }}>
                        {lowerLvContent}
                    </div>
                </>
            )
        })
    } else {    // no organizing
        
        todosJSX
    }
    //let treeRootKeyInfos = todoIds.filter(id => todosEntities['root'].children.includes(id)).map(id => {id, dragGroup: ''})
    //let todoSubtrees = treeRoots.map(
    //    (id, index) => {
    //        let category = todosEntities[id].category;
    //        return (
                <>
                    <h2>{category}</h2>
                    <div style={{ marginBottom: '10px',/*marginBottom: (index === (treeRoots.length - 1) ? '0' : '10px'),*/ }}>
                        <TodoSubtree
                            itmId={id}
                            onDragTodo={dragTodoHandler}
                            key={id}
                        />
                    </div>
                </>
    //        );
    //    }
    //);






    /*
        Sorting Logic:
            target:
                root => rootChildren

                // from itmRoots to organized JSX
                getOrganizedItmByCategory = (unSorted_itms=rootChildren) => {
                    // Sorting Phase
                    unSorted_itms => {
                        organizedItms = {.
                            category: [rootList],
                        }
                        sortedCategory = organizedItms => sortedCategory
                        return [sortedCategory, organizedItms]
                    }

                    // Render Phase
                    itmsOrganizedByTodoCategory = sortedCategory.map(
                        category => {
                            itmsUnderSameCategory = organizedItms[category]

                            // Get itmJSXsUnderSameCategory
                            init itmJSXsUnderSameCategory
                            // Node Stage, run next sorting callback
                            if (有下一個Sorting Callback) {
                                (二次Sorting可以喺e個位做)
                                (sorted_itmsUnderSameCategory = 二次SortingCallback(itmsUnderSameCategory))	
                                (eg:)
                                itmJSXsUnderSameCategory = getOrganizedItmByDate(itmsUnderSameCategory)
                            } 
                            // Leaf Stage, no next sorting callback
                            else {

                                // Render Itm						
                                itmJSXsUnderSameCategory = itmsUnderSameCategory.map(
                                    id => <TodoItem/>
                                )
                            }

                            // Render Category
                            return (
                                <h2>
                                    {itmJSXsUnderSameCategory}
                                </h2>
                            )
                        }
                    )
                }        
    */

    return (
        <>
            <AddTodoForm parentId={'root'} formLayout={<AddTodoFormInlineLayout/>}/>
            <Sortable>
                {todoSubtrees}
            </Sortable>
        </>
    )
}
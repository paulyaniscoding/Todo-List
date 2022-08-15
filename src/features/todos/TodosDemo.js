import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from '@emotion/styled'

import { Sortable } from '../utility/Sortable/Sortable'
import { TodoSubtree } from './TodoSubtree'
import { 
    AddTodoForm, 
} from './AddTodoForm/AddTodoForm'

import {
    AddTodoFormInlineLayout,
} from './AddTodoForm/AddTodoFormInlineLayout'

import {
    selectTodoEntities,
    selectTodoIds,
    changePriority,
} from './todosSlice'
import { themeColor } from '../theme/theme'

const TodoDemoLayout = styled.div`
    display: flex;
    justify-content: center;
`
const OrganizedGroup = styled.div`
    marginBottom: 10px;
`

export const TodosDemo = () => {
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)
    let dispatch = useDispatch();

    let dragTodoHandler = (dragIndex, hoverIndex) => {
        dispatch(changePriority([dragIndex, hoverIndex]))
    }
     
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
            let organizingField = organizingFields[organizingCode]
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
                let newDragGroup = dragGroup ? `${dragGroup}-~-~${organizingVal}` : organizingVal; // For dragging restriction
                prevItms[organizingVal] = prevItms[organizingVal] || [];
                prevItms[organizingVal].push({ id, dragGroup: newDragGroup });
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
                        return (yr2 - yr1);
                    } else {
                        let mth1 = date1.substring(5, 7);
                        let mth2 = date2.substring(5, 7);

                        if (mth1 !== mth2) {
                            return (mth2 - mth1);
                        } else {
                            let day1 = date1.substring(8, 10);
                            let day2 = date2.substring(8, 10);
                            
                            return (day2 - day1);
                        }
                    }
                });
                break;
            case 'month':
                sortedOrganizingField.sort((date1, date2) => {
                    let yr1 = date1.substring(0, 4);
                    let yr2 = date2.substring(0, 4);
                    if (yr1 !== yr2) {
                        return (yr2 - yr1);                  
                    } else {
                        let mth1 = date1.substring(5, 7);
                        let mth2 = date2.substring(5, 7);
                        return (mth2 - mth1);  
                    }
                });
                break;
            case 'year':
                sortedOrganizingField.sort( (yr1, yr2) => (yr2-yr1) );
                break;
            default:
                sortedOrganizingField.sort();            
        }

        // 2.
        if (organizingCodes.length > 1) {
            // Check Lower Level
            sortedOrganizingField.forEach(key => {
                organizedItms[key] = getOrganizedItmsBy(organizedItms[key].slice(0), organizingCodes.slice(1))
            })
        } else {
            // Sort the deepest level by 'Priority' field
            sortedOrganizingField.forEach(key => {
                organizedItms[key] = organizedItms[key].sort((keyInfo1, keyInfo2) => (
                    todosEntities[keyInfo1.id].priority - todosEntities[keyInfo2.id].priority
                ))
            })
        }

        return {organizedItms, sortedOrganizingField}
    }

    // Render Phase
    const getOrganizedJSX = (organizedItms, lv) => {
        let todosJSX = '';
        if (!(Array.isArray(organizedItms))) {  // Heading Wrapper
            console.log('organizedItms:', organizedItms);
            console.log('organizedItms.sortedOrganizingField:', organizedItms.sortedOrganizingField);
            todosJSX = organizedItms.sortedOrganizingField.map(val => {
                let heading = val;

                
                const HeadingTag = ({ lv, children }) => {
                    console.log('lv:', lv)
                    switch(lv) {
                        case 1:
                            return (<h1>{children}</h1>);
                        case 2:
                            return (<h2>{children}</h2>);
                        case 3:
                            return (<h3>{children}</h3>);
                        case 4:
                            return (<h4>{children}</h4>);
                        case 5:
                        default:
                            return (<h5>{children}</h5>);
                    }
                }
                let lowerLvContent = getOrganizedJSX(organizedItms.organizedItms[val], lv+1);
                
                

                return (
                    <>
                        <HeadingTag lv={lv}>{heading}</HeadingTag>
                        <OrganizedGroup>
                            {lowerLvContent}
                        </OrganizedGroup>
                    </>
                )
            })

        } else {    // Todo List
            todosJSX = organizedItms.map(keyInfo => {
                return (
                    <TodoSubtree
                        itmId={keyInfo.id}
                        onDragTodo={dragTodoHandler}
                        dragGroup={keyInfo.dragGroup}
                        key={keyInfo.id}
                    />
                )
            });
            
        }

        return todosJSX;
    };
    let treeRootKeyInfos = todoIds.filter(id => todosEntities['root'].children.includes(id)).map(id => ({ id, dragGroup: '' }))
    let organizedItms = getOrganizedItmsBy(treeRootKeyInfos, ['day', 'category', ]);
    let todosJSX = getOrganizedJSX(organizedItms, 1);


    return (
        <TodoDemoLayout>
            <div>
                <h1>Todo List</h1>
                <AddTodoForm 
                    parentId={'root'} 
                    formLayout={<AddTodoFormInlineLayout layoutProps={{color: themeColor.default}}/>}
                />
                <Sortable>
                    {todosJSX}
                </Sortable>
            </div>
        </TodoDemoLayout>
    )
}
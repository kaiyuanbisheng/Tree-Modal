import React, { useState, FC, useCallback, useEffect } from 'react'
import { Dropdown, Input, Menu, Modal, Tree } from 'antd'
import { treeData } from '../mock/data'
import { Children, Data, disposalData, getUID } from '../handle'

import '../App.css';

const { TreeNode } = Tree

interface Props {
    visible: boolean;
    setVisible: (bol: boolean) => void
}
const ThreeModal: FC<Props> = ({ visible, setVisible }) => {

    const [data, setData] = useState([])  // 树形数据
    const [len, setLen] = useState<number>(0) // 选项的数据
    const [arr, setArr] = useState<any>([])// 出发onChange 保存树形数据
    const [name, setName] = useState('') // 分组的name
    const [nameList, setNameList] = useState<string[]>([])

    const handleOnCancel = useCallback(
        () => {
            setVisible(false)
        }, [])
    const handleOk = useCallback(
        () => {
            setVisible(false)
        }, [])


    const dataObj = {
        groupName: '',
        key: getUID(),
        children: []
    }
    const add = () => {
        const newData: any = [...data]
        newData.unshift(dataObj)
        setData(newData)
        console.log(newData);
    }

    useEffect(() => {
        console.log(disposalData(treeData), 'treeData');

        setData(disposalData(treeData))
    }, [])
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue: any) => {
        setLen(checkedKeysValue.length)
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };
    const changeValue = (e: any) => {
        const newData: Data[] = JSON.parse(JSON.stringify(data))
        newData[0].groupName = e.target.value
        setName(e.target.value)
        setArr(newData)
    }
    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            const newNameList = [...nameList]
            nameList.push(name)
            console.log(nameList);
            
            setNameList(newNameList)
            setData(arr)
        }


    }
    const renderList = (data: any[]) => {
        console.log(data);

        return data.map((item) => {
            if (!item.children) {
                return <TreeNode key={item.id} title={item.name} />
            } else {
                if (!item.groupName) {
                    return <TreeNode key={item.id} title={<Input onChange={changeValue} onKeyDown={onKeyDown} />} />
                }
                return <TreeNode key={item.id} title={item.groupName} />
            }
        })
    }
    const handleCancel = () => {
        setLen(0)
        setCheckedKeys([])
    }

    
    return (
        <Modal
            title='分组设置'
            visible={visible}
            onCancel={handleOnCancel}
            onOk={handleOk}
            cancelText='取消'
            okText='确定'
        >
            <div className='tree'>
                <div className='toolbar'>
                    <div className='toolbarLeft'>
                        <span>{len}/{data?.length}项</span>
                        {len ? <a onClick={handleCancel}>取消选项</a> : ''}
                    </div>
                    <div className='toolbarRight'>
                        <div>
                            <a>移动至</a>
                           {nameList.map(item=>{
                              return <div>{item}</div>
                           })}
                        </div>
                        <a onClick={add}>+添加分组</a>
                    </div>
                </div>

                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}>
                    {renderList(data)}
                </Tree>
            </div>
        </Modal>
    )
}
export default ThreeModal
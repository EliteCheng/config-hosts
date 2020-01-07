import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Popconfirm, Table, Tooltip} from 'antd'
import {TableCellEditable} from './table-cell-editable'
import {CopyBtn} from './copy-btn'

TablePanel.defaultProps = {
    rowKey: 'id',
    rowSelectable: true,
    maxWidth: 1200,
    bordered: true,
}

TablePanel.propTypes = {
    items: PropTypes.array,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onSelectItem: PropTypes.func
}

export function TablePanel(
    {
        items, rowKey, title,
        bordered, showHeader, size,
        pagination, className, rowSelectable,
        onSelectItem, selectedRowKeys, handleItemChange,
        addItem, deleteItem, onItemCopy
    }) {

    const handleChange = (dataIndex) => {
        return (v, record) => {
            //TODO:判断字段是否合法
            handleItemChange(dataIndex, v, record)
        }
    }
    const getColumns = () => {
        return [
            {
                dataIndex: 'ip', title: 'IP', width: 120,
                render(v, record) {
                    return <TableCellEditable
                        text={v} record={record}
                        onSave={handleChange('ip')}/>
                }
            },
            {
                dataIndex: 'domain', title: '域名', width: 160,
                render(v, record) {
                    return <TableCellEditable
                        text={v} record={record}
                        onSave={handleChange('domain')}/>
                }
            },
            {
                dataIndex: 'description', title: '用于', width: 200,
                render(v, record) {
                    return <TableCellEditable
                        text={v} record={record}
                        onSave={handleChange('description')}/>
                }
            },
            {
                dataIndex: 'op', title: '操作', width: 60, align: 'center',
                render(v, record) {
                    return <React.Fragment>
                        <Popconfirm title={`确认删除该条配置吗？`}
                                    cancelText='否' okText='是'
                                    placement='left'
                                    onConfirm={e => {
                                        e.stopPropagation()
                                        deleteItem(record.id)
                                    }}
                                    onCancel={e => e.stopPropagation()}>
                            <Tooltip title='删除' placement='left'>
                                <Icon type='delete' style={{color: 'orangered'}}
                                      size='large'/>
                            </Tooltip>
                        </Popconfirm>
                        <CopyBtn className='ml-2'
                                 onCopy={() => onItemCopy(record)}/>
                    </React.Fragment>
                }
            }
        ]
    }
    const getRowClassName = (record, index) => {

    }

    return <div className={className}>
        <Button icon='plus' type='primary' onClick={addItem}>新增</Button>
        <Table
            rowSelection={{
                onChange: onSelectItem,
                selectedRowKeys,
            }}
            bordered={bordered}
            showHeader={showHeader}
            size={size || 'middle'}
            loading={items === null}
            rowKey={rowKey}
            title={title}
            columns={getColumns()}
            dataSource={items}
            rowClassName={getRowClassName}
            pagination={pagination || false}
        />
    </div>
}
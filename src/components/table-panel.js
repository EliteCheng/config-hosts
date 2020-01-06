import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import {TableCellEditable} from "./table-cell-editable"

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
        onSelectItem, selectedRowKeys, handleItemChange
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
                dataIndex: 'ip', title: 'IP', align: 'center', width: 120,
                render(v, record) {
                    return <TableCellEditable
                        text={v} record={record}
                        onSave={handleChange('ip')}/>
                }
            },
            {dataIndex: 'domain', title: '域名', align: 'center', width: 160},
            {dataIndex: 'description', title: '用于', align: 'center', width: 200},
        ]
    }
    const getRowClassName = (record, index) => {

    }


    return <div className={className}>
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
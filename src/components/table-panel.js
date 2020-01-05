import React, {useState} from 'react'
import PropTypes from 'prop-types'

TablePanel.defaultProps = {
    rowKey: 'id',
    rowSelectable: true,
    maxWidth: 1200,
}

TablePanel.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onRemove: PropTypes.func,
    onSelectionChanged: PropTypes.func,
}
export function TablePanel(
    {
        bordered, showHeader, size,
        items, rowKey, title,
        pagination,

    }) {
    const getColumns = () => {
        return [

        ]
    }
    const getRowClassName = (record, index) => {
    }
    return <Table
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
}
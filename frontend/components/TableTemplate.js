import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

import React from 'react';

const TableTemplate = ({ attrList, data, selected, order, sortFunc, selectFunc, actionEnabled, actionName, actionFunc }) => {
    return(
    <Table striped bordered condensed hover >
        <thead>
        <tr>
            {attrList.map((attr, i) => (
                <th key={i} onClick={() => sortFunc(attr.name)}>
                    {attr.displayName}
                    {(order.attr === attr.name) ? (
                        (order.asc) ? (
                            <span>
                                &#9650;
                                <span style={{color: 'silver'}}>&#9660;</span>
                            </span>
                        ) : (
                            <span>
                                <span style={{color: 'silver'}}>&#9650;</span>
                                &#9660;
                            </span>
                        )
                    ) : (
                        <span>&#9650;&#9660;</span>
                    )}
                </th>
            ))}
        </tr>
        </thead>
        <tbody>
            {data.map((entry, i) => {
                const style = (i === selected) ? ({
                    backgroundColor: '#428bca',
                    color: 'white'
                }) : {};
                return (
                    <tr key={i} style={style} onClick={() => selectFunc(i)}>
                        {attrList.map((attr, j) => (
                            // DATA NEEDS PREPROCESSING!!
                            <td key={j}>{
                                typeof(entry[attr.name]) === "string"
                                ? entry[attr.name].substring(0, 16)
                                : entry[attr.name]
                            }</td>
                        ))}
                        {
                            actionEnabled ? (
                                <td>
                                    <Button bsSize="xs" bsStyle="danger" onClick={() => actionFunc(i)}>
                                        {actionName}
                                    </Button>
                                </td>
                            ) : null
                        }
                    </tr>
                );
            })}
        </tbody>
    </Table>
    )
;
};

export default TableTemplate;

TableTemplate.propTypes = {
    attrList: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    order: PropTypes.object.isRequired,
    sortFunc: PropTypes.func.isRequired,
    selectFunc: PropTypes.func.isRequired,
    actionEnabled: PropTypes.bool,
    actionName: PropTypes.string,
    actionFunc: PropTypes.func
};
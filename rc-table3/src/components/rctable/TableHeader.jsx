import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

export default class TableHeader extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
  }

  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }

  render() {
    const { prefixCls, rowStyle, rows } = this.props;
    return (
      <thead className={`${prefixCls}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((cellProps, i) => <th {...cellProps} key={i} />)}
            </tr>
          ))
        }
      </thead>
    );
  }
}

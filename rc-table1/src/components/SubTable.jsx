const React = require('react');
const Table = require('rc-table');

const data = [
  {
    a: 'a1',
  },
  {
    a: 'a2',
    b: 'b2',
    children: [
      {
        a: 'a2-1',
        b: 'b2-1',
      },
      {
        a: 'a2-2',
        b: 'b2-2',
      },
    ],
  },
  {
    a: 'a3',
    c: 'c3',
    d: 'd3',
  },
];

const MyTable = React.createClass({
  handleClick(record, e) {
    e.preventDefault();
    console.log(record.a);
  },
  render() {
    const columns = [
      { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
      { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
      { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
      {
        title: 'Operations', dataIndex: '', key: 'x', render: (text, record) => {
          return <a href="#" onClick={e => this.handleClick(record, e)}>click {record.a}</a>;
        },
      },
    ];
    return (
      <div>
        <h2>sub table</h2>
        <Table
          columns={columns}
          expandIconAsCell
          data={data}
          rowKey={record => record.a}
        />
      </div>
    );
  },
});

export default MyTable ;

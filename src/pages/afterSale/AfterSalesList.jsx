import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const AfterSalesList = () => {
  const [afterSales, setAfterSales] = useState([]);

  const rows = afterSales.map((afterSale) => {
    const { _id, target, refTo, site, followUps, createdAt, updatedAt } = afterSale;
    return {
      id: _id,
      exportData: afterSale,
      afterSale: <TruncatableFieldToolTip content={refTo.name} />,
      target: <TruncatableFieldToolTip content={target} />,
      followUps: <TruncatableFieldToolTip content={followUps.length} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    {
      id: 0,
      label: 'After Sales',
      key: 'afterSale',
      dataKey: 'refTo.name'
    },
    { id: 1, label: 'Category', key: 'target', dataKey: 'target' },
    { id: 2, label: 'Follow Ups', key: 'followUps', dataKey: 'followUps', formatForExport: (value) => value.length },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    {
      id: 4,
      label: 'Created Date',
      key: 'createdAt',
      dataKey: 'createdAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 5,
      label: 'Updated Date',
      key: 'updatedAt',
      dataKey: 'updatedAt',
      formatForExport: (value) => formatDateTime(value)
    }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'After Sales'} btn1={true} href1={'/after-sales/add-after-sale'} icon1={<IoMdAdd />} btnLabel1={'Add After Sales'} />
      <TableComponent
        siteModule={'after-sales'}
        selectable={true}
        headers={columnConfig}
        tableData={(data) => setAfterSales(data.afterSales)}
        rows={rows}
        apiUrl={'after-sale'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/after-sales/edit-after-sale'}
        copyPath={'/after-sales/duplicate-after-sale'}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
      />
    </div>
  );
};

export default AfterSalesList;

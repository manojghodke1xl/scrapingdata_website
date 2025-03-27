import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteProductApi } from '../../apis/product-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import TableHeader from '../../atoms/table/TableHeader';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const rows = products.map((product) => {
    const { _id, name, site, type, createdAt, updatedAt } = product;
    return {
      id: _id,
      exportData: product,
      key: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip content={name} />,
      type: <TruncatableFieldToolTip content={type} />,
      site: <TruncatableFieldToolTip content={`${site.name} (${site.host})}`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Key', key: 'key', dataKey: '_id' },
    { id: 1, label: 'Product Name', key: 'name', dataKey: 'name' },
    { id: 2, label: 'Product Type', key: 'type', dataKey: 'type' },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 4, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 5, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/products/edit-product/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Products'} btn1={true} href1={'/products/add-product'} icon1={<IoMdAdd />} btnLabel1={'Add Product'} />
      <TableComponent
        selectable={true}
        siteModule={'products'}
        headers={columnConfig}
        tableData={(data) => setProducts(data.products)}
        rows={rows}
        apiUrl={'products'}
        pagination={true}
        search={true}
        filter={true}
        deleteBtn={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        searchCategory={[{ id: 1, name: 'Name' }]}
        deleteLabel={'Delete Product'}
        deleteMessage={'Are you sure you want to delete this product?'}
        deleteApi={deleteProductApi}
        actionItems={actionItems}
      />
    </div>
  );
};

export default ProductList;

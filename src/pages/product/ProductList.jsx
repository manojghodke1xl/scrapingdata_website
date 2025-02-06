import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteProductApi } from '../../apis/product-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import TableHeader from '../../atoms/table/TableHeader';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const rows = products.map((product) => {
    const { _id, name, site, type, createdAt, updatedAt } = product;
    return {
      id: _id,
      exportData: product,
      key: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip title={'Product Name'} content={name} />,
      type: <TruncatableFieldToolTip title={'Product Type'} content={type} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site.name} (${site.host})}`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });
  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Products'} btn1={true} href1={'/products/add-product'} icon1={<IoMdAdd />} btnLabel1={'Add Product'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'products'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Key', key: 'key' },
                  { label: 'Product Name', key: 'name' },
                  { label: 'Product Type', key: 'type' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setProducts(data.products)}
                rows={rows}
                apiUrl={'products'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/products/edit-product'}
                // copy={true}
                // copyPath={'/coupon/duplicate-coupon'}
                search={true}
                filter={true}
                deleteBtn={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                // statuses={[
                //   { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                //   { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                // ]}
                searchCategory={[{ id: 1, name: 'Name' }]}
                deleteLabel={'Delete Product'}
                deleteMessage={'Are you sure you want to delete this product?'}
                deleteApi={deleteProductApi}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <NoteComponent note={couponListNote} /> */}
    </div>
  );
};

export default ProductList;

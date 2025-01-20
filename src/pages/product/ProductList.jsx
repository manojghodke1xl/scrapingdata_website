import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteProductApi } from '../../apis/product-apis';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const rows = products.map((product) => {
    const { _id, name, stock, price, salePrice, site, createdAt, updatedAt } = product;
    return {
      id: _id,
      exportData: product,
      name: <TruncatableFieldModal title={'Product Name'} content={name} />,
      stock: <TruncatableFieldModal title={'Stock'} content={stock} />,
      price: <TruncatableFieldModal title={'Price'} content={price} />,
      salePrice: <TruncatableFieldModal title={'Sale Price'} content={salePrice} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site.name} (${site.host})}`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });
  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Products</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/products/add-product" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Product</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'products'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Product Name', key: 'name' },
                  { label: 'Stock', key: 'stock' },
                  { label: 'Price', key: 'price' },
                  { label: 'Discount Price', key: 'salePrice' },
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

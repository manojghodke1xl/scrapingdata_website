import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { IoMdAdd } from 'react-icons/io';
import { deleteCouponApi } from '../../apis/coupon';
import NoteComponent from '../../atoms/common/NoteComponent';
import { couponListNote } from './CouponNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const CouponList = () => {
  const { isDarkMode } = useColorContext();
  const [coupons, setCoupons] = useState([]);

  const rows = coupons.map((coupon) => {
    const { _id, code, type, value, minAmount, isActive, sites, createdAt, updatedAt } = coupon;
    return {
      id: _id,
      exportData: coupon,
      code: <TruncatableFieldToolTip content={code ?? ''} />,
      type: <TruncatableFieldToolTip content={type ?? ''} />,
      value: <TruncatableFieldToolTip content={value ?? ''} />,
      minAmount: <TruncatableFieldToolTip content={minAmount ?? ''} />,
      sites: <TruncatableFieldToolTip content={sites?.map((s) => `${s.name} (${s.host})`).join(', ') ?? ''} />,
      status: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success` : `${isDarkMode ? 'border border-inactive' : 'bg-inactive'} text-inactive`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-green ' : 'bg-darkgray'}`} />
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 4, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value?.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 0, label: 'Coupon Code', key: 'code', dataKey: 'code' },
    { id: 1, label: 'Discount Type', key: 'type', dataKey: 'type' },
    { id: 2, label: 'Discount Value', key: 'value', dataKey: 'value' },
    { id: 3, label: 'Minimum purchase Amount', key: 'minAmount', dataKey: 'minAmount' },
    { id: 5, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 6, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) },
    { id: 7, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Coupons'} btn1={true} href1={'/coupon/add-coupon'} icon1={<IoMdAdd />} btnLabel1={'Add Coupon'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'coupon'}
                headers={columnConfig}
                tableData={(data) => setCoupons(data.coupons)}
                rows={rows}
                apiUrl={'coupon'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/coupon/edit-coupon'}
                copyPath={'/coupon/duplicate-coupon'}
                search={true}
                filter={true}
                deleteAction={true}
                deleteBtn={true}
                filterCategory={[
                  { id: 0, name: 'Status' },
                  { id: 1, name: 'Sites' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                deleteLabel={'Delete Coupon'}
                deleteMessage={'Are you sure you want to delete this coupon?'}
                deleteApi={deleteCouponApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={couponListNote} />
    </div>
  );
};

export default CouponList;

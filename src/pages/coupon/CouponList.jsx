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
      code: <TruncatableFieldToolTip title={'Coupon Code'} content={code ?? ''} />,
      type: <TruncatableFieldToolTip title={'Discount Type'} content={type ?? ''} />,
      value: <TruncatableFieldToolTip title={'Discount Value'} content={value ?? ''} />,
      minAmount: <TruncatableFieldToolTip title={'Minimum purchase Amount'} content={minAmount ?? ''} />,
      sites: <TruncatableFieldToolTip title={'Sites'} content={sites?.map((s) => `${s.name} (${s.host})`).join(', ') ?? ''} />,
      status: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-[#027948]' : 'bg-[#ECFDF3]'} text-[#027948]` : `${isDarkMode ? 'border border-[#344054]' : 'bg-[#F2F4F7]'} text-[#344054]`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

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
                headers={[
                  { label: 'Coupon Code', key: 'code' },
                  { label: 'Discount Type', key: 'type' },
                  { label: 'Discount Value', key: 'value' },
                  { label: 'Minimum purchase Amount', key: 'minAmount' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' },
                  { label: 'Status', key: 'status' }
                ]}
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

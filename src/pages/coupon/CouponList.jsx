import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { deleteCouponApi } from '../../apis/coupon';
import NoteComponent from '../../atoms/common/NoteComponent';
import { couponListNote } from './CouponNotes';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  const rows = coupons.map((coupon) => {
    const { _id, code, type, value, minAmount, isActive, createdAt, updatedAt } = coupon;
    return {
      id: _id,
      exportData: coupon,
      code: <TruncatableFieldModal title={'Coupon Code'} content={code} />,
      type: <TruncatableFieldModal title={'Discount Type'} content={type} />,
      value: <TruncatableFieldModal title={'Discount Value'} content={value} />,
      minAmount: <TruncatableFieldModal title={'Minimum purchase Amount'} content={minAmount} />,
      isActive: (
        <div className={`rounded-xl ${isActive ? 'bg-[#ECFDF3] text-[#027948]' : 'bg-[#F2F4F7] text-[#344054]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Coupon List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/coupon/add-coupon" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Coupon</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Coupon Code', key: 'code' },
                  { label: 'Discount Type', key: 'type' },
                  { label: 'Discount Value', key: 'value' },
                  { label: 'Minimum purchase Amount', key: 'minAmount' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setCoupons(data.coupons)}
                rows={rows}
                apiUrl={'coupons'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/coupon/edit-coupon'}
                search={true}
                filter={true}
                deleteBtn={true}
                filterCategory={[{ id: 2, name: 'Status' }]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[{ id: 1, name: 'Code' }]}
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

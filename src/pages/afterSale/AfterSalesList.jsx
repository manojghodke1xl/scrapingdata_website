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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'After Sales'} btn1={true} href1={'/after-sales/add-after-sale'} icon1={<IoMdAdd size={22} />} btnLabel1={'Add After Sales'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                siteModule={'after-sales'}
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'After Sales', key: 'afterSale' },
                  { label: 'Category', key: 'target' },
                  { label: 'Follow Ups', key: 'followUps' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setAfterSales(data.afterSales)}
                rows={rows}
                apiUrl={'after-sale'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/after-sales/edit-after-sale'}
                copy={true}
                copyPath={'/after-sales/duplicate-after-sale'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                searchCategory={[
                  { id: 1, name: 'Name' },
                  { id: 2, name: 'Email' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <NoteComponent note={adminListNote} /> */}
    </div>
  );
};

export default AfterSalesList;

import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import NoteComponent from '../../atoms/common/NoteComponent';
import { projectListNote } from './ProjectCheckerNotes';
import { AiOutlineApi } from 'react-icons/ai';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  solved: 'bg-green-100 text-green-800 border-green-300',
  ignored: 'bg-orange-100 text-orange-800 border-orange-300'
};

const ProjectCheckerList = () => {
  // const navigate = useNavigate();
  const [projectChecks, setProjectChecks] = useState([]);

  const rows = projectChecks.map((projectCheckList) => {
    const { _id, projectId, filePath, fileName, type, message, lineNumber, url, status, checkerName, createdAt } = projectCheckList;

    return {
      id: _id,
      exportData: projectCheckList,
      projectId: <TruncatableFieldToolTip content={projectId} />,
      // site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      filePath: <TruncatableFieldToolTip content={filePath} />,
      fileName: <TruncatableFieldToolTip content={fileName} />,
      type: <TruncatableFieldToolTip content={type} />,
      message: <TruncatableFieldToolTip content={message} />,
      lineNumber: <TruncatableFieldToolTip content={lineNumber} />,
      url: <TruncatableFieldToolTip content={url} />,
      // status: <TruncatableFieldToolTip content={status} />,
      status: (
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${statusColors[status] || 'bg-gray-200 text-gray-700 border-gray-300'}`}>{status[0].toUpperCase() + status.slice(1)}</span>
      ),
      checkerName: <TruncatableFieldToolTip content={checkerName} />,
      createdAt: formatDateTime(createdAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Project', key: 'projectId', dataKey: 'projectId' },
    { id: 1, label: 'File Path', key: 'filePath', dataKey: 'filePath' },
    { id: 2, label: 'File Name', key: 'fileName', dataKey: 'fileName' },
    { id: 3, label: 'Type', key: 'type', dataKey: 'type' },
    { id: 4, label: 'Message', key: 'message', dataKey: 'message' },
    { id: 5, label: 'Line Number', key: 'lineNumber', dataKey: 'lineNumber' },
    // { id: 5, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 6, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 7, label: 'Status', key: 'status', dataKey: 'status' },
    { id: 8, label: 'Checked By', key: 'checkerName', dataKey: 'checkerName' },
    { id: 13, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading="Project Checker List"
        btn1={true}
        href1={'/projectChecker/project-checker-doc'}
        icon1={<AiOutlineApi />}
        btnLabel1={'Usage Guide'}
      />
      <TableComponent
        selectable={true}
        siteModule={'project-checker'}
        headers={columnConfig}
        tableData={(data) => setProjectChecks(data.issues)}
        exportData={projectChecks}
        rows={rows}
        apiUrl={'project-checker'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Project' }]}
        searchCategory={[
          { id: 0, name: 'Project' },
        ]}
      />
      <NoteComponent note={projectListNote} />
    </div>
  );
};

export default ProjectCheckerList;

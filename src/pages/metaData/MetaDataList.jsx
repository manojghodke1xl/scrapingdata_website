import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import TableHeader from '../../atoms/table/TableHeader';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import { deleteMetaDataApi } from '../../apis/metadata-apis';
import { getAllSitesApi } from '../../apis/site-apis';
import { getAllMetaDataApi } from '../../apis/metadata-apis';

const MetaDataList = () => {
  const navigate = useNavigate();
  const [metaDataList, setMetaDataList] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    fetchSites();
    fetchMetaData();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await getAllSitesApi();
      setSiteList(res.data.sites);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMetaData = async () => {
    try {
      const res = await getAllMetaDataApi();
      const groupedData = res?.data?.metaTags || [];

      const flatData = groupedData.flatMap((group) =>
        (group.metaTags || []).map((tag) => ({
          ...tag,
          project_name: group.projectName
        }))
      );

      setMetaDataList(flatData);
    } catch (err) {
      console.error('Error fetching meta data:', err);
    }
  };

  const filteredData = selectedProject ? metaDataList.filter((meta) => meta.project_name === selectedProject) : metaDataList;

  // Group by project_name
  const groupedRows = {};
  filteredData.forEach((meta) => {
    if (!groupedRows[meta.project_name]) {
      groupedRows[meta.project_name] = [];
    }
    groupedRows[meta.project_name].push(meta);
  });

  const rows = Object.values(groupedRows).flatMap((projectGroup) =>
    projectGroup.map((meta, index) => ({
      id: meta._id,
      exportData: meta,
      key: index === 0 ? <TruncatableCopyFeild content={meta._id} /> : '', // Show key only for the first row
      project_name: index === 0 ? <TruncatableFieldToolTip content={meta.project_name} /> : '',
      page: <TruncatableFieldToolTip content={meta.page} />,
      title: <TruncatableFieldToolTip content={meta.meta_title} />,
      meta_description: <TruncatableFieldToolTip content={meta.meta_description} />,
      keywords: <TruncatableFieldToolTip content={meta.keywords} />,
      og_title: <TruncatableFieldToolTip content={meta.og_title} />,
      og_description: <TruncatableFieldToolTip content={meta.og_description} />,
      og_image: <TruncatableFieldToolTip content={meta.og_image} />,
      twitter_title: <TruncatableFieldToolTip content={meta.twitter_title} />,
      twitter_description: <TruncatableFieldToolTip content={meta.twitter_description} />,
      twitter_image: <TruncatableFieldToolTip content={meta.twitter_image} />,
      robots: <TruncatableFieldToolTip content={meta.robots} />,
      createdAt: formatDateTime(meta.createdAt),
      updatedAt: formatDateTime(meta.updatedAt)
    }))
  );

  // const handleGeneratePHP = () => {
  //   const selectedMetaData = metaDataList.filter((item) => selectedRowIds.includes(item._id));
  //   if (selectedMetaData.length === 0) {
  //     alert('No rows selected to generate PHP!');
  //     return;
  //   }

  //   const cleanList = selectedMetaData.map(({ _id, createdAt, updatedAt, ...rest }) => rest);
  //   const phpArray = cleanList
  //     .map((item) => {
  //       const page = item.page;
  //       const fields = Object.entries(item)
  //         .filter(([key]) => key !== 'page')
  //         .map(([key, value]) => {
  //           const val = typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value;
  //           return `\t\t\t'${key}' => ${val}`;
  //         })
  //         .join(',\n');

  //       return `\t'${page}' => [\n${fields}\n\t]`;
  //     })
  //     .join(',\n\n');

  //   const phpContent = `<?php\n\n$all_meta_data = [\n${phpArray}\n];\n\n?>`;

  //   const blob = new Blob([phpContent], { type: 'application/x-php' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = `${selectedProject || 'selected-meta'}_metaData.php`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  const handleGenerateExport = (format) => {
    const selectedMetaData = metaDataList.filter((item) => selectedRowIds.includes(item._id));
    if (selectedMetaData.length === 0) {
      alert('No rows selected to generate file!');
      return;
    }

    const cleanList = selectedMetaData.map(({ _id, createdAt, updatedAt, ...rest }) => rest);

    if (format === 'php') {
      const phpArray = cleanList
        .map((item) => {
          const page = item.page;
          const fields = Object.entries(item)
            .filter(([key]) => key !== 'page')
            .map(([key, value]) => {
              const val = typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : value;
              return `\t\t\t'${key}' => ${val}`;
            })
            .join(',\n');

          return `\t'${page}' => [\n${fields}\n\t]`;
        })
        .join(',\n\n');

      const phpContent = `<?php\n\n$all_meta_data = [\n${phpArray}\n];\n\n?>`;

      downloadFile(phpContent, `${selectedProject || 'selected-meta'}_metaData.php`, 'application/x-php');
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(cleanList, null, 2);
      downloadFile(jsonContent, `${selectedProject || 'selected-meta'}_metaData.json`, 'application/json');
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const columnConfig = [
    { id: 0, label: 'Key', key: 'key', dataKey: '_id' },
    { id: 1, label: 'Website Name', key: 'project_name', dataKey: 'project_name' },
    { id: 2, label: 'Page', key: 'page', dataKey: 'page' },
    { id: 3, label: 'Meta Title', key: 'title', dataKey: 'meta_title' },
    { id: 4, label: 'Meta Description', key: 'meta_description', dataKey: 'meta_description' },
    { id: 5, label: 'Keywords', key: 'keywords', dataKey: 'keywords' },
    { id: 6, label: 'OG Title', key: 'og_title', dataKey: 'og_title' },
    { id: 7, label: 'OG Description', key: 'og_description', dataKey: 'og_description' },
    { id: 8, label: 'OG Image', key: 'og_image', dataKey: 'og_image' },
    { id: 9, label: 'Twitter Title', key: 'twitter_title', dataKey: 'twitter_title' },
    { id: 10, label: 'Twitter Description', key: 'twitter_description', dataKey: 'twitter_description' },
    { id: 11, label: 'Twitter Image', key: 'twitter_image', dataKey: 'twitter_image' },
    { id: 12, label: 'Robots', key: 'robots', dataKey: 'robots' },
    { id: 13, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: formatDateTime },
    { id: 14, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: formatDateTime }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/metadata/edit-metadata/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <div className="flex items-center justify-between">
        <TableHeader heading="Meta Tags" btn1={true} href1="/metadata/add-metadata" icon1={<IoMdAdd />} btnLabel1="Add Meta Tag" btnClass="text-sm py-1 px-3" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="font-medium">Sites:</label>
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} className="border rounded px-3 py-1">
              <option value="">All</option>

              {Array.isArray(siteList) &&
                siteList.map((site, index) => (
                  <option key={site?.name || index} value={site?.name || ''}>
                    {site?.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleGenerateExport('php')}
              className="flex gap-1 h-fit w-[200px] items-center px-2 rounded-xl py-2 bg-primary hover:bg-primary-hover text-white"
            >
              <IoMdAdd className="h-5 w-5" />
              Export as PHP
            </button>

            <button onClick={() => handleGenerateExport('json')} className="flex gap-1 h-fit w-[200px] items-center px-2 rounded-xl py-2 bg-green hover:bg-green-700 text-white">
              <IoMdAdd className="h-5 w-5" />
              Export as JSON
            </button>
          </div>
        </div>
      </div>

      <TableComponent
        selectable={true}
        onSelectionChange={(ids) => setSelectedRowIds(ids)}
        siteModule={'all-metadata'}
        headers={columnConfig}
        rows={rows}
        apiUrl={''}
        pagination={true}
        search={true}
        filter={true}
        deleteBtn={true}
        filterCategory={[
          { id: 0, name: 'Page' },
          { id: 1, name: 'Project Name' }
        ]}
        searchCategory={[
          { id: 1, name: 'Meta Title' },
          { id: 2, name: 'Project Name' }
        ]}
        deleteLabel={'Delete Meta Tag'}
        deleteMessage={'Are you sure you want to delete this meta tag?'}
        deleteApi={deleteMetaDataApi}
        actionItems={actionItems}
      />
    </div>
  );
};

export default MetaDataList;

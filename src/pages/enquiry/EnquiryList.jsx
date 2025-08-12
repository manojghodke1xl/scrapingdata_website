import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import NoteComponent from '../../atoms/common/NoteComponent';
import { enquiryListNote } from './EnquiryNotes';
import { AiOutlineApi } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { deleteEnquiryApi } from '../../apis/leads/enquiry-apis';

const EnquiryList = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);

  const rows = enquiries.map((enquiry) => {
    const {
      _id,
      name,
      email,
      service,
      subject,
      createdAt,
      updatedAt,
      site,
      url,
      campaign,
      medium,
      source,
      content,
      term,
      campaignId,
      mobile,
      ccode,
      application_url,
      position_applying_for,
      linkedin,
      comments,
      enquiryType,
      preferredConsultation,
      organisation,
      interviewPurpose
    } = enquiry;

    return {
      id: _id,
      exportData: enquiry,
      name: <TruncatableFieldToolTip content={name} />,
      number: <TruncatableFieldToolTip content={`${ccode ?? ''} ${mobile}`} />,
      email: <TruncatableFieldToolTip content={email} />,
      service: <TruncatableFieldToolTip content={service} />,
      subject: <TruncatableFieldToolTip content={subject} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      url: <TruncatableFieldToolTip content={url} />,
      campaign: <TruncatableFieldToolTip content={campaign} />,
      medium: <TruncatableFieldToolTip content={medium} />,
      source: <TruncatableFieldToolTip content={source} />,
      content: <TruncatableFieldToolTip content={content} />,
      term: <TruncatableFieldToolTip content={term} />,
      campaignId: <TruncatableFieldToolTip content={campaignId} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),
      enquiryType: <TruncatableFieldToolTip content={enquiryType} />,
      organisation: <TruncatableFieldToolTip content={organisation} />,
      interviewPurpose: <TruncatableFieldToolTip content={interviewPurpose} />,
      preferredConsultation: <TruncatableFieldToolTip content={preferredConsultation} />,
      application_resume: application_url?.resume ? (
        <a href={application_url.resume} download target="_blank" rel="noopener noreferrer">
          <button className="btn btn-sm btn-outline-primary flex items-center space-x-1">
            <BsDownload size={16} />
            <span>Resume</span>
          </button>
        </a>
      ) : null,

      application_cover_letter: application_url?.cover_letter ? (
        <a href={application_url.cover_letter} download target="_blank" rel="noopener noreferrer">
          <button className="btn btn-sm btn-outline-primary flex items-center space-x-1">
            <BsDownload size={16} />
            <span>Cover Letter</span>
          </button>
        </a>
      ) : null,

      application_portfolio: application_url?.portfolio ? (
        <a href={application_url.portfolio} download target="_blank" rel="noopener noreferrer">
          <button className="btn btn-sm btn-outline-primary flex items-center space-x-1">
            <BsDownload size={16} />
            <span>Portfolio</span>
          </button>
        </a>
      ) : null,
      position_applying_for: <TruncatableFieldToolTip content={position_applying_for} />,
      linkedin: linkedin ? (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1">
          <FaLinkedin size={16} className="text-blue-600" />
          <TruncatableFieldToolTip content={linkedin} />
        </a>
      ) : null,
      comments: <TruncatableFieldToolTip content={comments} />
    };
  });

  const columnConfig = [
    { id: 0, label: 'Customer Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
    { id: 2, label: 'Service', key: 'service', dataKey: 'service' },
    { id: 3, label: 'Contact Number', key: 'number', dataKey: 'number' },
    { id: 4, label: 'Subject', key: 'subject', dataKey: 'subject' },
    { id: 5, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 6, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 7, label: 'Campaign Name', key: 'campaign', dataKey: 'campaign' },
    { id: 8, label: 'Medium', key: 'medium', dataKey: 'medium' },
    { id: 9, label: 'Source', key: 'source', dataKey: 'source' },
    { id: 10, label: 'Content', key: 'content', dataKey: 'content' },
    { id: 11, label: 'Term', key: 'term', dataKey: 'term' },
    { id: 12, label: 'Campaign ID', key: 'campaignId', dataKey: 'campaignId' },
    { id: 13, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 14, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) },

    { id: 15, label: 'Enquiry Type', key: 'enquiryType', dataKey: 'enquiryType' },
    
    { id: 16, label: 'Organisation', key: 'organisation', dataKey: 'organisation' },
    { id: 17, label: 'Interview Purpose', key: 'interviewPurpose', dataKey: 'interviewPurpose' },
    
    { id: 18, label: 'Preferred Consultation', key: 'preferredConsultation', dataKey: 'preferredConsultation' },
    { id: 19, label: 'Resume URL', key: 'application_resume', dataKey: 'application_resume' },
    { id: 20, label: 'Cover Letter URL', key: 'application_cover_letter', dataKey: 'application_cover_letter' },
    { id: 21, label: 'Portfolio URL', key: 'application_portfolio', dataKey: 'application_portfolio' },
    { id: 22, label: 'Position Applying For', key: 'position_applying_for', dataKey: 'position_applying_for' },
    { id: 23, label: 'LinkedIn', key: 'linkedin', dataKey: 'linkedin' },
    { id: 24, label: 'Comments', key: 'comments', dataKey: 'comments' }
  ];

  const actionItems = [
    { id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/enquiry/view-enquiry/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading="Enquiry"
        btn2={true}
        btn1={true}
        href1={'/enquiry/enquiry-integration'}
        href2={'/enquiry/add-enquiry'}
        icon1={<AiOutlineApi />}
        icon2={<IoMdAdd />}
        btnLabel1={'API Integration'}
        btnLabel2={'Add Enquiry'}
      />
      <TableComponent
        selectable={true}
        siteModule={'enquiry'}
        headers={columnConfig}
        tableData={(data) => setEnquiries(data.enquiries)}
        exportData={enquiries}
        rows={rows}
        apiUrl={'enquiry'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Email' }
        ]}
        deleteBtn={true}
        deleteLabel="Delete Enquiry"
        deleteMessage="Are you sure you want to delete this enquiry?"
        deleteApi={deleteEnquiryApi}
        actionItems={actionItems}
      />
      <NoteComponent note={enquiryListNote} />
    </div>
  );
};

export default EnquiryList;

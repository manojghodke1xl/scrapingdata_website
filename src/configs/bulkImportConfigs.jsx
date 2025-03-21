import { bulkUploadParticipantsApi } from '../apis/participant-apis';
import { bulkUploadContactsApi } from '../apis/contact-apis';

const field = (data) => (
  <div className={`rounded-xl border border-failed text-failed px-2 py-1 w-fit flex gap-2 items-center`}>
    <span>{data}</span>
  </div>
);

export const participantImportConfig = {
  title: 'Participants',
  templateFields: {
    packageId: 'Package ID',
    Currency: 'INR',
    Name: 'john doe',
    Email: 'john.doe@example.com',
    CountryCode: '91',
    MobileNumber: '1234567890',
    attendees: '1'
  },
  importApi: async (data) => {
    const payload = data.map((participant) => ({
      packageId: participant.packageId,
      currency: participant.Currency,
      userDetails: {
        name: participant.Name,
        email: participant.Email,
        phoneCode: participant.CountryCode,
        phoneNumber: participant.MobileNumber,
        attendee: participant.attendees
      }
    }));

    return await bulkUploadParticipantsApi(payload);
  },
  validateData: (data) => {
    const valid = [];
    const errors = [];

    data.forEach((item, index) => {
      const errorMessages = {};

      if (!item.packageId) errorMessages.packageId = field('Package ID is required.');
      else if (item.packageId.length !== 24) errorMessages.packageId = field('Invalid Package ID.');

      if (!item.Currency) errorMessages.Currency = field('Currency is required.');
      else if (!['INR', 'USD', 'AED'].includes(item.Currency)) errorMessages.Currency = field('Invalid Currency.');

      if (!item.Name) errorMessages.Name = field('Name is required.');

      if (!item.Email) errorMessages.Email = field('Email is required.');
      else if (!/\S+@\S+\.\S+/.test(item.Email)) errorMessages.Email = field('Invalid Email.');

      if (!item.CountryCode) errorMessages.CountryCode = field('Country Code is required.');

      if (!item.MobileNumber) errorMessages.MobileNumber = field('Contact Number is required.');

      if (Object.keys(errorMessages).length > 0) errors.push({ ...item, ...errorMessages, index });
      else valid.push(item);
    });

    return { valid, errors };
  },
  rows: (data) => {
    return data.map((item, index) => {
      const {
        packageId,
        currency,
        error,
        userDetails: { name, email, phoneCode, phoneNumber, attendee }
      } = item;
      return {
        id: index,
        packageId,
        currency,
        name,
        email,
        phoneCode,
        phoneNumber,
        attendee,
        error: field(error) || '-'
      };
    });
  },
  getResponseHeaders: (data) => {
    if (!data || data.length === 0) return [];
    return [
      { label: 'Package', key: 'packageId' },
      { label: 'Currency', key: 'currency' },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Country Code', key: 'phoneCode' },
      { label: 'Contact Number', key: 'phoneNumber' },
      { label: 'Attendees', key: 'attendee' },
      { label: 'Errors', key: 'error' }
    ];
  },
  redirectPath: '/participants/participant-list'
};

export const contactImportConfig = {
  title: 'Contacts',
  templateFields: {
    name: 'john doe',
    email: 'L9X0P@example.com',
    phone: '1234567890',
    phoneCode: '91',
    sites: 'site1,site2'
  },
  importApi: async (data) => {
    const payload = data.map((contact) => ({
      name: contact.name,
      email: contact.email,
      phoneCode: contact.phoneCode,
      phone: contact.phone,
      sites: contact.sites
    }));
    return await bulkUploadContactsApi(payload);
  },
  validateData: (data) => {
    const valid = [];
    const errors = [];

    data.forEach((item, index) => {
      const errorMessages = {};
      if (!item.email) errorMessages.email = field('Email is required.');
      else if (!/\S+@\S+\.\S+/.test(item.email)) errorMessages.email = field('Invalid Email.');

      const siteArray = item.sites
        .split(',')
        .map((site) => site.trim())
        .filter(Boolean);
      if (siteArray.length === 0) errorMessages.sites = field('At least one site must be provided.');

      if (Object.keys(errorMessages).length > 0) errors.push({ ...item, ...errorMessages, index });
      else valid.push({ ...item, sites: siteArray });
    });

    return { valid, errors };
  },
  rows: (data) => {
    return data.map((item, index) => {
      const { name, email, phoneCode, phone, sites, error } = item;
      return {
        id: index,
        name,
        email,
        phoneCode,
        phone,
        sites: Array.isArray(sites) ? sites.join(', ') : sites,
        error: field(error) || '-'
      };
    });
  },
  getResponseHeaders: (data) => {
    if (!data || data.length === 0) return [];
    return [
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Country Code', key: 'phoneCode' },
      { label: 'Contact Number', key: 'phone' },
      { label: 'Sites', key: 'sites' },
      { label: 'Errors', key: 'error' }
    ];
  },
  redirectPath: '/contact/contact-list'
};

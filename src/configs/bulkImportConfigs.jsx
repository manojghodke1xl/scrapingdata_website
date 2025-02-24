import { bulkUploadParticipantsApi } from '../apis/participant-apis';

const field = (data) => (
  <div className={`rounded-xl border border-failed text-failed px-2 py-1 w-fit flex gap-2 items-center`}>
    <span>{data}</span>
  </div>
);

export const participantImportConfig = {
  title: 'Participants',
  templateFields: {
    packageId: '',
    Currency: '',
    Name: '',
    Email: '',
    CountryCode: '',
    MobileNumber: '',
    attendees: ''
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

      if (!item.MobileNumber) errorMessages.MobileNumber = field('Mobile Number is required.');

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
      { label: 'Sr. No.', key: 'srno' },
      { label: 'Package', key: 'packageId' },
      { label: 'Currency', key: 'currency' },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Country Code', key: 'phoneCode' },
      { label: 'Mobile Number', key: 'phoneNumber' },
      { label: 'Attendees', key: 'attendee' },
      { label: 'Errors', key: 'error' }
    ];
  },
  redirectPath: '/participants/participant-list'
};

// Add other import configurations as needed
export const eventImportConfig = {
  title: 'Events',
  templateFields: {
    // Add event template fields
  }
  // Add other config options
};

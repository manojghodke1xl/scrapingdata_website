/**
 * This file contains configurations for importing participants and contacts in bulk.
 * 
 * Each configuration object contains the following properties:
 * - title: The title of the import type.
 * - templateFields: An object containing the fields that should be present in the import template.
 * - importApi: A function that takes the validated data and makes a POST request to the API to import the data.
 * - validateData: A function that takes the data and returns an object with two properties: valid and errors.
 *                  valid is an array of objects that are valid, and errors is an array of objects that contain errors.
 * - rows: A function that takes the data and returns an array of objects that can be used to render the import results table.
 * - getResponseHeaders: A function that takes the data and returns an array of objects that can be used to render the import results table headers.
 * - redirectPath: The path to redirect the user to after the import is complete.
 * 
 * The functions `bulkUploadParticipantsApi` and `bulkUploadContactsApi` are imported from the `participant-apis` and `contact-apis` files respectively.
 * 
 * The `field` function is a helper function that takes a string and returns a React component that renders a red text with the given string.
 */

import { bulkUploadParticipantsApi } from '../apis/participant-apis';
import { bulkUploadContactsApi } from '../apis/contact-apis';

/**
 * A helper function to create a React component that renders a red text with the given string.
 * 
 * @param {string} data The string to render.
 * @returns {React.ReactElement} A React component that renders a red text with the given string.
 */
const field = (data) => (
  <div className={`rounded-xl border border-failed text-failed px-2 py-1 w-fit flex gap-2 items-center`}>
    <span>{data}</span>
  </div>
);

/**
 * Configuration for importing participants in bulk.
 */
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
  /**
   * A function that takes the validated data and makes a POST request to the API to import the participants.
   * 
   * @param {Array<Object>} data The validated data to import.
   * @returns {Promise<Object>} A promise that resolves to the response from the API.
   */
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
  /**
   * A function that takes the data and returns an object with two properties: valid and errors.
   * 
   * @param {Array<Object>} data The data to validate.
   * @returns {Object} An object with two properties: valid and errors. valid is an array of objects that are valid, and errors is an array of objects that contain errors.
   */
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
  /**
   * A function that takes the data and returns an array of objects that can be used to render the import results table.
   * 
   * @param {Array<Object>} data The data to render.
   * @returns {Array<Object>} An array of objects that can be used to render the import results table.
   */
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
  /**
   * A function that takes the data and returns an array of objects that can be used to render the import results table headers.
   * 
   * @param {Array<Object>} data The data to render.
   * @returns {Array<Object>} An array of objects that can be used to render the import results table headers.
   */
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
  /**
   * The path to redirect the user to after the import is complete.
   */
  redirectPath: '/participants/participant-list'
};

/**
 * Configuration for importing contacts in bulk.
 */
export const contactImportConfig = {
  title: 'Contacts',
  templateFields: {
    name: 'john doe',
    email: 'L9X0P@example.com',
    phone: '1234567890',
    phoneCode: '91',
    sites: 'site1,site2'
  },
  /**
   * A function that takes the validated data and makes a POST request to the API to import the contacts.
   * 
   * @param {Array<Object>} data The validated data to import.
   * @returns {Promise<Object>} A promise that resolves to the response from the API.
   */
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
  /**
   * A function that takes the data and returns an object with two properties: valid and errors.
   * 
   * @param {Array<Object>} data The data to validate.
   * @returns {Object} An object with two properties: valid and errors. valid is an array of objects that are valid, and errors is an array of objects that contain errors.
   */
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
  /**
   * A function that takes the data and returns an array of objects that can be used to render the import results table.
   * 
   * @param {Array<Object>} data The data to render.
   * @returns {Array<Object>} An array of objects that can be used to render the import results table.
   */
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

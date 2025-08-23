import { getMethodCall } from "./api-handler";

// export const getContactUsApi = async () => {
//   return await getMethodCall(`${import.meta.env.VITE_API_URL}/contact`);
// };

// export const getBayutProperty = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         status: true,
//         data: {
//           enquiry: [
//             {
//               _id: '68a81646afe962cceaad9ed3',
//               propertyId: '11662147',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:34.609Z',
//               propertyNumericId: 11662147,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:34:30.540Z',
//               url: 'https://www.bayut.com/property/details-11662147.html',
//               scrapedData: {
//                 agent: 'Kairatbek Myrzabekov',
//                 amenities: {
//                   Building: ['Balcony or Terrace', 'Lobby in Building'],
//                   'Business and Security': ['Security Staff'],
//                   Features: ['Parking Spaces', 'Centrally Air-Conditioned'],
//                   'Health and Fitness': ['Gym or Health Club', 'Swimming Pool']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: false,
//                 price: 6299900,
//                 priceCurrency: 'AED',
//                 priceText: '6,299,900',
//                 propertyId: '11662147',
//                 propertyInformation: {
//                   'Added on': '15 August 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Furnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - eva-13890178',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - eva-13890178\nChecked\nFloor plans\nMap\n14\nAED\n6,299,900\nSave\nShare\nEst. Payment \nAED 25.1K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n1,716 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nHigh Floor | Fully Furnished | Fountain Facing\nEVA Real Estate LLC is proud to present this Fully furnished two bedrooms apartment in the Burj Khalifa. \n\n\nProperty Details:\n\n- 2 Bedrooms\n- 3 Bathrooms\n- Size: 1716 sq. ft. \n- 2 Allocated Parking Spaces\n- Fully Furnished\n- High Floor\n- Well Maintained\n- Equipped Kitchen\n- Smart Kitchen Appliances\n\n\nConnectivity:\n\n• 23 minutes to Dubai Marina\n• 23 minutes to Palm Jumeriah\n• 6 minutes to Dubai Mall\n• 15 minutes to Dubai Airport\n\n\nThe tower also features lounges, health, and wellness facilities, four pools, and two observation decks. Aside from a stunning view of the city of Dubai, the Observation Decks of Burj Khalifa also offers a unique aerial view of The Dubai Fountain. The performance soundtrack is played at the top for an immersive experience. \n\n\nAbout Burj Khalifa:\n\nThe Burj Khalifa is the tallest building in the world and a global icon. With its spectacular views of the world-famous Dubai Fountains among others, the architecture is a true engineering marvel that represents the conceptual heart of Dubai.\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - eva-13890178\nCompletion\nReady\nFurnishing\nFurnished\nAverage Rent\nAED\n356,104\nYearly\nAdded on\n15 August 2025\nValidated Information\nDeveloper\nEMAAR PROPERTIES (P.J.S.C)\nOwnership\nFreehold\nBuilt-up Area\n1,716 sqft\nUsage\nResidential\nParking Availability\nYes\nFloor Plans\n3D LIVE\n3D IMAGE\n2D IMAGE\nBuilding Information\nBuilding Name\nBurj Khalifa\nYear of Completion\n2009\nTotal Floors\n170\nRetail Centres\n1\nTotal Building Area\n5,577,803 sqft\nFeatures /',
//                 regulatoryInformation: {
//                   BRN: '56039',
//                   DED: '931105',
//                   'Permit Number': '7121577500',
//                   RERA: '25800',
//                   'Registered Agency': 'EVA REAL ESTATE L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'High Floor | Fully Furnished | Fountain Facing',
//                 url: 'https://www.bayut.com/property/details-11662147.html',
//                 validatedInformation: {
//                   'Built-up Area': '1,716 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:34:30.539Z'
//             },
//             {
//               _id: '68a81646afe962cceaad9ed2',
//               propertyId: '11694131',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:34.609Z',
//               propertyNumericId: 11694131,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:34:16.030Z',
//               url: 'https://www.bayut.com/property/details-11694131.html',
//               scrapedData: {
//                 agent: 'Konstantin Seleznov',
//                 amenities: {
//                   Building: ['Reception/Waiting Room', 'Flooring'],
//                   'Business and Security': ['Business Center', 'Security Staff', 'CCTV Security'],
//                   'Cleaning and Maintenance': ['Waste Disposal'],
//                   Features: ['Parking Spaces: 2', 'Centrally Air-Conditioned', 'Double Glazed Windows'],
//                   'Health and Fitness': ['Gym or Health Club', 'Swimming Pool'],
//                   'Laundry and Kitchen': ['Laundry Room'],
//                   Miscellaneous: ['24 Hours Concierge', 'View', 'Freehold'],
//                   'Recreation and Family': ['Cafeteria or Canteen'],
//                   Technology: ['Broadband Internet', 'Intercom']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: false,
//                 price: 5200000,
//                 priceCurrency: 'AED',
//                 priceText: '5,200,000',
//                 propertyId: '11694131',
//                 propertyInformation: {
//                   'Added on': '19 May 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - 10748-9epDeI',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   "EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - 10748-9epDeI\nChecked\nFloor plans\nMap\n19\nAED\n5,200,000\nSave\nShare\nEst. Payment \nAED 20.7K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n1,888 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nFountain and Opera View | Type D | Rented\nInvest in the Iconic Burj Khalifa | 2BR Apartment with Opera and Fountain View\n\nAre you looking to invest in a property within the world’s tallest building, surrounded by 5-star facilities and world-class attractions? This is your opportunity to own a luxury residence in the Burj Khalifa, a true global landmark. \n\nProperty Details:\n\nTower: Burj Khalifa\n\nType: D\n\nBedrooms: 2\n\nBathrooms: 3\n\nAdditional Room: Laundry Room\n\nKitchen: Fully Equipped\n\nView: Dubai Opera + Partial Fountain View\n\nParking: 2 Basement Parking Spaces\n\nTenancy: Rented (Perfect for Investors)\n\nFacilities: Full 5-star amenities\n\nAbout Burj Khalifa:\nBurj Khalifa is not just the tallest building in the world — it's a symbol of luxury and innovation in the heart of Downtown Dubai. This architectural marvel is a magnet for tourists and investors alike, and it's located among a network of elite venues including:\n\nThe Dubai Opera\n\nThe Dubai Mall (world’s largest shopping destination)\n\nThe Old Town, with its charming Arabian architecture, open-air cafes, and fine dining options\n\nLive or invest in a prestigious urban development that combines luxury, lifestyle, and global appeal. \n\nContact us today to schedule a viewing or for more investment details.\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - 10748-9epDeI\nCompletion\nReady\nFurnishing\nUnfurnished\nAverage Rent\nAED\n391,797\nYearly\nAdded on\n19 May 2025\nFloor Plans\n3D LIVE\n3D IMAGE\n2D IMAGE\nBuilding Information\nBuilding Name\nBurj Khalifa\nYear of Completion\n2009\nTotal Floors\n170\nRetail Cen",
//                 regulatoryInformation: {
//                   BRN: '29197',
//                   DED: '972215',
//                   'Permit Number': '7121542500',
//                   RERA: '27543',
//                   'Registered Agency': 'C AND B REAL ESTATE BROKER',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Fountain and Opera View | Type D | Rented',
//                 url: 'https://www.bayut.com/property/details-11694131.html',
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:34:16.030Z'
//             },
//             {
//               _id: '68a81646afe962cceaad9ed1',
//               propertyId: '11817747',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:34.609Z',
//               propertyNumericId: 11817747,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:34:01.263Z',
//               url: 'https://www.bayut.com/property/details-11817747.html',
//               scrapedData: {
//                 agent: 'Asad Ullah Khan',
//                 amenities: {
//                   Building: ['Lobby in Building'],
//                   'Business and Security': ['Security Staff', 'CCTV Security'],
//                   'Health and Fitness': ['Gym or Health Club', 'Swimming Pool', 'Jacuzzi', 'Sauna', 'Steam Room'],
//                   'Laundry and Kitchen': ['Shared Kitchen'],
//                   Miscellaneous: ['Freehold'],
//                   'Recreation and Family': ['Kids Play Area', 'Lawn or Garden']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 3400000,
//                 priceCurrency: 'AED',
//                 priceText: '3,400,000',
//                 propertyId: '11817747',
//                 propertyInformation: {
//                   'Added on': '1 June 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - 9070-oFVAlW',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   "EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - 9070-oFVAlW\nChecked\nFloor plans\nMap\n24\nAED\n3,400,000\nSave\nShare\nEst. Payment \nAED 15.5K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n1 Bed\n2 Baths\n1,102 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nMULTIPLE OPTIONS | FOUNTAIN VIEWS | BEST DEAL\nDiscover an exceptional 1-bedroom apartment for sale in the heart of Downtown Dubai, offering an incredible opportunity to own a property in one of Dubai's most sought-after locations. Priced at 3,400,000 AED, this spacious 1,102 sq ft unfurnished apartment by EMAAR features 2 bathrooms and an array of premium amenities. Enjoy stunning views, a balcony, central AC, covered parking, and access to shared facilities including a pool, spa, and children's play area. Located in the vibrant Burj Khalifa area, this property provides unparalleled access to Dubai Mall, Dubai Fountain, and numerous dining options. With convenient proximity to the Burj Khalifa/Dubai Mall Metro Station, residents can easily explore the city. Nearby restaurants like Spice Bowl and Din Tai Fung, along with schools such as Citizens School, make this an ideal home for professionals and families seeking a dynamic urban lifestyle. Don't miss this chance to own a piece of Dubai's most exciting neighborhood!\n\nSELLING : 3.4M (RENTED UNIT )\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - 9070-oFVAlW\nCompletion\nReady\nFurnishing\nUnfurnished\nAverage Rent\nAED\n198,657\nYearly\nAdded on\n1 June 2025\nValidated Information\nDeveloper\nEMAAR PROPERTIES (P.J.S.C)\nOwnership\nFreehold\nBuilt-up Area\n1,103 sqft\nUsage\nResidential\nParking Availability\nYes\nFloor Plans\nExplore the floor plans in Burj Khalifa that match this listing\n3D Live\nType R 1406 SQF\n1 bed, 2 baths\n3D Live\nType H 1388 SQF\n1 bed, 2 baths\n3D Live\nType B 1173 SQF\n1 bed, 2 baths\n3D Live\nTy",
//                 regulatoryInformation: {
//                   BRN: '56954',
//                   DED: '840793',
//                   ORN: '22916, 786',
//                   'Permit Number': '7122345300',
//                   'Registered Agency': 'DIVINE HOMES REAL ESTATE BROKER L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'MULTIPLE OPTIONS | FOUNTAIN VIEWS | BEST DEAL',
//                 url: 'https://www.bayut.com/property/details-11817747.html',
//                 validatedInformation: {
//                   'Built-up Area': '1,103 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '1 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 662,
//                         Date: '21 Aug 2025',
//                         Location: 'Act One',
//                         Price: 2250000
//                       },
//                       {
//                         'Area (sqft)': 915,
//                         Date: '21 Aug 2025',
//                         Location: 'South Ridge 6',
//                         Price: 1760000
//                       },
//                       {
//                         'Area (sqft)': 822,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 2928888
//                       },
//                       {
//                         'Area (sqft)': 767,
//                         Date: '21 Aug 2025',
//                         Location: 'Grande',
//                         Price: 2618000
//                       },
//                       {
//                         'Area (sqft)': 920,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Views B',
//                         Price: 1650000
//                       },
//                       {
//                         'Area (sqft)': 767,
//                         Date: '21 Aug 2025',
//                         Location: 'Grande',
//                         Price: 2618000
//                       },
//                       {
//                         'Area (sqft)': 0.7,
//                         Date: '1   Society House',
//                         Location: '3,100'
//                       },
//                       { 'Area (sqft)': 0.6, Date: '2   Volta', Location: '2,900' },
//                       {
//                         'Area (sqft)': 6.6,
//                         Date: '3   Elegance Tower',
//                         Location: '3,100'
//                       },
//                       {
//                         'Area (sqft)': -1.6,
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Location: '4,900'
//                       },
//                       { 'Area (sqft)': 0.5, Date: '5   Old Town', Location: '2,600' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 821,
//                         Date: '21 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Grande',
//                         Rent: 'AED 138,000'
//                       },
//                       {
//                         'Area (sqft)': 773,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 141,750'
//                       },
//                       {
//                         'Area (sqft)': 1207,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Burj Khalifa',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 773,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 141,750'
//                       },
//                       {
//                         'Area (sqft)': 799,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: '29 Boulevard 2',
//                         Rent: 'AED 105,000'
//                       },
//                       {
//                         'Area (sqft)': 875,
//                         Date: '28 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'South Ridge 2',
//                         Rent: 'AED 94,500'
//                       },
//                       {
//                         Date: '1   Society House',
//                         Duration: '0.7%',
//                         Location: '3,100'
//                       },
//                       { Date: '2   Volta', Duration: '0.6%', Location: '2,900' },
//                       {
//                         Date: '3   Elegance Tower',
//                         Duration: '6.6%',
//                         Location: '3,100'
//                       },
//                       {
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Duration: '-1.6%',
//                         Location: '4,900'
//                       },
//                       { Date: '5   Old Town', Duration: '0.5%', Location: '2,600' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 986, Date: '19 Aug 2025', Price: 2700000 },
//                       { 'Area (sqft)': 1133, Date: '18 Jun 2025', Price: 3350000 },
//                       { 'Area (sqft)': 1096, Date: '16 Jun 2025', Price: 3050000 },
//                       { 'Area (sqft)': 1011, Date: '3 Jun 2025', Price: 2900000 },
//                       { 'Area (sqft)': 1406, Date: '2 Jun 2025', Price: 3550000 },
//                       { 'Area (sqft)': 1173, Date: '29 Apr 2025', Price: 3200000 },
//                       { 'Area (sqft)': 3100, Date: '1   Society House', Price: 7 },
//                       { 'Area (sqft)': 2900, Date: '2   Volta', Price: 6 },
//                       { 'Area (sqft)': 3100, Date: '3   Elegance Tower', Price: 66 },
//                       {
//                         'Area (sqft)': 4900,
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Price: 16
//                       },
//                       { 'Area (sqft)': 2600, Date: '5   Old Town', Price: 5 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1207,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 986,
//                         Date: '2 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 155,000'
//                       },
//                       {
//                         'Area (sqft)': 1133,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 182,000'
//                       },
//                       {
//                         'Area (sqft)': 1044,
//                         Date: '20 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 220,000'
//                       },
//                       {
//                         'Area (sqft)': 1103,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 189,000'
//                       },
//                       {
//                         'Area (sqft)': 1096,
//                         Date: '10 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 157,500'
//                       },
//                       {
//                         'Area (sqft)': 0.7,
//                         Date: '1   Society House',
//                         Duration: '3,100'
//                       },
//                       { 'Area (sqft)': 0.6, Date: '2   Volta', Duration: '2,900' },
//                       {
//                         'Area (sqft)': 6.6,
//                         Date: '3   Elegance Tower',
//                         Duration: '3,100'
//                       },
//                       {
//                         'Area (sqft)': -1.6,
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Duration: '4,900'
//                       },
//                       { 'Area (sqft)': 0.5, Date: '5   Old Town', Duration: '2,600' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:34:01.263Z'
//             },
//             {
//               _id: '68a81646afe962cceaad9ed0',
//               propertyId: '11762741',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:34.609Z',
//               propertyNumericId: 11762741,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:33:46.638Z',
//               url: 'https://www.bayut.com/property/details-11762741.html',
//               scrapedData: {
//                 agent: 'Junaid Ahmed',
//                 amenities: {
//                   Building: ['Flooring'],
//                   'Business and Security': ['Security Staff', 'CCTV Security'],
//                   'Cleaning and Maintenance': ['Waste Disposal'],
//                   'Health and Fitness': ['Gym or Health Club', 'Swimming Pool', 'Sauna'],
//                   'Laundry and Kitchen': ['Laundry Room'],
//                   Miscellaneous: ['Freehold'],
//                   'Recreation and Family': ['Day Care Center', 'Kids Play Area', 'Lawn or Garden', 'Cafeteria or Canteen']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: false,
//                 price: 5300000,
//                 priceCurrency: 'AED',
//                 priceText: '5,300,000',
//                 propertyId: '11762741',
//                 propertyInformation: {
//                   'Added on': '26 May 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - 10020-prSghV',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - 10020-prSghV\nChecked\nFloor plans\nMap\n70\nAED\n5,300,000\nSave\nShare\nEst. Payment \nAED 21.1K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n1,428 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nFull Fountain View | Iconic Tower | Burj Khalifa\nVisionary Real Estate proudly presents this exceptional 2-bedroom apartment in the iconic Burj Khalifa, offering stunning full fountain views from every room. \n\nProperty Details:\n•\tSelling Price: AED 5,300,000\n•\tType: 2A Layout\n•\tView: Full Fountain View\n•\tBedrooms: 2\n•\tBathrooms: 2\n•\tSize: 1481 Sq ft\n•\tParking: 2 Allocated Parking Spaces\n•\tKitchen: Open-plan with breakfast bar and floor-to-ceiling windows\n•\tMaster Bedroom: Spacious with ample built-in wardrobes\n\nExclusive Features & Amenities:\n•\tDirect internal access to Dubai Mall\n•\tSky Lounge on the 123rd floor (residents only)\n•\tFully equipped gym and two swimming pools\n•\tTwo tennis courts and a basketball court (Saturdays only)\n•\t24/7 Concierge and Security Services\n•\tBusiness Centre on the 43rd floor\n•\tMeeting rooms on the 43rd & 76th floors\n•\t24-hour supermarket in the building\n•\t15% resident discount at all six Armani Hotel restaurants\n•\tHousekeeping, laundry, and carwash services available\n\n\nABOUT VisionARY\nVisionary Real Estate in Dubai specializes in selling off-plan properties, offering expert guidance through the purchasing process. With a deep understanding of market trends and a commitment to client satisfaction, we provide valuable insights and personalized service to ensure successful investments in Dubai’s dynamic real estate market.\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - 10020-prSghV\nCompletion\nReady\nFurnishing\nUnfurnished\nAverage Rent\nAED\n296,348\nYearly\nAdded on\n26 May 2025\nValidated Information\nDeveloper\nEMAAR',
//                 regulatoryInformation: {
//                   BRN: '23272',
//                   DED: '888322',
//                   'Permit Number': '7121575800',
//                   RERA: '24115',
//                   'Registered Agency': 'VISIONARY REAL ESTATE L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Full Fountain View | Iconic Tower | Burj Khalifa',
//                 url: 'https://www.bayut.com/property/details-11762741.html',
//                 validatedInformation: {
//                   'Built-up Area': '1,428 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:33:46.638Z'
//             },
//             {
//               _id: '68a81646afe962cceaad9ecf',
//               propertyId: '11769844',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:34.609Z',
//               propertyNumericId: 11769844,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:33:32.267Z',
//               url: 'https://www.bayut.com/property/details-11769844.html',
//               scrapedData: {
//                 agent: 'Danish Ali Ghulam Murtaza',
//                 amenities: {
//                   Building: ['Balcony or Terrace', 'Lobby in Building'],
//                   Features: ['Furnished', 'Parking Spaces: 1', 'Centrally Air-Conditioned', 'Central Heating'],
//                   'Health and Fitness': ['Gym or Health Club', 'Swimming Pool', 'Jacuzzi', 'Sauna', 'Steam Room'],
//                   Miscellaneous: ['Maids Room']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: false,
//                 price: 5500000,
//                 priceCurrency: 'AED',
//                 priceText: '5,500,000',
//                 propertyId: '11769844',
//                 propertyInformation: {
//                   'Bathrooms:': '3',
//                   'Bedrooms:': '2 + Maid’s Room',
//                   'Price:': 'AED 5,500,000',
//                   'Size:': '2,056.01 SQFT'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - 104798-DhWuKm\nChecked\nFloor plans\nMap\n36\nAED\n5,500,000\nSave\nShare\nEst. Payment \nAED 21.9K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n2,056 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nLV UPGRADED | Sea View | Move in Today\nExperience elevated living in the world’s tallest tower with this stunning 2-bedroom apartment plus maid’s room, located on a high floor in the iconic Burj Khalifa. \n\nSize: 2,056.01 SQFT\nBedrooms: 2 + Maid’s Room\nBathrooms: 3\nPrice: AED 5,500,000\nThis spacious residence offers a sophisticated layout with expansive living and dining areas, floor-to-ceiling windows with breathtaking views, a fully equipped modern kitchen, and elegant finishes throughout. Both bedrooms feature en-suite bathrooms and built-in wardrobes. The maid’s room offers additional flexibility for storage or staff use. \nResidents of Burj Khalifa enjoy world-class amenities including:\n\nIndoor & outdoor swimming pools\nFully equipped fitness center\nLibrary & resident lounges\nConcierge & security services\nDirect access to Dubai Mall and Downtown Boulevard\n\nOwn a piece of architectural history and enjoy an unparalleled lifestyle in the heart of Downtown Dubai. \nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - 104798-DhWuKm\nCompletion\nReady\nFurnishing\nFurnished\nAverage Rent\nAED\n426,661\nYearly\nAdded on\n27 May 2025\nValidated Information\nDeveloper\nEMAAR PROPERTIES (P.J.S.C)\nOwnership\nFreehold\nBuilt-up Area\n2,056 sqft\nUsage\nResidential\nParking Availability\nYes\nFloor Plans\n3D LIVE\n3D IMAGE\n2D IMAGE\nBuilding Information\nBuilding Name\nBurj Khalifa\nYear of Completion\n2009\nTotal Floors\n170\nRetail Centres\n1\nTotal Building Area\n5,577,803 sqft\nFeatures / Amenities\nFurnished\nBalcony or Terrace\nParking Spaces: 1\nMaids Room\nSwimming Pool\n+ 7 more ameni',
//                 regulatoryInformation: {
//                   BRN: '46664',
//                   DED: '1370301',
//                   'Permit Number': '7121873600',
//                   RERA: '43471',
//                   'Registered Agency': 'TOBE REAL ESTATE L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'LV UPGRADED | Sea View | Move in Today',
//                 url: 'https://www.bayut.com/property/details-11769844.html',
//                 validatedInformation: {
//                   'Built-up Area': '2,056 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:33:32.267Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e6b',
//               propertyId: '11758493',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 11758493,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:33:17.600Z',
//               url: 'https://www.bayut.com/property/details-11758493.html',
//               scrapedData: {
//                 agent: 'Balinder Kumar',
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 6200000,
//                 priceCurrency: 'AED',
//                 priceText: '6,200,000',
//                 propertyId: '11758493',
//                 propertyInformation: {
//                   'Added on': '26 May 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - DPB-S-2193',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   "EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - DPB-S-2193\non 28th of July 2025\nFloor plans\nMap\n19\nAED\n6,200,000\nSave\nShare\nEst. Payment \nAED 24.7K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n2,053 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nLarge layout | Skyline View | Motivated Seller\nBrought to you by Driven Properties, this 2 Bedroom Apartment is located in tallest skyscaper, Burj Khalifa, Downtown Dubai. \n\nUnit Details:\n\n- Multiple Options\n- Vacant\n- Large panoramic living room\n- High floor\n- View: Sea and Sheikh Zayed\n- Kitchen: Open and Fully Fitted\n- Bathrooms: 3\n- Built up Area: 2053 sqft\n- No. of Parking: 2\n- Furnished: No\n\nFeatures:\n\n- Basement parking\n- Balcony\n- Concierge Service\n- Dining in building\n- Metro station\n- Public parking\n- Restaurants\n- Public transport\n- Security\n- Shopping mall\n\nDowntown Dubai is the city’s busy tourism hub. A home to the towering Burj Khalifa skyscraper, with its observation deck, and the dancing Dubai Fountain where crowds gather to watch music and light shows. \n\n\nAsk us about:\n\n- Mortgage Advisory\n- Property Management\n- Holiday Homes\n- Interior Design\n\nVisit our offices across Dubai's most popular communities including:\n\n- Business Bay\n- Dubai Creek Harbour\n- Jumeirah Village Circle\n- Dubai Hills Estate\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - DPB-S-2193\nCompletion\nReady\nFurnishing\nUnfurnished\nTruCheck™\non\n28 July 2025\nAverage Rent\nAED\n426,038\nYearly\nAdded on\n26 May 2025\nValidated Information\nDeveloper\nEMAAR PROPERTIES (P.J.S.C)\nOwnership\nFreehold\nBuilt-up Area\n2,053 sqft\nUsage\nResidential\nParking Availability\nYes\nFloor Plans\n3D LIVE\n3D IMAGE\n2D IMAGE\nBuilding Information\nBuilding Name\nBurj Khalifa\nYear of Completion\n2009\nTotal Floors\n170\nRetail Centres\n1\nTotal Building Area\n5,577,803 sqft\nFeatures / Amenitie",
//                 regulatoryInformation: {
//                   BRN: '33673',
//                   DED: '677961, 905881, 750008, 1085123, 1170923',
//                   'Permit Number': '7121996700',
//                   RERA: '11917',
//                   'Registered Agency': 'DRIVEN PROPERTIES L.L.C (BRANCH)',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Large layout | Skyline View | Motivated Seller',
//                 url: 'https://www.bayut.com/property/details-11758493.html',
//                 validatedInformation: {
//                   'Built-up Area': '2,053 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:33:17.600Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e71',
//               propertyId: '12557834',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 12557834,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:31:48.431Z',
//               url: 'https://www.bayut.com/property/details-12557834.html',
//               scrapedData: {
//                 agent: 'Syed Ahmad',
//                 amenities: {
//                   Building: ['Lobby in Building', 'Service Elevators', 'Prayer Room', 'Reception/Waiting Room'],
//                   'Business and Security': ['Business Center', 'Conference Room', 'Security Staff', 'CCTV Security'],
//                   'Cleaning and Maintenance': ['Waste Disposal', 'Maintenance Staff', 'Cleaning Services'],
//                   Features: ['Electricity Backup', 'Parking Spaces: 1', 'Centrally Air-Conditioned', 'Central Heating', 'Double Glazed Windows', 'Storage Areas', 'Study Room'],
//                   'Health and Fitness': ['First Aid Medical Center', 'Gym or Health Club', 'Facilities for Disabled', 'Swimming Pool', 'Jacuzzi', 'Sauna', 'Steam Room'],
//                   Miscellaneous: ['24 Hours Concierge', 'Freehold'],
//                   'Recreation and Family': ['Day Care Center', 'Kids Play Area', 'Lawn or Garden', 'Barbeque Area', 'Cafeteria or Canteen']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 5750000,
//                 priceCurrency: 'AED',
//                 priceText: '5,750,000',
//                 propertyId: '12557834',
//                 propertyInformation: {
//                   'Added on': '19 August 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - prestigedubai-13362794MP',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - prestigedubai-13362794MP\nNew listing! Posted on 19 August 2025\nChecked\nFloor plans\nMap\n54\nAED\n5,750,000\nSave\nShare\nEst. Payment \nAED 22.9K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n1,888 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nExclusive 2 Bed D-Type | Vacant Now | Opera View\nPrestige Luxury Real Estate offers this magnificent two-bedroom Apartment in Burj Khalifa, Downtown Dubai, Dubai for Sale. \n\nProperty Highlights:\n\n- Rented\n- Two bedrooms ensuite bathroom\n- Guest bathroom\n- High Floor\n- Unfurnished\n- Area Size: 1,888 sq. ft. \n- Large 2BR D-Type\n- Unique curvy floor plan\n- Bright living area\n- High-quality designer kitchen with appliances\n- Wooden Flooring\n- Floor-to-ceiling windows\n- Built-in shelving for TV entertainment\n- Built-in wardrobes\n- Utility Room\n- Allocated parking space\n\nProperty Amenities:\n\n- Grand Residential Lobby\n- 24-hour Concierge Service\n- Residence Club Lounge\n- Infinity Lap Pool\n- Poolside Cabana\n- Business Centre\n- Gym with Training Studio\n- Kids Studio\n\nBurj Khalifa, the world’s tallest building, reaches an impressive 828 metres (2,716.5 feet) and situated in Downtown Dubai. \n\nPrestige Luxury Real Estate prides itself in providing the best properties and most satisfying real estate services in the UAE. The company offers personal attention and specialist knowledge to all its esteemed customers and works hard in building trust through transparency in all of its dealings as a company. It offers a wide range of fully integrated real estate services with Residential & Commercial Sales and Leasing at the forefront of the company’s services.\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - prestigedubai-13362794MP\nCompletion\nReady\nFurnishing\nUnfurnished\nAverage Rent\nAED\n391,797\nYearly\nAdded',
//                 regulatoryInformation: {
//                   BRN: '37244',
//                   DED: '966265',
//                   'Permit Number': '7121577000',
//                   RERA: '27229',
//                   'Registered Agency': 'PRESTIGE LUXURY REAL ESTATE',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Exclusive 2 Bed D-Type | Vacant Now | Opera View',
//                 url: 'https://www.bayut.com/property/details-12557834.html',
//                 validatedInformation: {
//                   'Built-up Area': '1,888 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:31:48.430Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e70',
//               propertyId: '12557781',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 12557781,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:31:33.639Z',
//               url: 'https://www.bayut.com/property/details-12557781.html',
//               scrapedData: {
//                 agent: 'Syed Ahmad',
//                 amenities: {
//                   Building: ['Lobby in Building', 'Service Elevators', 'Prayer Room', 'Reception/Waiting Room'],
//                   'Business and Security': ['Business Center', 'Conference Room', 'Security Staff', 'CCTV Security'],
//                   'Cleaning and Maintenance': ['Waste Disposal', 'Maintenance Staff', 'Cleaning Services'],
//                   Features: ['Electricity Backup', 'Parking Spaces: 1', 'Centrally Air-Conditioned', 'Central Heating', 'Double Glazed Windows', 'Storage Areas', 'Study Room'],
//                   'Health and Fitness': ['First Aid Medical Center', 'Gym or Health Club', 'Facilities for Disabled', 'Swimming Pool', 'Jacuzzi', 'Sauna', 'Steam Room'],
//                   Miscellaneous: ['24 Hours Concierge', 'Freehold'],
//                   'Recreation and Family': ['Day Care Center', 'Kids Play Area', 'Lawn or Garden', 'Barbeque Area', 'Cafeteria or Canteen']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 5900000,
//                 priceCurrency: 'AED',
//                 priceText: '5,900,000',
//                 propertyId: '12557781',
//                 propertyInformation: {
//                   'Added on': '19 August 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - prestigedubai-13362793MP',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - prestigedubai-13362793MP\nNew listing! Posted on 19 August 2025\nChecked\nFloor plans\nMap\n47\nAED\n5,900,000\nSave\nShare\nEst. Payment \nAED 23.5K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n1,888 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nFull Fountain View | Exclusive Unit | Lavish 2BR\nPrestige Luxury Real Estate offers this spectacular two-bedroom Apartment in Burj Khalifa, Downtown Dubai, Dubai for Sale. \n\nProperty Highlights:\n\n- Rented\n- Two bedrooms ensuite bathroom\n- Guest bathroom\n- Exclusive unit\n- High Floor\n- Unfurnished\n- Area Size: 1,888 sq. ft. \n- D Type Vastu\n- Unique curvy floor plan\n- Bright living area\n- Spacious dining area\n- High-quality designer kitchen with appliances\n\n- Wooden Flooring\n- Floor-to-ceiling windows\n- Built-in shelving for TV entertainment\n- Built-in wardrobes\n- Utility Room\n- Laundry room\n- Full fountain views\n- Allocated parking space\n\nProperty Amenities:\n\n- Grand Residential Lobby\n- 24-hour Concierge Service\n- Residence Club Lounge\n- Infinity Lap Pool\n- Poolside Cabana\n- Business Centre\n- Gym with Training Studio\n- Kids Studio\n\nBurj Khalifa, the world’s tallest building, reaches an impressive 828 metres (2,716.5 feet) and situated in Downtown Dubai. \n\nPrestige Luxury Real Estate prides itself in providing the best properties and most satisfying real estate services in the UAE. The company offers personal attention and specialist knowledge to all its esteemed customers and works hard in building trust through transparency in all of its dealings as a company. It offers a wide range of fully integrated real estate services with Residential & Commercial Sales and Leasing at the forefront of the company’s services.\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - prestigedubai-13362793MP\nCom',
//                 regulatoryInformation: {
//                   BRN: '37244',
//                   DED: '966265',
//                   'Permit Number': '7121879900',
//                   RERA: '27229',
//                   'Registered Agency': 'PRESTIGE LUXURY REAL ESTATE',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Full Fountain View | Exclusive Unit | Lavish 2BR',
//                 url: 'https://www.bayut.com/property/details-12557781.html',
//                 validatedInformation: {
//                   'Built-up Area': '1,888 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:31:33.639Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e6f',
//               propertyId: '12567537',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 12567537,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:31:18.745Z',
//               url: 'https://www.bayut.com/property/details-12567537.html',
//               scrapedData: {
//                 agent: 'Sam Watkinson',
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 6500000,
//                 priceCurrency: 'AED',
//                 priceText: '6,500,000',
//                 propertyId: '12567537',
//                 propertyInformation: {
//                   'Added on': '20 August 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Furnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - RL-153747',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   "EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - RL-153747\nNew listing! Posted on 20 August 2025\nChecked\nMap\nRequest video\n16\nAED\n6,500,000\nSave\nShare\nEst. Payment \nAED 25.9K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n2 Baths\n1,716 sqft\nOverview\nTrends\nMortgage\nPanoramic Fountain Views|Vacant|Furnished\nSam from White and Co. is excited to bring to the market this stunning two-bedroom apartment in the iconic Burj Khalifa, Downtown Dubai. \n\nFeaturing breathtaking views of the Dubai Fountain, and complete with premium interiors this apartment is fully furnished and vacant – perfect for investors seeking high ROI, or for end users looking for a prestigious address. \n\n\nPROPERTY FEATURES:\n\n-2 bedrooms\n-1715.98 sqft. \n-No pillars\n-Fully furnished with premium interiors\n-Spacious, thoughtfully designed layout\n-High-floor location with panoramic Dubai Fountain views\n-Floor-to-ceiling windows offering abundant natural light\n-Open-plan living and dining area perfect for entertaining\n-Fully equipped kitchen with high-quality appliances\n\nEXCLUSIVE AMENITIES:\n\n-Fitness centre and swimming pool\n-Spa facilities for relaxation\n-24/7 concierge and valet services\n-Private residents' lounge\n-Direct access to Dubai Mall and nearby attractions\n\n\nContact Sam to arrange your private viewing today.\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - RL-153747\nCompletion\nReady\nFurnishing\nFurnished\nAverage Rent\nAED\n356,104\nYearly\nAdded on\n20 August 2025\nValidated Information\nDeveloper\nEMAAR PROPERTIES (P.J.S.C)\nOwnership\nFreehold\nBuilt-up Area\n1,716 sqft\nUsage\nResidential\nParking Availability\nYes\nBuilding Information\nBuilding Name\nBurj Khalifa\nYear of Completion\n2009\nTotal Floors\n170\nRetail Centres\n1\nTotal Building Area\n5,577,803 sqft\nSimilar Property Transactions\n2 Bedroom Apartments in Burj Khalifa",
//                 regulatoryInformation: {
//                   BRN: '49549',
//                   DED: '923264',
//                   'Permit Number': '7121577500',
//                   RERA: '25663',
//                   'Registered Agency': 'WHITE AND WHITE REAL ESTATE L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Panoramic Fountain Views|Vacant|Furnished',
//                 url: 'https://www.bayut.com/property/details-12567537.html',
//                 validatedInformation: {
//                   'Built-up Area': '1,716 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:31:18.745Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e6e',
//               propertyId: '9446160',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 9446160,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:31:03.997Z',
//               url: 'https://www.bayut.com/property/details-9446160.html',
//               scrapedData: {
//                 agent: 'Hifzur Rahman',
//                 amenities: {
//                   Building: ['Lobby in Building', 'Prayer Room', 'Reception/Waiting Room'],
//                   'Business and Security': ['Business Center', 'Conference Room', 'Security Staff', 'CCTV Security'],
//                   'Cleaning and Maintenance': ['Waste Disposal', 'Maintenance Staff', 'Cleaning Services'],
//                   Features: ['Centrally Air-Conditioned'],
//                   'Health and Fitness': ['Gym or Health Club', 'Swimming Pool', 'Jacuzzi', 'Sauna'],
//                   'Laundry and Kitchen': ['Laundry Facility'],
//                   Miscellaneous: ['ATM Facility', 'Nearby Shopping Malls', 'Freehold'],
//                   'Recreation and Family': ['Kids Play Area', 'Cafeteria or Canteen'],
//                   Technology: ['Broadband Internet', 'Satellite/Cable TV']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 5500000,
//                 priceCurrency: 'AED',
//                 priceText: '5,500,000',
//                 propertyId: '9446160',
//                 propertyInformation: {
//                   'Added on': '3 August 2024',
//                   Completion: 'Ready',
//                   Furnishing: 'Furnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - 6080-owFtJ6',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - 6080-owFtJ6\nThis is a highly reviewed agent! Contact now\nChecked\nFloor plans\nMap\n16\nAED\n5,500,000\nSave\nShare\nEst. Payment \nAED 21.9K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n2,053 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nExclusive | Large Layout | Sea View | Vacant\nOne Earth Real Estate is proud to present this exclusive 2-bedroom apartment located in the iconic Burj Khalifa, offering breathtaking sea views and a lifestyle of unparalleled luxury in the heart of Downtown Dubai. \n\n\nUnit Details Location: High floor with stunning sea views. \nBuilt-Up Area: 2053 sq ft, providing ample space for comfortable living. \nKitchen: Semi and fully fitted with high-quality appliances for all your culinary needs. \nBathrooms: 3 modern bathrooms designed with sleek fixtures. \nStatus: Rented with notice served, making it an excellent investment opportunity or future home. \n\n\nFeatures & Upgrades Upgraded Interiors: Elegant design featuring solid wood floors that exude sophistication and warmth. \nPets Allowed: Perfect for pet lovers seeking a welcoming environment for their furry friends. \n\n\nWorld-Class Amenities Access to a state-of-the-art gym and refreshing swimming pool to maintain an active lifestyle. \nCentral air conditioning ensures year-round comfort in every corner of your home. \nFully equipped kitchen appliances included for convenience and ease of use. \nRound-the-clock security services provide peace of mind at all times. \nShops within the building offer everyday essentials just steps away from your door. \nEasy access to the metro station ensures seamless connectivity across Dubai. \nDining options within the building cater to diverse tastes and preferences, making every meal special!\nConcierge service available to assist you with all your needs, ensuring a',
//                 regulatoryInformation: {
//                   BRN: '37043',
//                   DED: '706164',
//                   'Permit Number': '7122072500',
//                   RERA: '12858, 12858',
//                   'Registered Agency': 'ONE EARTH REAL ESTATE BROKER',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Exclusive | Large Layout | Sea View | Vacant',
//                 url: 'https://www.bayut.com/property/details-9446160.html',
//                 validatedInformation: {
//                   'Built-up Area': '2,053 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:31:03.997Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e6d',
//               propertyId: '11036832',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 11036832,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:30:49.277Z',
//               url: 'https://www.bayut.com/property/details-11036832.html',
//               scrapedData: {
//                 agent: 'Maureen Schraepler',
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 8800000,
//                 priceCurrency: 'AED',
//                 priceText: '8,800,000',
//                 propertyId: '11036832',
//                 propertyInformation: {
//                   'Added on': '4 June 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - L-4101',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - L-4101\non 14th of August 2025\nFloor plans\nMap\n11\nAED\n8,800,000\nSave\nShare\nEst. Payment \nAED 35.1K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n2 Beds\n3 Baths\n2,008 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nVacant On Transfer | The Best View | First Zone\nEquity is pleased to present this exceptional 2-bedroom apartment in one of the world’s tallest residential buildings, the Burj Khalifa, the heart of Downtown. This stunning mid-floor unit offers modern living with breathtaking city views, a spacious layout, and top-tier amenities, making it an ideal choice for homeowners and investors alike. \n\n- 2 Bedrooms\n- 3 Bathrooms\n- Study Room\n- Unfurnished\n- Mid Floor\n- 2,008.01 Sq. Ft. \n- Fountain View\n- Vacant on Transfer\n- Dedicated Parking Spaces\n- Permit No. : 7121881700\n\nAmenities Available:\n- Swimming Pool\n- Fully Equipped Gym\n- The Exclusive Burj Club\n- Multiple Restaurants\n- 24/7 Security and Concierge Services\n\n\nLiving on an iconic location, with Dubai Mall in walking distance. Premium Italian marble and exotic timber flooring together with world class appliances and a smart home system are just a few of the many luxuries in this apartment. \n\nPlease be advised that all measurements and information are provided to the best of our knowledge. Equity disclaims any liability for inaccuracies or discrepancies. \n\nEquity\nRERA ORN: 43321\nAddress: Office 1902, Boulevard Plaza Tower 2, Downtown Dubai, Dubai, UAE\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - L-4101\nCompletion\nReady\nFurnishing\nUnfurnished\nTruCheck™\non\n14 August 2025\nAverage Rent\nAED\n416,700\nYearly\nAdded on\n4 June 2025\nValidated Information\nDeveloper\nEMAAR PROPERTIES (P.J.S.C)\nOwnership\nFreehold\nBuilt-up Area\n2,008 sqft\nUsage\nResidential\nParking Availability\nYes\nFloor Plans\n3',
//                 regulatoryInformation: {
//                   BRN: '53501',
//                   DED: '1369929',
//                   'Permit Number': '7121881700',
//                   RERA: '43321',
//                   'Registered Agency': 'MAX EQUITY REAL ESTATES L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Vacant On Transfer | The Best View | First Zone',
//                 url: 'https://www.bayut.com/property/details-11036832.html',
//                 validatedInformation: {
//                   'Built-up Area': '2,008 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '2 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1335,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 4318888
//                       },
//                       {
//                         'Area (sqft)': 1066,
//                         Date: '21 Aug 2025',
//                         Location: 'Vida Dubai Mall Tower 2',
//                         Price: 1996888
//                       },
//                       {
//                         'Area (sqft)': 1005,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Crown',
//                         Price: 2940000
//                       },
//                       {
//                         'Area (sqft)': 1648,
//                         Date: '20 Aug 2025',
//                         Location: 'Opera Grand',
//                         Price: 3582000
//                       },
//                       {
//                         'Area (sqft)': 1111,
//                         Date: '20 Aug 2025',
//                         Location: 'Act Two',
//                         Price: 3350000
//                       },
//                       {
//                         'Area (sqft)': 2210,
//                         Date: '20 Aug 2025',
//                         Location: 'Attareen',
//                         Price: 5350000
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Location: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Location: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Location: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Location: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '11 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1317,
//                         Date: '4 Dec 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 208,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '12 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'The Lofts East',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         'Area (sqft)': 1474,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Tajer Residence',
//                         Rent: 'AED 152,000'
//                       },
//                       {
//                         'Area (sqft)': 1241,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nNEW',
//                         Location: 'The Lofts West',
//                         Rent: 'AED 150,000'
//                       },
//                       {
//                         Date: '1   St. Regis The Residences',
//                         Duration: '4.7%',
//                         Location: '3,400'
//                       },
//                       {
//                         Date: '2   Elegance Tower',
//                         Duration: '-1.0%',
//                         Location: '2,900'
//                       },
//                       {
//                         Date: '3   W Residences',
//                         Duration: '12.8%',
//                         Location: '3,200'
//                       },
//                       {
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '5.4%',
//                         Location: '6,400'
//                       },
//                       { Date: '5   Volta', Duration: '1.7%', Location: '2,500' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 1909, Date: '18 Aug 2025', Price: 6759000 },
//                       { 'Area (sqft)': 2053, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '7 Aug 2025', Price: 7750000 },
//                       { 'Area (sqft)': 1888, Date: '1 Aug 2025', Price: 5600000 },
//                       { 'Area (sqft)': 1639, Date: '31 Jul 2025', Price: 4500000 },
//                       { 'Area (sqft)': 2008, Date: '31 Jul 2025', Price: 6500000 },
//                       {
//                         'Area (sqft)': 3400,
//                         Date: '1   St. Regis The Residences',
//                         Price: 47
//                       },
//                       { 'Area (sqft)': 2900, Date: '2   Elegance Tower', Price: 10 },
//                       { 'Area (sqft)': 3200, Date: '3   W Residences', Price: 128 },
//                       {
//                         'Area (sqft)': 6400,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Price: 54
//                       },
//                       { 'Area (sqft)': 2500, Date: '5   Volta', Price: 17 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 2036,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 320,000'
//                       },
//                       {
//                         'Area (sqft)': 1546,
//                         Date: '29 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 218,295'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '25 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 2203,
//                         Date: '21 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 450,000'
//                       },
//                       {
//                         'Area (sqft)': 2008,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 345,000'
//                       },
//                       {
//                         'Area (sqft)': 1888,
//                         Date: '9 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 265,000'
//                       },
//                       {
//                         'Area (sqft)': 4.7,
//                         Date: '1   St. Regis The Residences',
//                         Duration: '3,400'
//                       },
//                       {
//                         'Area (sqft)': -1,
//                         Date: '2   Elegance Tower',
//                         Duration: '2,900'
//                       },
//                       {
//                         'Area (sqft)': 12.8,
//                         Date: '3   W Residences',
//                         Duration: '3,200'
//                       },
//                       {
//                         'Area (sqft)': 5.4,
//                         Date: '4   Mercedes Benz Places by Binghatti',
//                         Duration: '6,400'
//                       },
//                       { 'Area (sqft)': 1.7, Date: '5   Volta', Duration: '2,500' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:30:49.277Z'
//             },
//             {
//               _id: '68a81633afe962cceaad9e6c',
//               propertyId: '12105152',
//               __v: 0,
//               categoryId: '68a8162cafe962cceaad9d11',
//               createdAt: '2025-08-22T07:03:15.456Z',
//               propertyNumericId: 12105152,
//               status: 'Found',
//               updatedAt: '2025-08-22T10:30:34.697Z',
//               url: 'https://www.bayut.com/property/details-12105152.html',
//               scrapedData: {
//                 agent: 'George Hamblyn',
//                 amenities: {
//                   Building: ['Balcony or Terrace', 'Lobby in Building'],
//                   'Business and Security': ['Business Center'],
//                   'Cleaning and Maintenance': ['Maintenance Staff'],
//                   Features: ['Furnished', 'Centrally Air-Conditioned', 'Central Heating', 'Storage Areas'],
//                   'Health and Fitness': ['Gym or Health Club', 'Jacuzzi', 'Sauna', 'Steam Room'],
//                   'Laundry and Kitchen': ['Laundry Room', 'Laundry Facility'],
//                   Miscellaneous: ['ATM Facility', '24 Hours Concierge', 'Pets Allowed', 'Maids Room', 'View'],
//                   'Recreation and Family': ['Kids Play Area', 'Barbeque Area'],
//                   Technology: ['Broadband Internet', 'Satellite/Cable TV', 'Intercom']
//                 },
//                 buildingInformation: {
//                   'Building Name': 'Burj Khalifa',
//                   'Retail Centres': '1',
//                   'Total Building Area': '5,577,803 sqft',
//                   'Total Floors': '170',
//                   'Year of Completion': '2009'
//                 },
//                 displayAddress: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 location: 'Burj Khalifa, Downtown Dubai, Dubai',
//                 offPlan: true,
//                 price: 2950000,
//                 priceCurrency: 'AED',
//                 priceText: '2,950,000',
//                 propertyId: '12105152',
//                 propertyInformation: {
//                   'Added on': '2 July 2025',
//                   Completion: 'Ready',
//                   Furnishing: 'Unfurnished',
//                   Purpose: 'For Sale',
//                   'Reference no.': 'Bayut - AP36696S',
//                   Type: 'Apartment'
//                 },
//                 rawHtmlSnippet:
//                   'EN\nSite settings\nFavourite properties\nSaved searches\nLog in\nFind my Agent\nFloor Plans\nGuides\nMarket Intelligence\nAgent Portal\nEvents\nFor Sale:Dubai ApartmentsDowntown DubaiBurj KhalifaBayut - AP36696S\non 22nd of July 2025\nFloor plans\nMap\n18\nAED\n2,950,000\nSave\nShare\nEst. Payment \nAED 13.4K/mo\nGet Pre-Approved\nBurj Khalifa, Downtown Dubai, Dubai\n1 Bed\n2 Baths\n986 sqft\nOverview\nFloor Plans\nTrends\nMortgage\nVacant | Fountain View | Exclusive Amenities\nPresenting an exceptional 1-bedroom apartment in the iconic Burj Khalifa, located in the heart of Downtown Dubai. Spanning an expansive 986 sq. ft, this luxurious residence offers breathtaking views of the city skyline and serves as the epitome of high-rise living. \n\nKey Highlights:\n- 1 Bedroom + Maids room / 2 Bathrooms\n- Built-in kitchen appliances\n- Private pool and jacuzzi\n- High floor with stunning city and golf course views\n- Partially furnished with upgraded interiors\n- Access to a shared spa, fitness center, and BBQ area\n- 24/7 security and concierge services\n- Covered parking and ample amenities\n\nStep into a world where modern elegance meets comfort. This apartment boasts a thoughtfully designed layout featuring expansive living spaces adorned with marble and solid wood flooring. Perfect for relaxation or hosting, it is ideal for both end-users and savvy investors looking for a prime property in a vibrant community. \n\nDowntown Dubai offers an unmatched lifestyle with fine dining, shopping, and recreational facilities at your doorstep. Experience living in a community that truly redefines luxury. \n\nFor further inquiries or to schedule a private viewing, please contact Savills Middle East today and elevate your lifestyle in one of the world’s most prestigious addresses. \n\nRef Number: AP36696\nRead More\nProperty Information\nType\nApartment\nPurpose\nFor Sale\nReference no.\nBayut - AP36696S\nCompletion\nReady\nFurnishing\nUnfurnished\nTruCheck™\non\n22 July 2025\nAverage Rent\nAED\n177,746\nYearly\nAdded on\n2 July 2025\nValidated Inform',
//                 regulatoryInformation: {
//                   BRN: '54266',
//                   DED: '106589',
//                   'Permit Number': '7122353300',
//                   RERA: '422',
//                   'Registered Agency': 'SAVILLS REAL ESTATE L.L.C',
//                   'Zone Name': 'Burj Khalifa'
//                 },
//                 title: 'Vacant | Fountain View | Exclusive Amenities',
//                 url: 'https://www.bayut.com/property/details-12105152.html',
//                 validatedInformation: {
//                   'Built-up Area': '986 sqft',
//                   Developer: 'EMAAR PROPERTIES (P.J.S.C)',
//                   Ownership: 'Freehold',
//                   'Parking Availability': 'Yes',
//                   Usage: 'Residential'
//                 },
//                 verified: false,
//                 SimilarPropertyTransactions: [
//                   { propertyHeading: '1 Bedroom Apartments in Burj Khalifa' },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'SALE',
//                     transactions: [
//                       {
//                         'Area (sqft)': 662,
//                         Date: '21 Aug 2025',
//                         Location: 'Act One',
//                         Price: 2250000
//                       },
//                       {
//                         'Area (sqft)': 915,
//                         Date: '21 Aug 2025',
//                         Location: 'South Ridge 6',
//                         Price: 1760000
//                       },
//                       {
//                         'Area (sqft)': 822,
//                         Date: '21 Aug 2025',
//                         Location: 'St. Regis The Residences Tower 2',
//                         Price: 2928888
//                       },
//                       {
//                         'Area (sqft)': 767,
//                         Date: '21 Aug 2025',
//                         Location: 'Grande',
//                         Price: 2618000
//                       },
//                       {
//                         'Area (sqft)': 920,
//                         Date: '21 Aug 2025',
//                         Location: 'Burj Views B',
//                         Price: 1650000
//                       },
//                       {
//                         'Area (sqft)': 767,
//                         Date: '21 Aug 2025',
//                         Location: 'Grande',
//                         Price: 2618000
//                       },
//                       {
//                         'Area (sqft)': 0.7,
//                         Date: '1   Society House',
//                         Location: '3,100'
//                       },
//                       { 'Area (sqft)': 0.6, Date: '2   Volta', Location: '2,900' },
//                       {
//                         'Area (sqft)': 6.6,
//                         Date: '3   Elegance Tower',
//                         Location: '3,100'
//                       },
//                       {
//                         'Area (sqft)': -1.6,
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Location: '4,900'
//                       },
//                       { 'Area (sqft)': 0.5, Date: '5   Old Town', Location: '2,600' }
//                     ]
//                   },
//                   {
//                     location: 'Downtown Dubai',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 821,
//                         Date: '21 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Grande',
//                         Rent: 'AED 138,000'
//                       },
//                       {
//                         'Area (sqft)': 773,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 141,750'
//                       },
//                       {
//                         'Area (sqft)': 1207,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Burj Khalifa',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 773,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'Dunya Tower',
//                         Rent: 'AED 141,750'
//                       },
//                       {
//                         'Area (sqft)': 799,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: '29 Boulevard 2',
//                         Rent: 'AED 105,000'
//                       },
//                       {
//                         'Area (sqft)': 875,
//                         Date: '28 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Location: 'South Ridge 2',
//                         Rent: 'AED 94,500'
//                       },
//                       {
//                         Date: '1   Society House',
//                         Duration: '0.7%',
//                         Location: '3,100'
//                       },
//                       { Date: '2   Volta', Duration: '0.6%', Location: '2,900' },
//                       {
//                         Date: '3   Elegance Tower',
//                         Duration: '6.6%',
//                         Location: '3,100'
//                       },
//                       {
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Duration: '-1.6%',
//                         Location: '4,900'
//                       },
//                       { Date: '5   Old Town', Duration: '0.5%', Location: '2,600' }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'SALE',
//                     transactions: [
//                       { 'Area (sqft)': 986, Date: '19 Aug 2025', Price: 2700000 },
//                       { 'Area (sqft)': 1133, Date: '18 Jun 2025', Price: 3350000 },
//                       { 'Area (sqft)': 1096, Date: '16 Jun 2025', Price: 3050000 },
//                       { 'Area (sqft)': 1011, Date: '3 Jun 2025', Price: 2900000 },
//                       { 'Area (sqft)': 1406, Date: '2 Jun 2025', Price: 3550000 },
//                       { 'Area (sqft)': 1173, Date: '29 Apr 2025', Price: 3200000 },
//                       { 'Area (sqft)': 3100, Date: '1   Society House', Price: 7 },
//                       { 'Area (sqft)': 2900, Date: '2   Volta', Price: 6 },
//                       { 'Area (sqft)': 3100, Date: '3   Elegance Tower', Price: 66 },
//                       {
//                         'Area (sqft)': 4900,
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Price: 16
//                       },
//                       { 'Area (sqft)': 2600, Date: '5   Old Town', Price: 5 }
//                     ]
//                   },
//                   {
//                     location: 'Burj Khalifa',
//                     type: 'RENT',
//                     transactions: [
//                       {
//                         'Area (sqft)': 1207,
//                         Date: '1 Oct 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 300,000'
//                       },
//                       {
//                         'Area (sqft)': 986,
//                         Date: '2 Sept 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 155,000'
//                       },
//                       {
//                         'Area (sqft)': 1133,
//                         Date: '1 Sept 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 182,000'
//                       },
//                       {
//                         'Area (sqft)': 1044,
//                         Date: '20 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 220,000'
//                       },
//                       {
//                         'Area (sqft)': 1103,
//                         Date: '15 Aug 2025',
//                         Duration: '12 months\nRENEWAL',
//                         Rent: 'AED 189,000'
//                       },
//                       {
//                         'Area (sqft)': 1096,
//                         Date: '10 Aug 2025',
//                         Duration: '12 months\nNEW',
//                         Rent: 'AED 157,500'
//                       },
//                       {
//                         'Area (sqft)': 0.7,
//                         Date: '1   Society House',
//                         Duration: '3,100'
//                       },
//                       { 'Area (sqft)': 0.6, Date: '2   Volta', Duration: '2,900' },
//                       {
//                         'Area (sqft)': 6.6,
//                         Date: '3   Elegance Tower',
//                         Duration: '3,100'
//                       },
//                       {
//                         'Area (sqft)': -1.6,
//                         Date: '4   The Address Downtown Hotel (Lake Hotel)',
//                         Duration: '4,900'
//                       },
//                       { 'Area (sqft)': 0.5, Date: '5   Old Town', Duration: '2,600' }
//                     ]
//                   }
//                 ]
//               },
//               scrapedDate: '2025-08-22T10:30:34.695Z'
//             }
//           ]
//         }
//       });
//     }, 1000); // Simulates network delay
//   });
// };

export const getBayutProperty = async () => {
  return await getMethodCall(`http://192.168.1.39:8000/api/scrape/properties`);
};
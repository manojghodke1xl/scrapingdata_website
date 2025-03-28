import { useLocation } from 'react-router-dom';

const Layout_SEO = ({ children }) => {
  // Get the current location object from the router
  const location = useLocation();

  /**
   * Generates a human-readable title from the given path
   * @param {string} path - The path from which to generate the title
   * @returns {string} - The generated title
   */
  const generateTitle = (path) => {
    if (!path) return '-';
    // Convert path segments to capitalized words
    return path
      .slice(1)
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ')
      .split('/')[0];
  };

  // Generate a title based on the current pathname
  const title = generateTitle(location.pathname);

  return (
    <>
      {/* Set the document title */}
      <title>MarsCms {title ? '- ' + title : ''}</title>
      {children}
    </>
  );
};

export default Layout_SEO;


import { useLocation } from 'react-router-dom';
const Layout_SEO = ({ children }) => {
  const location = useLocation();
  const generateTitle = (path) => {
    if (!path) return '-';
    return path
      .slice(1)
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ')
      .split('/')[0];
  };
  const title = generateTitle(location.pathname);

  return (
    <>
      <title>MarsCms {title ? '- ' + title : ''}</title>
      {children}
    </>
  );
};
export default Layout_SEO;

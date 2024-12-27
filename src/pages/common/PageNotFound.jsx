import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="mx-auto h-screen px-5 mt-10 border-danger text-center">
      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary ">404</h1>
      <p className="mb-4 text-3xl tracking-tight font-bold text-primary md:text-4xl dark:text-white">Something went wrong.</p>
      <p className="mb-10 text-xl font-medium text-secondary dark:text-gray-400">
        Looks like the page you&apos;re looking for ran into a problem. Let&apos;s get you back on track.
      </p>
      <Link to="/" className="px-4 py-2 text-white font-medium text-xl bg-primary rounded-lg whitespace-nowrap">
        Back to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;

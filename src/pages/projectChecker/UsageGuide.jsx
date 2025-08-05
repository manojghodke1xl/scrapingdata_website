import { Link } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import { FiCopy, FiBookOpen, FiCheckCircle, FiFolder, FiZap, FiFile } from 'react-icons/fi';


const UsageGuide = () => {

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        showNotification('success', 'Copied to clipboard!');
    };
    const section = {
        cloneContent: {
            githubLink: 'git clone https://github.com/manoj1XL/Project-Checker-V2.git',
            pathChange: 'cd Project-Checker-V2',
            npmCommand: 'npm install'
        },
        runCommand: 'npm run start',
        applicationURL: 'http://localhost:7000',

    }
    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-10 text-gray-800">
                {/* Header section with title and back button */}
                <div className="w-full pb-4 border-b border-primary flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">

                    <div className="flex items-center">
                        <FiBookOpen className="text-blue-600 text-3xl mr-2" />
                        <h1 className="text-3xl font-semibold text-dark">Project Checker – Usage Guide</h1>
                    </div>
                    {/* Back button container */}
                    <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
                        <Link to={'/projectChecker/project-checker-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
                            Back
                        </Link>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 font-sans">
                    {/* Overview */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">🧾 Overview</h2>
                        <p className="text-black mb-2">
                            <strong>Project-checker</strong> is a Node.js utility that scans local or hosted website to:
                        </p>
                        <ul className="space-y-2 pl-6">
                            <li className="flex items-center gap-2">
                                <FiCheckCircle className="text-green-500" /> Validate project structure
                            </li>
                            <li className="flex items-center gap-2">
                                <FiFolder className="text-blue-500" /> Identify missing configuration files
                            </li>
                            <li className="flex items-center gap-2">
                                <FiZap className="text-yellow-500" /> Enforce best practices
                            </li>
                            <li className="flex items-center gap-2">
                                <FiFile className="text-purple-500" /> Applicable for <code>.html</code>, <code>.php</code>, <code>.js</code>, <code>.jsx</code>, <code>.tsx</code> files
                            </li>
                        </ul>
                    </section>

                    {/* Prerequisites */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">⚙️ Prerequisites</h2>
                        <ul className="space-y-2 pl-6 list-disc list-inside">
                            <li className="">
                                Node.js (v16+ recommended)
                            </li>
                            <li>Git</li>
                            <li className="">
                                {/* <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-blue-800"> */}
                                Before cloning the repository, make sure you have the necessary access permissions to the private GitHub repo.
                                <br />
                                If you don’t have access, contact your repository administrator or team lead to request it.
                                {/* </div> */}
                            </li>
                        </ul>
                    </section>

                    {/* Clone & Install */}

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">📁 Step-by-Step: Getting Started</h2>

                        {/* Step 1: Open GitHub Repo */}
                        <div className="mb-6 flex flex-col w-full max-w-full">
                            <h3 className="text-xl font-semibold mb-2">Step 1: Open the GitHub Repository</h3>
                            <img src="../projectChecker/repoPage.png" alt="GitHub Repository" className="rounded-md shadow border  w-full max-w-2xl" />
                            <p className="text-base text-gray-500 mt-2">
                                Visit the GitHub repository page in your browser. This is where the project is hosted.
                            </p>
                        </div>

                        {/* Step 2: Click Code and Copy Link */}
                        <div className="mb-6 flex flex-col w-full max-w-full">
                            <h3 className="text-xl font-semibold mb-2">Step 2: Click &quot;Code&quot; & Copy the HTTPS Link</h3>
                            <img src="../projectChecker/gitClone2.png" alt="Click code and copy link" className="rounded-md shadow border w-full max-w-2xl" />
                            <p className="text-base text-gray-500 mt-2 ">
                                Click the green <strong>Code</strong> button, then copy the HTTPS link to clone the repository.
                            </p>
                        </div>

                        {/* Step 3: Clone the Project */}
                        <div className="mb-6 flex flex-col ">
                            <h3 className="text-xl font-semibold mb-2">Step 3: Clone the Repository</h3>

                            <img src="../projectChecker/gitBashCommand.png" alt="cd into project" className="rounded-md shadow border w-full max-w-2xl" />
                            <p className="text-base text-gray-500 mt-2">
                                Open your terminal or Git Bash and run the following command:
                            </p>
                            <div className="relative bg-gray-50 p-4 rounded-lg border border-primary mt-2 w-full max-w-2xl text-left">
                                <pre>
                                    <code className="block text-sm text-primary whitespace-pre-wrap">
                                        {section.cloneContent.githubLink}
                                    </code>
                                </pre>
                                <button
                                    className="absolute top-2 right-2 p-2 text-secondary flex items-center"
                                    onClick={() => handleCopy(section.cloneContent.githubLink)}
                                    aria-label="Copy to clipboard"
                                >
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Step 4: Authenticate */}
                        <div className="mb-6 flex flex-col ">
                            <h3 className="text-xl font-semibold mb-2">Step 4: Authentication and Authorization with GitHub</h3>
                            <img src="../projectChecker/githubSignAccess.png" alt="Sign in" className="rounded-md shadow border w-full max-w-2xl" />
                            <br />
                            <img src="../projectChecker/githubAuthentication.png" alt="GitHub Authentication" className="rounded-md shadow border w-full max-w-2xl" />
                            <br />
                            <img src="../projectChecker/addGithubPassword.png" alt="Add GitHub Password" className="rounded-md shadow border w-full max-w-2xl" />
                            <p className="text-base text-gray-500 mt-2">
                                If asked, log into your GitHub account and allow authentication to complete the cloning process.
                            </p>
                        </div>
                        {/* Step 5: Successful cloning */}
                        <div className="mb-6 flex flex-col ">
                            <h3 className="text-xl font-semibold mb-2">Step 5: Successful Cloning</h3>
                            <img src="../projectChecker/downloadComplete.png" alt="cd into project" className="rounded-md shadow border w-full max-w-2xl" />
                            <p className="text-base text-gray-500 mt-2">
                                If you see the message &quot;Cloning into &apos;your-repo&apos;...&quot;, the cloning process was successful.
                            </p>
                        </div>

                        {/* Step 6 : Change Directory */}
                        <div className="mb-6 flex flex-col ">
                            <h3 className="text-xl font-semibold mb-2">Step 6: Navigate into Project Folder</h3>
                            <img src="../projectChecker/projectDirectory.png" alt="cd into project" className="rounded-md shadow border w-full max-w-2xl" />
                            <p className="text-base text-gray-500 mt-2 ">
                                Run the following command to move into your cloned project directory:
                            </p>
                            <div className="relative bg-gray-50 p-4 rounded-lg border border-primary mt-2 w-full max-w-2xl text-left">
                                <pre>
                                    <code className="block text-sm text-primary whitespace-pre-wrap">
                                        {section.cloneContent.pathChange}
                                    </code>
                                </pre>
                                <button
                                    className="absolute top-2 right-2 p-2 text-secondary flex items-center"
                                    onClick={() => handleCopy(section.cloneContent.pathChange)}
                                    aria-label="Copy to clipboard"
                                >
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Step 7: Install Dependencies */}
                        <div className="mb-6 flex flex-col ">
                            <h3 className="text-xl font-semibold mb-2">Step 7: Install Dependencies</h3>
                            {/* <img src="../projectChecker/downloadComplete.png" alt="npm install" className="rounded-md shadow border w-full max-w-lg" /> */}
                            <p className="text-base text-gray-500 mt-2 ">
                                Run the following command to install all the required packages:
                            </p>
                            <div className="relative bg-gray-50 p-4 rounded-lg border border-primary mt-2 w-full max-w-2xl text-left">
                                <pre>
                                    <code className="block text-sm text-primary whitespace-pre-wrap">
                                        {section.cloneContent.npmCommand}
                                    </code>
                                </pre>
                                <button
                                    className="absolute top-2 right-2 p-2 text-secondary flex items-center"
                                    onClick={() => handleCopy(section.cloneContent.npmCommand)}
                                    aria-label="Copy to clipboard"
                                >
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Download ZIP */}
                    <section className="mb-10">
                        {/* Alternative: Download ZIP */}
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-900 w-full max-w-2xl">
                            <h3 className="font-semibold mb-2">💡 Alternative: Download as ZIP</h3>
                            <p className="text-sm mb-2">
                                If you don’t want to use Git, you can download the project as a ZIP file from GitHub.
                            </p>
                            <p className="text-sm">
                                After downloading, unzip the folder, open the terminal in that directory, and run:
                            </p>
                            <div className="relative bg-gray-50 p-4 rounded-lg border border-primary mt-2 w-full max-w-2xl text-left">
                                <pre>
                                    <code className="block text-sm text-primary whitespace-pre-wrap">
                                        {`${section.cloneContent.pathChange}\n${section.cloneContent.npmCommand}`}
                                    </code>
                                </pre>
                                <button
                                    className="absolute top-2 right-2 p-2 text-secondary flex items-center"
                                    onClick={() => handleCopy(`${section.cloneContent.pathChange}\n${section.cloneContent.npmCommand}`)}
                                    aria-label="Copy to clipboard"
                                >
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Run Commands */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">🚀 Run a Check</h2>

                        <div className="relative bg-gray-50 p-4 rounded-lg border border-primary mt-2 w-full max-w-2xl text-left">
                            <pre>
                                <code className="block text-sm text-primary whitespace-pre-wrap">
                                    {`${section.runCommand}`}
                                </code>
                            </pre>
                            <button className="absolute top-2 right-2 p-2 text-secondary flex items-center" onClick={() => handleCopy(section.runCommand)} aria-label="Copy to clipboard">
                                <FiCopy className="h-5 w-5" />
                            </button>
                        </div>

                    </section>

                    <section className="mb-10">
                        <p>
                            📚 For more, visit the{' '}
                            <a
                                href="https://github.com/manoj1XL/Project-Checker-V2"
                                className="text-blue-600 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                full documentation on GitHub
                            </a>.
                        </p>
                    </section>
                    {/* Step 3: Open in Browser */}
                    <section className='mb-10'>
                        <h2 className="text-2xl font-semibold mb-4">🌐 View the Homepage</h2>

                        <div className="mb-6 flex flex-col w-full max-w-2xl ">
                            <h3 className="text-xl font-semibold mb-2">Access the App in Your Browser</h3>
                            <p className="text-sm text-gray-700 mb-4">
                                After running <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm run start</code>, your development server will start.
                                You’ll see output in the terminal like:
                            </p>
                            <div className="relative bg-gray-50 p-4 rounded-lg border border-primary mt-2 w-full max-w-2xl text-left">
                                <pre>
                                    <code className="block text-sm text-primary whitespace-pre-wrap">
                                        Server running at {`${section.applicationURL}`}
                                    </code>
                                </pre>
                                <button className="absolute top-2 right-2 p-2 text-secondary flex items-center" onClick={() => handleCopy(section.applicationURL)} aria-label="Copy to clipboard">
                                    <FiCopy className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mt-4">
                                Click the link or manually open <strong>http://localhost:7000</strong> in your web browser to see the homepage.
                            </p>

                            <img
                                src="../projectChecker/homePage.png"
                                alt="App Homepage"
                                className="rounded-md shadow border mt-4 w-full max-w-2xl"
                            />
                            <p className="text-base text-gray-500 mt-2 ">
                                Figure: This is the homepage of your Project Checker app when it runs successfully.
                            </p>
                        </div>
                    </section>

                    {/* Offline Script Setup */}
                    <section className="mb-10">
                        <div className="mb-6 flex flex-col w-full max-w-2xl">
                            <h3 className="text-xl font-semibold mb-4">Fill the Details for Offline Script</h3>

                            {/* Option 1: Full Project Selection */}
                            <div className="mb-6">
                                <h4 className="text-lg font-medium mb-2">Option 1: Select Full Project</h4>
                                <img
                                    src="../projectChecker/offlineScriptFullProject.png"
                                    alt="Full Project Selection"
                                    className="rounded-md shadow border w-full max-w-2xl"
                                />
                                <p className="text-base text-gray-500 mt-2">
                                    Choose this if you want to check the entire project directory including all supported files.
                                </p>
                            </div>

                            {/* Option 2: Single File Selection */}
                            <div className="mb-6">
                                <h4 className="text-lg font-medium mb-2">Option 2: Select Single File</h4>
                                <img
                                    src="../projectChecker/singleFile.png"
                                    alt="Single File Selection"
                                    className="rounded-md shadow border w-full max-w-2xl"
                                />
                                <p className="text-base text-gray-500 mt-2">
                                    Use this if you only want to check one specific file from your project (e.g., <code>index.html</code> or <code>App.js</code>).
                                </p>
                            </div>

                            {/* Submit Section */}
                            <div className="mt-4">
                                <h4 className="text-lg font-medium mb-2">Final Step: Submit</h4>
                                <img
                                    src="../projectChecker/onSubmit.png"
                                    alt="On Submit"
                                    className="rounded-md shadow border w-full max-w-2xl"
                                />
                                <p className="text-base text-gray-500 mt-2">
                                    After selecting the project type, fill in required details like project name, path, and type of check. Then click <strong>Submit</strong> to start validation.
                                </p>
                            </div>
                            {/* Step: Status Change (Pending → Resolved / Ignored) */}
                            <div className="mt-4">
                                <h4 className="text-lg font-medium mb-2">Status Tracking</h4>
                                <img
                                    src="../projectChecker/statusChange.png"
                                    alt="Status Change"
                                    className="rounded-md shadow border w-full max-w-2xl"
                                />
                                <p className="text-base text-gray-500 mt-2">
                                    After submission, the checker will analyze your files and show the result with a default status of <strong>Pending</strong>.
                                    You can then manually change each result’s status to <span className="text-green-600 font-semibold">Resolved</span>,
                                    <span className="text-yellow-600 font-semibold">Ignored</span>, or leave it as <span className="text-gray-600 font-semibold">Pending</span>.
                                </p>
                            </div>
                        </div>

                    </section>
                    {/* Online Script Setup */}
                    <section className="mb-10">
                        <div className="mb-6 flex flex-col w-full max-w-2xl">
                            <h3 className="text-xl font-semibold mb-4">Fill the Details for Online Script</h3>

                            {/* Option 1: Full Project Selection */}
                            <div className="mb-6">
                                <h4 className="text-lg font-medium mb-2">Add Web Application URL</h4>
                                <img
                                    src="../projectChecker/onlineScript.png"
                                    alt="Full Project Selection"
                                    className="rounded-md shadow border w-full max-w-2xl"
                                />
                                <p className="text-base text-gray-500 mt-2">
                                    Choose this if you want to check the <strong>entire web application</strong> using <code>URL</code>.
                                </p>
                            </div>
                        </div>

                    </section>
                </div >
            </div >
        </div>

    )
}

export default UsageGuide;
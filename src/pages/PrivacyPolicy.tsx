import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Link>

      <div className="bg-zinc-900 rounded-lg p-8">
        <div className="prose prose-invert max-w-none">
          <p>Our Privacy Policy was last updated on <strong>01/01/25</strong>.</p>

          <p>At <strong>Breakout</strong>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by <strong>Breakout</strong> and how we use it.</p>

          <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:suh.as@icloud.com" className="text-amber-400 hover:text-amber-300">suh.as@icloud.com</a>.</p>

          <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected on <a href="https://crackedaf.co/new" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">https://crackedaf.co/new</a>. This policy is not applicable to any information collected offline or via channels other than this website.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Consent</h2>

          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Information We Collect</h2>

          <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>

          <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>

          <p>When you register for an account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">How We Use Your Information</h2>

          <p>We use the information we collect in various ways, including to:</p>

          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you for customer service, updates, and marketing</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Log Files</h2>

          <p><strong>Breakout</strong> follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics.</p>

          <p>The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Cookies and Web Beacons</h2>

          <p>Like any other website, <strong>Breakout</strong> uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>

          <p>The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Third Party Privacy Policies</h2>

          <p><strong>Breakout</strong>'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">CCPA Privacy Rights</h2>

          <p>Under the CCPA, among other rights, California consumers have the right to:</p>

          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Request disclosure of personal data collected</li>
            <li>Request deletion of personal data</li>
            <li>Opt-out of personal data sales</li>
          </ul>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">GDPR Data Protection Rights</h2>

          <p>We want to ensure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>

          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>The right to access:</strong> Request copies of your personal data</li>
            <li><strong>The right to rectification:</strong> Request correction of inaccurate information</li>
            <li><strong>The right to erasure:</strong> Request data erasure under certain conditions</li>
            <li><strong>The right to restrict processing:</strong> Request processing restrictions</li>
            <li><strong>The right to object:</strong> Object to processing of your personal data</li>
            <li><strong>The right to data portability:</strong> Request transfer of data</li>
          </ul>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Children's Information</h2>

          <p><strong>Breakout</strong> does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
        </div>
      </div>
    </main>
  );
}
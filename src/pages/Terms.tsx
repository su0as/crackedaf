import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Link>

      <div className="bg-zinc-900 rounded-lg p-8">
        <div className="prose prose-invert max-w-none">
          <p>Our Terms and Conditions were last updated on <strong>01/01/25</strong>.</p>

          <p>Please read these terms and conditions carefully before using Our Service.</p>

          <h3 className="text-xl font-silkscreen text-white mt-8 mb-4">Acknowledgment</h3>

          <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between you and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>

          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>

          <p>By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree with any part of these Terms and Conditions, then you may not access the Service.</p>

          <h3 className="text-xl font-silkscreen text-white mt-8 mb-4">User Accounts</h3>

          <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in the immediate termination of your account.</p>

          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with Our Service or a Third-Party Social Media Service.</p>

          <h3 className="text-xl font-silkscreen text-white mt-8 mb-4">Copyright Policy</h3>

          <p><strong>Intellectual Property Infringement</strong></p>

          <p>All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of <strong>Breakout</strong> and are protected by international copyright, trademark, and other intellectual property laws.</p>

          <p><strong>DMCA Notice and DMCA Procedure for Copyright Infringement Claims</strong></p>

          <p>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>

          <ol className="list-decimal pl-6 mt-4 space-y-2">
            <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.</li>
            <li>A description of the copyrighted work that You claim has been infringed.</li>
            <li>Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</li>
            <li>Your address, telephone number, and email address.</li>
            <li>A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner's behalf.</li>
          </ol>

          <p>You can contact our copyright agent via email at <a href="mailto:suh.as@icloud.com" className="text-amber-400 hover:text-amber-300">suh.as@icloud.com</a></p>

          <h3 className="text-xl font-silkscreen text-white mt-8 mb-4">Termination</h3>

          <p>We may terminate or suspend your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.</p>

          <p>Upon termination, your right to use the Service will cease immediately. If you wish to terminate your Account, you may simply discontinue using the Service.</p>

          <h3 className="text-xl font-silkscreen text-white mt-8 mb-4">Contact Us</h3>

          <p>If you have any questions about these Terms and Conditions, You can contact us:</p>

          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>By visiting our website: <a href="https://crackedaf.co/new" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">https://crackedaf.co/new</a></li>
            <li>By sending us an email: <a href="mailto:suh.as@icloud.com" className="text-amber-400 hover:text-amber-300">suh.as@icloud.com</a></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Refund() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Link>

      <div className="bg-zinc-900 rounded-lg p-8">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-silkscreen text-white mb-6">Return & Refund Policy</h1>

          <p>Our Return and Refund Policy was last updated on <strong>01/01/25</strong>.</p>

          <p>Thank you for shopping at <strong>Breakout</strong>.</p>

          <p>The following terms are applicable for any products that you have purchased from us.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Eligibility for Refunds</h2>

          <p>We offer refunds under the following circumstances:</p>

          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>If the service is not delivered as promised due to an error on our end.</li>
            <li>If a technical issue caused by our platform prevents you from accessing the features you paid for, and the issue cannot be resolved within a reasonable timeframe.</li>
            <li>If you cancel your subscription within the refund period outlined below.</li>
          </ul>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Refund Period</h2>

          <p>Refund requests must be made within <strong>0</strong> days of the payment date. Requests made after this period will not be eligible for a refund.</p>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Non-Refundable Cases</h2>

          <p>Refunds will not be granted under the following conditions:</p>

          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>If you change your mind after purchasing a subscription or service.</li>
            <li>If you fail to use the service during the subscription period.</li>
            <li>If the issue is caused by third-party software or tools not affiliated with our platform.</li>
          </ul>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Refund Process</h2>

          <p>To request a refund, please follow these steps:</p>

          <ol className="list-decimal pl-6 mt-4 space-y-2">
            <li>Contact our support team at <a href="mailto:suh.as@icloud.com" className="text-amber-400 hover:text-amber-300">suh.as@icloud.com</a></li>
            <li>Provide your payment receipt, order ID, and a detailed explanation of the issue.</li>
            <li>Our team will review your request and respond within 3-5 business days.</li>
            <li>If your request is approved, the refund will be processed to your original payment method within 7-10 business days.</li>
          </ol>

          <h2 className="text-2xl font-silkscreen text-white mt-8 mb-4">Contact Us</h2>

          <p>If you have any questions about this Refund Policy or require assistance, please reach out to us:</p>

          <p>Email: <a href="mailto:suh.as@icloud.com" className="text-amber-400 hover:text-amber-300">suh.as@icloud.com</a></p>
        </div>
      </div>
    </main>
  );
}
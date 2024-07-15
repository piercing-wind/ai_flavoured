import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Header/>
      <div className="w-full px-4 py-8 md:px-16 lg:px-96">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Effective Date: July 15, 2024</p>

        <p className="mb-4">Welcome to aiflavoured! We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.</p>

        <h2 className="text-xl font-bold mt-8 mb-2">1. Information We Collect</h2>
        <p className="mb-4">We collect the following types of information:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Personal Information: Name, email address, and payment information.</li>
          <li>AI Data: All AI data created by users, including images, voices, presentations, and all media.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-2">2. Purpose of Data Collection</h2>
        <p className="mb-4">We collect your information to:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Provide our services.</li>
          <li>Improve user experience.</li>
          <li>Authorization and authentication.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-2">3. Data Retention and Deletion</h2>
        <p className="mb-4">We immediately delete your data from our servers upon your request or account deletion.</p>
        <p className="mb-4">All user data is stored in the US region, regardless of the user's location.</p>        


        <h2 className="text-xl font-bold mt-8 mb-2">4. Third-Party Services</h2>
        <p className="mb-4">We use third-party services to process payments:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Razorpay: For secure payment processing.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-2">5. Data Storage and Security</h2>
        <p className="mb-4">All AI data created by users is stored in a secure cloud database. We implement robust security measures to protect your data from unauthorized access, alteration, or destruction.</p>

        <h2 className="text-xl font-bold mt-8 mb-2">6. User Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Access your data.</li>
          <li>Correct any inaccuracies in your data.</li>
          <li>Delete your data at any time.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-2">7. Cookies and Tracking Technologies</h2>
        <p className="mb-4">We use cookies to manage user sessions on our website. Cookies help us enhance your browsing experience by remembering your preferences and settings.</p>

        <h2 className="text-xl font-bold mt-8 mb-2">8. Children's Privacy</h2>
        <p className="mb-4">Our services are available to users who are 14 years of age or older.</p>

        <h2 className="text-xl font-bold mt-8 mb-2">9. Changes to This Privacy Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our business practices or legal requirements. We will notify you of any significant changes by posting the new Privacy Policy on our website.</p>

        <h2 className="text-xl font-bold mt-8 mb-2">10. How to contact us</h2>
        <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us here <Link href="mailto:sourabh@aiflavoured.com" className="underline">Contact Us</Link></p>
        <p className="mb-4">Users can cancel your subscription at any time. Please note that you must cancel your subscription before it renews for a subsequent month in order to avoid being charged for the next month's subscription fee. If you cancel your subscription, the cancellation will become effective at the end of the current monthly subscription period.</p>
       
        <p className="mb-4">Thank you for choosing aiflavoured!</p>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
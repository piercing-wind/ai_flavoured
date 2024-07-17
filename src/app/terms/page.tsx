import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";

const Page = () => {
  return (<>
   <Header/>
   <div className="w-[95%] lg:w-[70%] mx-auto">
      <h1 className="text-xl font-bold mt-10 mb-5">Terms &amp; Condition</h1>
      <h5 className="opacity-80 text-lg font-bold">Last updated on Jul 17th 2024</h5>
      <p className="p-5">This website is operated by AI Flavoured. Throughout the site, the terms we, refer to AI Flavoured. AI Flavoured offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
      <h3 className="px-5 text-lg font-bold opacity-90">Your use of the website and/or purchase from us</h3>
      <p className="p-5">Our website and/or purchase from us are governed by following Terms and Conditions:</p>
      <p className="p-5">The content of the pages of this website is subject to change without notice.</p>
      <p className="p-5">Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>
      <p className="p-5">Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</p>

      <h3 className="px-5 text-lg font-bold opacity-90">Our website contains material</h3>
      <p className="p-5">Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>
      <p className="p-5">All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>
      <p className="p-5">Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</p>

      <h3 className="px-5 text-lg font-bold opacity-90">Links and Unauthorized Use</h3>
      <p className="p-5">From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</p>
      <p className="p-5">You may not create a link to our website from another website or document without AI Flavoured’s prior written consent.</p>

      <h3 className="px-5 text-lg font-bold opacity-90">Disputes and Liabilities</h3>
      <p className="p-5">Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</p>
      <p className="p-5">We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</p>
  
   </div>
   <div className="w-[95%] lg:w-[70%] mx-auto">
      <h1 className="text-xl font-bold mt-10 mb-5">Cancellation &amp; Refund Policy</h1>
         <p className="p-5 pt-2">AI Flavoured believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>

         <h2 className="px-5 text-lg font-bold opacity-90">Cancellations</h2>
         <p className="p-5 pt-2">Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the services have been initiated and are in process.</p>

         <h2 className="px-5 text-lg font-bold opacity-90">Non-refundable Services</h2>
         <p className="p-5 pt-2">AI Flavoured does not accept cancellation requests for services that have been fully delivered and activated. However, if the customer establishes that the quality of service delivered is not as promised, we can consider refund/replacement requests.</p>
        
         <h2 className="px-5 text-lg font-bold opacity-90">Service Issues</h2>
         <p className="p-5 pt-2">In case of issues with the delivered services, please report the same to our Customer Service team. The request will, however, be entertained once our team has checked and determined the same at their own end. This should be reported within 48 hours of service activation.</p>
        
         <h2 className="px-5 text-lg font-bold opacity-90">Service Expectations</h2>
         <p className="p-5 pt-2">In case you feel that the service received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 48 hours of service activation. The Customer Service Team after looking into your complaint will take an appropriate decision.</p>

         <h2 className="px-5 text-lg font-bold opacity-90">Refunds</h2>
         <p className="p-5 pt-2">In case of any Refunds approved by the AI Flavoured, it&apos;ll take 3-4 days for the refund to be processed to the end customer.</p>
   </div>

   <Footer/>
  </>);
};

export default Page;

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Header />
      <div className="h-[44vh] overflow-hidden w-[95%] lg:w-[80%] mx-auto justify-between p-5">
        <h1 className="text-xl font-bold">How to contact Ai FLavoured</h1>
        <div className="w-[95%] mx-auto my-8 flex flex-col gap-4">
          <Link href="mailto:contact@aiflavoured.com">
            Email : contact@aiflavoured.com
          </Link>
          <Link href="callto:8847674817"> Phone :+91 8847674817</Link>
          <p>
            Address : Hussainpura west 64 <br /> #143001, India
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Page;

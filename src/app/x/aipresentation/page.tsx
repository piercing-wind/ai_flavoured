import { DrawerForPPTXConfiguration } from '@/components/drawerForPPTXConfiguration';
import { DragAndDropForAiPresentation } from '@/components/dragAndDropForAiPresentation';
import React from 'react';
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const user = session.user;

  return (
    <>
      <div className='flex flex-col flex-grow w-full h-[100vh] overflow-y-auto'>
        <div className="relative flex items-center h-24">
        <img
          src="/logo3.svg"
          alt=""
          className=" w-24 h-24 filter contrast-150 saturate-150 rounded-full "
        />
        <h1 className="text-4xl font-bold ">Presentation</h1>

        <div className=' absolute top-2 h-24 w-[22rem]'>
          <img src="https://media.giphy.com/media/lsnt7oGW5eiJSVOoFr/giphy.gif" className='h-full w-full' alt="Giphy GIF" />
        </div>
      </div>
      <div>
      {/* <DrawerForPPTXConfiguration user={user} generatePPTX={generatePPTX}/> */}
      </div>
        <div className=' text-neutral-700'>
        <p className='font-bold text-2xl'>Unveil the Best AI Presentation Maker in the Market! Transform Your any Document in Slides within Seconds!</p>
        <DragAndDropForAiPresentation />
        </div>
        </div>
    </>
  );
}

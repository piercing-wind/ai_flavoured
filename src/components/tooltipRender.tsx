'use client'
import React, { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export const TooltipWrapper=({children, id, content}:{children : ReactNode, id:string, content: string})=>{
 return(<>
   <div data-tooltip-id={id} data-tooltip-content={content} className='w-auto h-auto'>
      {children}
   </div>
<Tooltip id={id}/>
 </>
 )
}
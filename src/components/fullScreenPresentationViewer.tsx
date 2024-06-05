"use client";
import React from 'react';
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { LuExpand } from "react-icons/lu";
import { Document, Page, pdfjs } from "react-pdf";
import { HashLoader } from "react-spinners";
import { FormError } from "./auth/form-error";
import { useResizeDetector } from "react-resize-detector";
import { MdOutlineClose } from "react-icons/md";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FullScreenPresentationViewer({filePath, isOpen, setIsOpen}: {filePath: string,isOpen : boolean,setIsOpen: (v: boolean) => void}) {

  const [page, setPage] = useState<number>();
  const {width, ref} = useResizeDetector();
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <>
    <Dialog
    open={isOpen}
    onOpenChange={(v) => {
      if (!v) {
        setIsOpen(v);
      }
    }}
    >
      <DialogContent showClose={false} className=" bg-transparent backdrop-blur-sm max-h-[calc(100vh-3rem)] max-w-7xl w-full overflow-y-auto">
      <div className="fixed top-0 right-0 m-2 cursor-pointer z-50" onClick={(e)=>{e.stopPropagation(); setIsOpen(false)}}>
        <MdOutlineClose />
      </div> 
        <div ref={ref} className={` mt-2 `}>
          <Document
            loading={
              <div className=" flex items-center justify-center h-screen">
                <HashLoader color="#f05eb9" loading />
              </div>
            }
            onLoadError={(error) => {
              return (
              <div className=" flex items-center justify-center h-screen">
                <FormError message={"unable to PPTX"} />
                <p className="text-red">Fail to load document!</p>
              </div>
              )
            }}
            onLoadSuccess={({ numPages }) => {
              setPage(numPages);
            }}
            file={filePath}
            className="max-h-full space-y-2 "
          >
        {page && new Array(page).fill(0).map((_, i) => (
                <Page
                key={i}
                width={width ? width : 1}
                pageNumber={i+1}
              />))}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  </>   
  );
}

"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { LuExpand } from "react-icons/lu";
import { Document, Page } from "react-pdf";
import { HashLoader } from "react-spinners";
import { FormError } from "./auth/form-error";
import { useResizeDetector } from "react-resize-detector";

export default function DocFullScreenViewer({fileUrl}: {fileUrl: string}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>();
  const {width, ref} = useResizeDetector();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const docUrl = fileUrl;    



  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild >
            <Button aria-label="Expand" variant="ghost">
                  <LuExpand className="text-xl" />
            </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-3rem)] max-w-7xl w-full overflow-auto">
        <div ref={ref} className={` mt-2 `}>
          <Document
            loading={
              <div className=" flex items-center justify-center h-screen">
                <HashLoader color="#f05eb9" loading />
              </div>
            }
            onLoadError={(error) => {
              <div className=" flex items-center justify-center h-screen">
                <FormError message={"unable to load Document"} />
                <p className="text-red">Fail to load document!</p>
              </div>;
            }}
            onLoadSuccess={({ numPages }) => {
              setPage(numPages);
            }}
            file={docUrl}
            className="max-h-full space-y-2 "
          >
        {new Array(page).fill(0).map((_, i) => (
                <Page
                key={i}
                width={width ? width : 1}
                pageNumber={i+1}
              />))}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
}

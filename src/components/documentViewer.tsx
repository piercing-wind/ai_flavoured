"use client"
import React from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { ClipLoader, HashLoader, MoonLoader } from "react-spinners";
import { FormError } from "@/components/auth/form-error";
import { useResizeDetector } from "react-resize-detector";
import Styles from "@/app/(x)/chat/chat.module.css";
import { Button } from "./ui/button";
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { TiZoomInOutline } from "react-icons/ti";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DocFullScreenViewer from "./docFullScreenViewer";
import _ from 'lodash';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


export const DocumentViewer = ({ docUrl }: { docUrl: string }) => {
   const { width, ref } = useResizeDetector();
  const [pageNum, setPageNum] = useState<number>();
  const [page, setPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const prevPageNumber = useRef(currentPage);
  const [errorStyle, setErrorStyle] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [debouncedWidth, setDebouncedWidth] = useState(0);

  useEffect(() => {
    const debouncedResizeHandler = _.debounce((newWidth) => {
      setDebouncedWidth(newWidth);
    },1000);
    if (width !== undefined) {
      debouncedResizeHandler(width);
    }
    return () => {
      debouncedResizeHandler.cancel();
    }
  }, [width]);

  const inputValidator = z.object({
    pageNumber: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= page!),
  });

  type TypeOfInputValidator = z.infer<typeof inputValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TypeOfInputValidator>({
    defaultValues: {
      pageNumber: "1",
    },
    resolver: zodResolver(inputValidator),
  });

  const handleSubmitPage = ({ pageNumber }: TypeOfInputValidator) => {
    setCurrentPage(Number(pageNumber));
    setValue("pageNumber", String(pageNumber));
  };
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (pageRefs.current[currentPage - 1]) {
      pageRefs.current[currentPage - 1]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);
  
  const zoomSize = [0.5, 0.8, 1, 1.5, 2, 2.5];

  return (
    <div className="pdfviewr w-full h-[calc(100vh-7rem)]">
      <div className="top-0 h-10 w-full flex items-center justify-between gap-2 min-w-[470px]">
        <Button
          disabled={currentPage <= 1 ? true : false}
          onClick={() => {
            const newPageNumber = currentPage - 1 > 1 ? currentPage - 1 : 1;
            setCurrentPage(newPageNumber);
            setValue("pageNumber", String(newPageNumber));
          }}
          variant={"ghost"}
          aria-label="previous page"
        >
          <IoChevronDown />
        </Button>
        <div className="flex justify-center  items-center gap-1">
          <input
            {...register("pageNumber")}
            className={cn(
              " text-center w-12 h-8 flex rounded-md border px-3 py-2 text-sm ring-offset-black file:border-0 file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
              errors.pageNumber
                ? "border-red-500 ring-offset-red-700"
                : "border-black",
              errorStyle
            )}
            onFocus={(e) => {
              prevPageNumber.current = Number(e.target.value);
              setValue("pageNumber", "");
            }}
            onBlur={(e) => {
              if (e.target.value === "")
                setValue("pageNumber", String(currentPage));
            }}
            onMouseLeave={(e) => {
              e.currentTarget.blur();
            }}
            onChange={(e) => {
              const newPageNumber = e.target.value;
              if (
                inputValidator.safeParse({ pageNumber: newPageNumber }).success
              ) {
                handleSubmitPage({ pageNumber: newPageNumber });
                setErrorStyle("");
              } else {
                setErrorStyle("border-red-500 ring-offset-red-700");
                errors.pageNumber
                  ? setErrorStyle("border-red-500 ring-offset-red-700")
                  : "";
              }
            }}
          />
          <p className="text-sm space-x-2">
            <span>/</span>
            <span>
              {page ?? <ClipLoader size={20} color="#ff30c9" loading /> }
            </span>
          </p>
        </div>
        <Button
          disabled={page === undefined || currentPage === page}
          onClick={() => {
            const newPageNumber =
              currentPage + 1 > page! ? page : currentPage + 1;
            setCurrentPage(newPageNumber!);
            setValue("pageNumber", String(newPageNumber));
          }}
          variant={"ghost"}
          aria-label="previous page"
        >
          <IoIosArrowUp />
        </Button>
         
         
         
        <div className="space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Zoom">
                <TiZoomInOutline className=" text-xl " />
                &nbsp;
                {scale * 100} % &nbsp; <IoChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {zoomSize.map((size, index) => (
              <DropdownMenuItem 
                key={index}
                onSelect={() => {
                  setScale(size);
                }}
              >
                {size * 100} %
              </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
          variant={'ghost'}
            onClick={() => setRotation((prev) => prev + 90)}
            aria-label="Rotate"
          >
            <FaArrowRotateRight size={20} className="text-xl" />
          </Button>
          <DocFullScreenViewer fileUrl={docUrl} />
        </div>
      </div>
      <div className={`w-full h-full overflow-y-auto mr-5 ${Styles.chatscroll}`}>
      <div ref={ref} className="flex-1 w-full max-h-screen">
        <div  className='relative -z-10'>
          <Document
            loading={
              <div className=" flex items-center justify-center h-screen">
                <HashLoader color="#f05eb9" loading />
              </div>
            }
            onLoadError={(error) => {
              return <div className=" flex items-center justify-center h-screen">
                <FormError message={(error as Error).message} />
                <p className="text-red">Fail to load document!</p>
              </div>;
            }}
            onLoadSuccess={({ numPages }) => {
              setPage(numPages);
              setPageNum(numPages);
            }}
            file={docUrl}
            className="max-h-full space-y-2 "
          >
            {new Array(pageNum).fill(0).map((_, i) => (
              <div
                ref={(ref) => {pageRefs.current[i] = ref;}}
                key={i}
                className="relative rounded"
              >
                <div className="absolute bg-slate-600 px-1 text-xs rounded-sm top-4 left-5 z-10 text-white">
                  {i + 1}
                </div>
                <Page
                 width={debouncedWidth}
                  pageNumber={i + 1}
                  scale={scale}
                  rotate={rotation}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { Divider } from "./divider";
import { Tooltip } from "react-tooltip";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { GoInfo } from "react-icons/go";
import { Input } from "./ui/input";
import Styles from "@/app/(x)/chat/chat.module.css";

interface AspectRatio {
  [key: string]: {
    tip: string;
    width: number;
    height: number;
  };
}

export const RightBar = ({
  setSelectedRatio,
  cfg_scale,
  setCfgScale,
  weight,
  setWeight,
  steps,
  setSteps,
  seed,
  setSeed,
  samples,
  setSamples,
  sampler,
  setSampler,
  clipGuidancePreset,
  setClipGuidancePreset,
  stylePreset,
  setStylePreset
}: {
  setSelectedRatio: (value: {
    tip: string;
    width: number;
    height: number;
  }) => void;
  cfg_scale: number;
  setCfgScale: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  steps: number;
  setSteps: (value: number) => void;
  seed: number;
  setSeed: (value: number) => void;
  samples: number;
  setSamples: (value: number) => void;
  sampler: string;
  setSampler: (value: string) => void;
  clipGuidancePreset: string;
  setClipGuidancePreset: (value: string) => void;
  stylePreset: string;
  setStylePreset: (value: string) => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const aspectRatio: AspectRatio = {
   "1:1": { tip: "1024 X 1024", width: 1024, height: 1024 },
   "5:4": { tip: "1152 X 896", width: 1152, height: 896 },
   "3:2": { tip: "1216 X 832", width: 1216, height: 832 },
   "16:9": { tip: "1344 X 768", width: 1344, height: 768 },
   "21:9": { tip: "1536 X 640", width: 1536, height: 640 },
   "9:16": { tip: "640 X 1536", width: 640, height: 1536 },
   "4:5": { tip: "896 X 1152", width: 896, height: 1152 },
   "2:3": { tip: "832 X 1216", width: 832, height: 1216 },
   "16:9 S": { tip: "768 X 1344", width: 768, height: 1344 }
 };
//   1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, 896x1152

  const samplers = [
    "DDIM",
    "DDPM",
    "K_DPMPP_2M",
    "K_DPMPP_2S_ANCESTRAL",
    "K_DPM_2",
    "K_DPM_2_ANCESTRAL",
    "K_EULER",
    "K_EULER_ANCESTRAL",
    "K_HEUN",
    "K_LMS",
  ];

  const clip_guidance_preset = [
    "NONE",
    "FAST_BLUE",
    "FAST_GREEN",
    "SIMPLE",
    "SLOW",
    "SLOWER",
    "SLOWEST",
  ];

  const style_preset = [
    "none",
    "photographic",
    "3d-model",
    "analog-film",
    "anime",
    "cinematic",
    "comic-book",
    "digital-art",
    "enhance",
    "fantasy-art",
    "isometric",
    "line-art",
    "low-poly",
    "modeling-compound",
    "neon-punk",
    "origami",
    "pixel-art",
    "tile-texture",
  ];
  return (
    <div
      className={` relative h-full border dark:border-neutral-700 rounded-md p-2 transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden ${Styles.chatscroll} ${
        isCollapsed ? "w-10 overflow-hidden" : " w-[30rem]"
      }`}
    >
      <button onClick={toggleCollapse} className="top-1 left-1 text-2xl">
        {isCollapsed ? (
          <TbLayoutSidebarLeftCollapseFilled />
        ) : (
          <TbLayoutSidebarRightCollapseFilled />
        )}
      </button>
      <Divider className="w-full" />
      <div className={`${isCollapsed ? 'hidden ': ""} w-full`}>
      <div className={`${isCollapsed ? "hidden" : ""} w-full flex-wrap`}>
        <h6 className="py-2 mb-2">Image Size</h6>
        <RadioGroup
          defaultValue="1:1"
          className="grid grid-cols-4 items-center"
          onValueChange={(value) => {
            const v = aspectRatio[value];
            setSelectedRatio(v);
          }}
        >
          {Object.entries(aspectRatio).map(([ratio, value], index) => (
            <div className="flex mb-1" key={index}>
              <RadioGroupItem value={ratio} id={ratio} />
              &nbsp;
              <Label
                htmlFor={ratio}
                data-tooltip-id={ratio}
                data-tooltip-content={value.tip ? value.tip : ""}
              >
                {ratio}
              </Label>
              <Tooltip id={ratio} />
            </div>
            // <div className="" key={index}>{ratio}</div>
          ))}
        </RadioGroup>
      </div>

      <div className="w-full">
        <h6 className="py-2 mt-2">Sample Images</h6>
        <div className="flex items-center space-x-2">
          <span>
            <GoInfo
              className="cursor-pointer mx-4 text-md"
              data-tooltip-id="sampleImageTip"
            />
          </span>
          <Input
            id="width"
            type="number"
            max={10}
            min={1}
            defaultValue={samples}
            className="col-span-2 h-8"
            onChange={(e) => {
              setSamples(parseInt(e.target.value));
            }}
          />
        </div>
        <Tooltip id="sampleImageTip">
          <p>Number of images to generate</p>
          <p>Minimum 1 , Maximum 10</p>
        </Tooltip>
      </div>
      <div className="w-full grid grid-cols-2">
        <div className="w-full flex flex-col justify-center items-center">
          <h6 className=" mt-2 text-sm text-nowrap">Diffusion Steps</h6>
          <div className="flex items-center w-full">
            <span>
              <GoInfo
                className="cursor-pointer mx-4 text-md"
                data-tooltip-id="steps"
              />
            </span>
            <Input
              id="width"
              type="number"
              max={50}
              min={10}
              defaultValue={steps}
              className="col-span-2 h-8"
              onChange={(e) => {
                setSteps(parseInt(e.target.value));
              }}
            />
          </div>
          <Tooltip id="steps" className="z-10">
            <p>Number of steps to denoise the image.</p>
            <p>Minimum 10, Maximum 50</p>
          </Tooltip>
        </div>
        <div className="w-full flex flex-col justify-center items-center relative">
          <h6 className=" mt-2 text-sm">Seed</h6>
          <div className="flex items-center w-full ">
            <span>
              <GoInfo
                className="cursor-pointer mx-4 text-md"
                data-tooltip-id="seed"
              />
            </span>
            <Input
              id="width"
              type="number"
              max={4294967295}
              min={0}
              defaultValue={seed}
              className="col-span-2 h-8"
              onChange={(e) => {
                setSeed(parseInt(e.target.value));
              }}
            />
          </div>
          <Tooltip id="seed" className=" overflow-hidden" place="left-start">
            <p>
              Random noise seed <br />( omit this option or use 0 for a random
              seed )
            </p>
            <p>[0 ..4294967295]</p>
            <p>Tip :  Keep the seed same for generating similar <br/> images.</p>
          </Tooltip>
        </div>
        <div className="w-full flex flex-col justify-center items-center relative">
          <h6 className="mt-2 text-sm">Weigth</h6>
          <div className="flex items-center w-full ">
            <span>
              <GoInfo
                className="cursor-pointer mx-4 text-md"
                data-tooltip-id="weight"
              />
            </span>
            <Input
              id="width"
              type="number"
              step={0.1}
              max={1}
              min={0}
              defaultValue={weight}
              className="col-span-2 h-8"
              onChange={(e) => {
                setWeight(parseFloat(e.target.value));
              }}
            />
          </div>
          <Tooltip id="weight" className=" overflow-hidden z-10" place="left-start">
            <p>
              Add Weight between 1 and 0
            </p>
          </Tooltip>
        </div>
        <div className="w-full flex flex-col justify-center items-center relative">
          <h6 className="mt-2 text-sm">Configuration Scale</h6>
          <div className="flex items-center w-full ">
            <span>
              <GoInfo
                className="cursor-pointer mx-4 text-md"
                data-tooltip-id="cfg"
              />
            </span>
            <Input
              id="width"
              type="number"
              max={35}
              min={0}
              defaultValue={cfg_scale}
              className="col-span-2 h-8"
              onChange={(e) => {
               setCfgScale(parseInt(e.target.value));
              }}
            />
          </div>
          <Tooltip id="cfg" className=" overflow-hidden" place="left-start">
            <p>
            How strictly the diffusion process adheres to the <br/> prompt text (higher values keep your image <br/> closer to your prompt)
            </p>
          </Tooltip>
        </div>
      </div>

      {/* s */}
      <div className="w-full flex-wrap">
        <h6 className="py-2 mt-2 flex items-center justify-between w-full ">
          Style Preset{" "}
          <GoInfo
            className="cursor-pointer mx-4"
            data-tooltip-id="stylePreset"
            data-tooltip-content="A style preset to guide the image model towards a particular style."
          />
        </h6>
        <Tooltip id="stylePreset" />
        <RadioGroup
          defaultValue={stylePreset}
          className="grid grid-cols-3 items-center"
          onValueChange={(value) => setStylePreset(value)}
        >
          {style_preset.map((style, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <span>
                {" "}
                <RadioGroupItem
                  className="w-4"
                  value={style}
                  key={index}
                  id={style}
                />
              </span>
              <Label
                className=" px-1 shadow shadow-neutral-700  text-xs rounded"
                htmlFor={style}
                data-tooltip-id={style}
                data-tooltip-content={style}
              >
                {style}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="w-full flex-wrap">
        <h6 className="py-2 mt-2 flex items-center justify-between w-full">
          Clip Guidance Preset
        </h6>
        <RadioGroup
          defaultValue={clipGuidancePreset}
          className="grid grid-cols-3 items-center"
          onValueChange={(value) => setClipGuidancePreset(value)}
        >
          {clip_guidance_preset.map((style, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <span>
                {" "}
                <RadioGroupItem
                  className="w-4"
                  value={style}
                  key={index}
                  id={style}
                />
              </span>
              <Label
                className="px-1 shadow shadow-neutral-700  text-xs rounded"
                htmlFor={style}
                data-tooltip-id={style}
                data-tooltip-content={style}
              >
                {style}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="w-full flex-wrap">
        <h6 className="py-2 mt-2 flex items-center justify-between w-full">
          Sampler
        </h6>
        <RadioGroup
          defaultValue={sampler}
          className="grid grid-cols-3 items-center"
          onValueChange={(value) => setSampler(value)}
        >
          {samplers.map((style, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <span>
                {" "}
                <RadioGroupItem
                  className="w-4"
                  value={style}
                  key={index}
                  id={style}
                />
              </span>
              <Label
                className="px-1 shadow shadow-neutral-700  text-xs rounded"
                htmlFor={style}
                data-tooltip-id={style}
                data-tooltip-content={style}
              >
                {style.replaceAll("_", " ")}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      </div>
    </div>
  );
};

import React from "react";
import { TbCopy } from "react-icons/tb";
import SocialStyle from './social.module.css'
import { MdOutlineClose } from "react-icons/md";

import {
  FacebookMessengerShareButton,
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import SocialPNG, { SocialSVG } from "./socials";
import {
  EmailIcon,
  FacebookIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkdinIcon,
  LivejournalIcon,
  MailruIcon,
  MessengerIcon,
  OkIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  VKIcon,
  ViberIcon,
  WhatsAppIcon,
  WorkplaceIcon,
} from "./socialIcons";

interface ShareProps {
   shareUrl: string;
   cloudUrl: string;
   setShare : (v: string)=> void;
 }
 

const Share = React.forwardRef<HTMLDivElement, ShareProps>((props, ref) => {
   const { shareUrl, cloudUrl, setShare } = props;
  // console.log(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!)
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    try {
      setCopied(true);
      await navigator.clipboard.writeText(shareUrl);
      console.log("Share URL copied to clipboard");
    } catch (err) {
      console.log("Failed to copy: ", err);
    }
  };

  const title = "AI Magic: See the Incredible Image Generated by AI Flavoured!";
  // const text = "Look at this awesome image I just made using AI Flavoured! The possibilities are endless with AI creativity. You should try it and share your own creations! #AIFlavoured #AICreativity #AIArt";
  return (
    <>
      <div ref={ref} 
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
      className="grid grid-cols-6 space-x-5 space-y-5 space pb-5 pr-5 rounded-md absolute z-10  backdrop-blur-xl items-center justify-center ">
        <MdOutlineClose className="absolute top-1 right-1 cursor-pointer" onClick={()=>setShare("")} />

        <div
          onClick={handleCopy}
          className={`h-8 w-8 mb-[2px] cursor-pointer shadow-neutral-900 shadow-sm dark:shadow-white rounded-full self-end flex items-center justify-self-end justify-center backdrop-blur-md flex-grow ${SocialStyle.slideInFromTop}`}
        >
          <TbCopy
            className={`${copied ? "text-green-700 text-lg" : "text-xl"} `}
          />
        </div>

        <FacebookShareButton url={shareUrl} title={title}>
          <div className={`backdrop-blur-sm w-8 rounded-md ${SocialStyle.slideInFromTop}`}>
            <FacebookIcon />
          </div>
        </FacebookShareButton>

        <FacebookMessengerShareButton
          url={shareUrl}
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
        >
         <div className={SocialStyle.slideInFromTop}>
          <MessengerIcon />
         </div>
        </FacebookMessengerShareButton>
        <WhatsappShareButton url={shareUrl}>
          <div className={`relative ${SocialStyle.slideInFromTop}`}>
            <div className=" absolute top-1 left-1 bg-white h-6 w-6 -z-10" />
            <WhatsAppIcon />
          </div>
        </WhatsappShareButton>
        <PinterestShareButton url={shareUrl} media={cloudUrl}>
        <div className={SocialStyle.slideInFromTop}>
          <PinterestIcon size={35} />
        </div>
        </PinterestShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
        <div className={SocialStyle.slideInFromRight}>
          <LinkdinIcon classNameForBg="backdrop-blur-md bg-blue-500" />
         </div>
        </LinkedinShareButton>

        <TelegramShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromLeft}>  
          <TelegramIcon color="#7330d8" />
         </div>
        </TelegramShareButton>
        <TwitterShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromLeft}>  
          <TwitterIcon classNameForBg="bg-blue-500 rounded-full" />
         </div>
        </TwitterShareButton>
        <TumblrShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromLeft}>  
          <TumblrIcon />
         </div>
        </TumblrShareButton>
        <ViberShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromRight}>  
          <ViberIcon />
         </div>
        </ViberShareButton>
        <VKShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromRight}>  
          <VKIcon color="#c108de" />
         </div>
        </VKShareButton>
        <GabShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromRight}>  
          <GabIcon />
         </div>
        </GabShareButton>
        <HatenaShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromLeft}>  
          <HatenaIcon classNameForBg=" rounded-full" />
         </div>
        </HatenaShareButton>
        <InstapaperShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromLeft}>  
          <InstapaperIcon />
         </div>
        </InstapaperShareButton>
        <LineShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromBottom}>  
          <LineIcon color="#12a507" />
         </div>
        </LineShareButton>
        <LivejournalShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromBottom}>  
          <LivejournalIcon />
         </div>
        </LivejournalShareButton>
        <MailruShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromBottom}>  
          <MailruIcon />
         </div>
        </MailruShareButton>
        <OKShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromRight}>  
          <OkIcon />
         </div>
        </OKShareButton>
        <PocketShareButton url={shareUrl}>
        <div className={SocialStyle.slideInFromBottom}>  
          <PocketIcon />
         </div>
        </PocketShareButton>
        <RedditShareButton url={shareUrl} title={title}>
        <div className={SocialStyle.slideInFromBottom}>
          <RedditIcon classNameForBg="#d60113" />
         </div>
        </RedditShareButton>
        <WorkplaceShareButton url={shareUrl} >
        <div className={SocialStyle.slideInFromBottom}>
          <WorkplaceIcon />
         </div>
        </WorkplaceShareButton>
        <EmailShareButton url={shareUrl} title={title}>
        <div className={SocialStyle.slideInFromBottom}>
          <EmailIcon />
          </div>
        </EmailShareButton>
      </div>
    </>
  );
});
Share.displayName = "Share";
export default Share;

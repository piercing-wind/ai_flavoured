import React from "react";
import Head from 'next/head';
import {
   EmailIcon,
   FacebookIcon,
   GabIcon,
   HatenaIcon,
   InstapaperIcon,
   LineIcon,
   LinkedinIcon,
   LivejournalIcon,
   MailruIcon,
   OKIcon,
   PinterestIcon,
   PocketIcon,
   RedditIcon,
   TelegramIcon,
   TumblrIcon,
   TwitterIcon,
   ViberIcon,
   VKIcon,
   WhatsappIcon,
   WorkplaceIcon,
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

const Share = ({imagePath} : {imagePath: string}) => {
   
   // const shareUrl = `${process.env.WEBSITE_URL!}${imagePath}`;
   const shareUrl = imagePath;
   // console.log(shareUrl);
   const title = "Check out this amazing AI image I created with AI Flavoured! 😃"
   const text = "Look at this awesome image I just made using AI Flavoured! The possibilities are endless with AI creativity. You should try it and share your own creations! #AIFlavoured #AICreativity #AIArt";

   return (
      <>
      <div>
         <EmailShareButton url={shareUrl} subject={title} body={text}>
            <EmailIcon size={32} round />
         </EmailShareButton>
         <FacebookShareButton url={shareUrl} hashtag={text}>
            <FacebookIcon size={32} round />
         </FacebookShareButton>
         <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
         </WhatsappShareButton>
         <GabShareButton url={shareUrl} title={title}>
            <GabIcon size={32} round />
         </GabShareButton>
         <HatenaShareButton url={shareUrl} title={title}>
            <HatenaIcon size={32} round />
         </HatenaShareButton>
         <InstapaperShareButton url={shareUrl} title={title} description={text}>
            <InstapaperIcon size={32} round />
         </InstapaperShareButton>
         <LineShareButton url={shareUrl} title={title}>
            <LineIcon size={32} round />
         </LineShareButton>
         <LinkedinShareButton url={shareUrl} title={title} summary={text}>
            <LinkedinIcon size={32} round />
         </LinkedinShareButton>
         <LivejournalShareButton url={shareUrl} title={title} description={text}>
            <LivejournalIcon size={32} round />
         </LivejournalShareButton>
         <MailruShareButton url={shareUrl} title={title} description={text}>
            <MailruIcon size={32} round />
         </MailruShareButton>
         <OKShareButton url={shareUrl} title={title}>
            <OKIcon size={32} round />
         </OKShareButton>
         <PinterestShareButton url={shareUrl} media={shareUrl} description={text}>
            <PinterestIcon size={32} round />
         </PinterestShareButton>
         <PocketShareButton url={shareUrl} title={title}>
            <PocketIcon size={32} round />
         </PocketShareButton>
         <RedditShareButton url={shareUrl} title={title}>
            <RedditIcon size={32} round />
         </RedditShareButton>
         <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={32} round />
         </TelegramShareButton>
         <TumblrShareButton url={shareUrl} title={title} caption={text}>
            <TumblrIcon size={32} round />
         </TumblrShareButton>
         <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
         </TwitterShareButton>
         <ViberShareButton url={shareUrl} title={title}>
            <ViberIcon size={32} round />
         </ViberShareButton>
         <VKShareButton url={shareUrl} title={title}>
            <VKIcon size={32} round />
         </VKShareButton>
         <WorkplaceShareButton url={shareUrl} quote={text}>
            <WorkplaceIcon size={32} round />
         </WorkplaceShareButton>
      </div>
     </>
   );
};

export default Share;
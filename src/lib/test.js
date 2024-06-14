const slide = `[
   {
     "titleSlide": {
       "title": "Customs Excise & Service Tax Appellate Tribunal",
       "body": "Case Overview: Customs Appeal No. 20132 - 20135 of 2023"
     }
   },
   {
     "sectionHeader": {
       "title": "Introduction",
       "body": "Overview of the Case and Key Parties Involved"
     }
   },
   {
     "titleAndContent": {
       "title": "Case Background",
       "body": [
         "The case involves the valuation of imported goods by Page Industries Ltd.",
         "Page Industries is the sole distributor of Jockey International USA and Speedo International UK.",
         "The dispute centers around the addition of royalty and advertisement costs to the transaction value."
       ]
     }
   },
   {
     "twoContent": {
       "title": "Key Parties",
       "content": [
         "Appellant: Page Industries Ltd.",
         "Respondent: Commissioner of Customs, Bangalore"
       ],
       "content2": [
         "Representatives:",
         "Mr. D.B. Shroff, Advocate",
         "Mr. Sanjeev Nair, Advocate",
         "Ms. Rukmani Menon, Advocate"
       ]
     }
   },
   {
     "comparison": {
       "title": "Customs Valuation Rules 2007",
       "subheading": "Rule 10(1)(c)",
       "subheading2": "Rule 10(1)(e)",
       "content": [
         "Royalty directly related to imported goods",
         "Royalty paid by buyer to seller",
         "Royalty as a condition of sale",
         "Royalty not included in the value of imported goods",
         "Applicable to both licensed and distributed products"
       ],
       "content2": [
         "Advertisement costs related to imported goods",
         "Costs incurred by buyer for seller's benefit",
         "Costs as a condition of sale",
         "Costs not included in the transaction value",
         "Applicable to post-import activities"
       ]
     }
   },
   {
     "titleOnly": {
       "title": "Visual Representation of Case",
       "picture": "A courtroom with legal representatives presenting a case"
     }
   },
   {
     "contentWithCaption": {
       "title": "Appellant's Arguments",
       "content": [
         "Royalty already taxed under IGST",
         "No evidence of higher contemporaneous sales",
         "Royalty not directly related to imported goods",
         "No cogent reason for invoice price rejection",
         "Royalty paid to third parties not included in transaction value"
       ],
       "caption": "Key points presented by the appellant's counsel"
     }
   },
   {
     "pictureWithCaption": {
       "title": "Legal Precedents",
       "picture": "A stack of legal books and a gavel",
       "caption": [
         "CC (Imports), Mumbai Vs Bayer Corp Science Ltd (2015)",
         "M/s Indo Rubber & Plastics Works Vs CC, New Delhi (2020)",
         "M/s Kruger Ventilation Indus Vs CC (2022)",
         "M/s Sandvik Asia Pvt Ltd Vs CC (2015)"
       ]
     }
   },
   {
     "team": {
       "title": "Tribunal Members",
       "first": {
         "name": "Hon'ble Mr. P.A. Augustian",
         "picture": "A judge in a courtroom"
       },
       "second": {
         "name": "Hon'ble Ms. R. Bhagya Devi",
         "picture": "A female judge in a courtroom"
       },
       "third": {
         "name": "Mr. K.A. Jathin",
         "picture": "A legal representative presenting a case"
       }
     }
   },
   {
     "titleAndContent": {
       "title": "Respondent's Arguments",
       "body": [
         "Royalty and advertisement costs are part of transaction value",
         "Payment of royalty is a condition for sale",
         "Advertisement costs are not post-sale events",
         "Royalty related to imported goods",
         "Appellant and suppliers are related parties"
       ]
     }
   },
   {
     "pictureWithCaption": {
       "title": "Tribunal's Final Order",
       "picture": "A judge's gavel striking a sound block",
       "caption": "The Tribunal set aside the impugned order and allowed the appeals with consequential reliefs."
     }
   },
   {
     "contentWithCaption": {
       "title": "Key Findings",
       "content": [
         "Royalty not related to imported raw materials",
         "Advertisement costs are post-import activities",
         "No evidence of related parties",
         "No justification for extended period invocation",
         "Appellant's claims justified based on legal precedents"
       ],
       "caption": "Summary of the Tribunal's key findings"
     }
   },
   {
     "blank": {
       "picture": "A legal document with highlighted sections"
     }
   },
   {
     "titleOnly": {
       "title": "Case Conclusion",
       "picture": "A handshake between two legal representatives"
     }
   },
   {
     "titleSlide": {
       "title": "Thank You",
       "body": "For more information, please contact us."
     }
   }
 ]
 `;
 const slideImage = [
   {
     picture: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
     slideNumber: 6
   },
   { picture: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg', slideNumber: 8 },
   { picture: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', slideNumber: 9 },
   { picture: 'https://sm.mashable.com/t/mashable_me/photo/default/new-project-1_tecm.1248.jpg', slideNumber: 9 },
   {
     picture: 'https://img.freepik.com/premium-photo/female-character-photo-ai-generated_980993-1160.jpg?w=360',slideNumber: 9
   },
   {
     picture: "https://img.freepik.com/premium-photo/highly-detailed-3d-character-with-futuristic-cyberpunk-aesthetic-standing-dynamic-pose-w_979520-28690.jpg",
     slideNumber: 11
   },
   {
     picture: 'https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
     slideNumber: 13
   },
   {
     picture: 'https://www.befunky.com/images/prismic/1f427434-7ca0-46b2-b5d1-7d31843859b6_funky-focus-red-flower-field-after.jpeg?auto=avif,webp&format=jpg&width=863',
     slideNumber: 14
   }
 ]

 const data = { 
   author : "Sourabh",
   title : "biomePresentationTheme",
   pptxData : slide,
   imageSearch : "Google Search",
   modelForColorAndTitle : "gpt-3.5-turbo-0125",
   waterMark : true
 }

 const res = await storePresentationData(data, "clx8n25is00011ggo83qpnxhw", JSON.stringify(slideImage));
 // console.log("clickers")
 // //  await presentation(data);  *
 //   // await facetThemePresentation(data);   
   // const res =  await ppPartyThemePresentation(data,slideImage);  
 // //  await darkThemeMoonPresentation(data);  *
 //   // await minimalistSalePitchThemePresentation(data);  
 //   // await scientificBluePresentationTheme(data);   *
 // //  await biomePresentationTheme(data);
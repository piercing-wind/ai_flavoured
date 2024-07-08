export type Theme = {
    name: string;
    function: string;
    pathSvg: string;
    pathPdf: string;
    variant?: {
      green?: string;
      blue?: string;
      pink?: string;
    };
  }
export type DisplayTheme = Theme[];

const cloudFrontUrl = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL;
export const displayThemes : DisplayTheme = [
   {
     name : "Scientific Findings",
     function : 'scientificBluePresentationTheme',
     pathSvg : cloudFrontUrl + "/public/displayThemes/scientific_findings_presentation.svg",
     pathPdf : cloudFrontUrl + "/public/displayThemes/scientific_findings_presentation.pdf"
   },
   {
     name : 'Powerpoint party',
     function : 'ppPartyThemePresentation',
     pathSvg : cloudFrontUrl + "/public/displayThemes/ppPartyTheme.svg",
     pathPdf : cloudFrontUrl + "/public/displayThemes/ppPartyTheme.pdf"
   },
   {
     name : 'Minimalist Sale Pitch',
     function : 'minimalistSalePitchThemePresentation',
     pathSvg : cloudFrontUrl + "/public/displayThemes/minimalistSalePitchTheme.svg",
     pathPdf : cloudFrontUrl + "/public/displayThemes/minimalistSalePitchTheme.pdf"
   },
   {
     name : "Biome Theme",
     function : 'biomePresentationTheme',
     pathSvg : cloudFrontUrl + "/public/displayThemes/biomePresentationTheme.svg",
     pathPdf : cloudFrontUrl + "/public/displayThemes/biomePresentationTheme.pdf"
   },
   {
     name : "Dark Theme Moon",
     function : 'darkThemeMoonPresentation',
     pathSvg : cloudFrontUrl + "/public/displayThemes/darkThemeMoonPresentation.svg",
     pathPdf : cloudFrontUrl + "/public/displayThemes/darkThemeMoonPresentation.pdf"
   },
   {
     name: 'Facet Theme',
     function : 'facetThemePresentation',
     pathSvg : cloudFrontUrl + "/public/displayThemes/facetThemePresentation.svg",
     pathPdf : cloudFrontUrl + "/public/displayThemes/facetThemePresentation.pdf",
     variant : {
      green : cloudFrontUrl + "/public/facetTheme/facetGreen.svg",
      blue : cloudFrontUrl + "/public/facetTheme/facetBlue.svg",
      pink : cloudFrontUrl + "/public/facetTheme/facetPink.svg"
     }
   },
  ]

export const displayThemes1: DisplayTheme = [
   {
      name: "Dark Theme Moon",
      function: 'darkThemeMoonPresentation',
      pathSvg: cloudFrontUrl + "/public/displayThemes/darkThemeMoonPresentation.svg",
      pathPdf: cloudFrontUrl + "/public/displayThemes/darkThemeMoonPresentation.pdf"
   },
   {
      name: 'Powerpoint party',
      function: 'ppPartyThemePresentation',
      pathSvg: cloudFrontUrl + "/public/displayThemes/ppPartyTheme.svg",
      pathPdf: cloudFrontUrl + "/public/displayThemes/ppPartyTheme.pdf"
   },
   {
      name: 'Facet Theme',
      function: 'facetThemePresentation',
      pathSvg: cloudFrontUrl + "/public/displayThemes/facetThemePresentation.svg",
      pathPdf: cloudFrontUrl + "/public/displayThemes/facetThemePresentation.pdf",
      variant: {
         green: cloudFrontUrl + "/public/facetTheme/facetGreen.svg",
         blue: cloudFrontUrl + "/public/facetTheme/facetBlue.svg",
         pink: cloudFrontUrl + "/public/facetTheme/facetPink.svg"
      }
   },
];
export const displayThemes2: DisplayTheme = [
   {
      name: 'Minimalist Sale Pitch',
      function: 'minimalistSalePitchThemePresentation',
      pathSvg: cloudFrontUrl + "/public/displayThemes/minimalistSalePitchTheme.svg",
      pathPdf: cloudFrontUrl + "/public/displayThemes/minimalistSalePitchTheme.pdf"
   },
];
export const displayThemes3: DisplayTheme = [
   {
      name: "Biome Theme",
      function: 'biomePresentationTheme',
      pathSvg: cloudFrontUrl + "/public/displayThemes/biomePresentationTheme.svg",
      pathPdf: cloudFrontUrl + "/public/displayThemes/biomePresentationTheme.pdf"
   },
   {
      name: "Scientific Findings",
      function: 'scientificBluePresentationTheme',
      pathSvg: cloudFrontUrl + "/public/displayThemes/scientific_findings_presentation.svg",
      pathPdf: cloudFrontUrl + "/public/displayThemes/scientific_findings_presentation.pdf"
   },
];


//   const themeFunctionMapping = {
//    'facetThemePresentation': aiSlidesForFacetThemePresentation,
//    'ppPartyThemePresentation': aiSlidesForFacetThemePresentation,
//    'darkThemeMoonPresentation': aiSlidesForFacetThemePresentation,

//    'minimalistSalePitchThemePresentation': aiSlidesForMinimalistSalePitchThemePresentation,

//    'biomePresentationTheme': aiSlidesForBiomePresentationTheme,
//    'scientificBluePresentationTheme': aiSlidesForBiomePresentationTheme,
//  };
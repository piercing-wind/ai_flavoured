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

export const displayThemes : DisplayTheme = [
    {
      name : "Scientific Findings",
      function : 'scientificBluePresentationTheme',
      pathSvg : "/displayThemes/scientific_findings_presentation.svg",
      pathPdf : "/displayThemes/scientific_findings_presentation.pdf"
    },
    {
      name : 'Powerpoint party',
      function : 'ppPartyThemePresentation',
      pathSvg : "/displayThemes/ppPartyTheme.svg",
      pathPdf : "/displayThemes/ppPartyTheme.pdf"
    },
    {
      name : 'Minimalist Sale Pitch',
      function : 'minimalistSalePitchThemePresentation',
      pathSvg : "/displayThemes/minimalistSalePitchTheme.svg",
      pathPdf : "/displayThemes/minimalistSalePitchTheme.pdf"
    },
    {
      name : "Biome Theme",
      function : 'biomePresentationTheme',
      pathSvg : "/displayThemes/biomePresentationTheme.svg",
      pathPdf : "/displayThemes/biomePresentationTheme.pdf"
    },
    {
      name : "Dark Theme Moon",
      function : 'darkThemeMoonPresentation',
      pathSvg : "/displayThemes/darkThemeMoonPresentation.svg",
      pathPdf : '/displayThemes/darkThemeMoonPeresentation.pdf'
    },
    {
      name: 'Facet Theme',
      function : 'facetThemePresentation',
      pathSvg : '/displayThemes/facetThemePresentation.svg',
      pathPdf : '/displayThemes/facetThemePresentation.pdf',
      variant : {
        green : '/facetTheme/facetGreen.svg',
        blue : '/facetTheme/facetBlue.svg',
        pink : '/facetTheme/facetPink.svg'
      }
    },
  ]

export const displayThemes1 : DisplayTheme=[
   {
      name : "Dark Theme Moon",
      function : 'darkThemeMoonPresentation',
      pathSvg : "/displayThemes/darkThemeMoonPresentation.svg",
      pathPdf : '/displayThemes/darkThemeMoonPresentation.pdf'
    },
   {
      name : 'Powerpoint party',
      function : 'ppPartyThemePresentation',
      pathSvg : "/displayThemes/ppPartyTheme.svg",
      pathPdf : "/displayThemes/ppPartyTheme.pdf"
    },
   {
      name: 'Facet Theme',
      function : 'facetThemePresentation',
      pathSvg : '/displayThemes/facetThemePresentation.svg',
      pathPdf : '/displayThemes/facetThemePresentation.pdf',
      variant : {
        green : '/facetTheme/facetGreen.svg',
        blue : '/facetTheme/facetBlue.svg',
        pink : '/facetTheme/facetPink.svg'
      }
    },
]
export const displayThemes2 : DisplayTheme=[
   {
      name : 'Minimalist Sale Pitch',
      function : 'minimalistSalePitchThemePresentation',
      pathSvg : "/displayThemes/minimalistSalePitchTheme.svg",
      pathPdf : "/displayThemes/minimalistSalePitchTheme.pdf"
    },
]
export const displayThemes3 : DisplayTheme=[
   {
      name : "Biome Theme",
      function : 'biomePresentationTheme',
      pathSvg : "/displayThemes/biomePresentationTheme.svg",
      pathPdf : "/displayThemes/biomePresentationTheme.pdf"
    },
    {
      name : "Scientific Findings",
      function : 'scientificBluePresentationTheme',
      pathSvg : "/displayThemes/scientific_findings_presentation.svg",
      pathPdf : "/displayThemes/scientific_findings_presentation.pdf"
    },
]


//   const themeFunctionMapping = {
//    'facetThemePresentation': aiSlidesForFacetThemePresentation,
//    'ppPartyThemePresentation': aiSlidesForFacetThemePresentation,
//    'darkThemeMoonPresentation': aiSlidesForFacetThemePresentation,

//    'minimalistSalePitchThemePresentation': aiSlidesForMinimalistSalePitchThemePresentation,

//    'biomePresentationTheme': aiSlidesForBiomePresentationTheme,
//    'scientificBluePresentationTheme': aiSlidesForBiomePresentationTheme,
//  };
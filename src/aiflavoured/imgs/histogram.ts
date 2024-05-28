'use server'
import jimp from 'jimp';

export const histogram = async (imagePath: string) : Promise<string> => {
      try {
            const image = await jimp.read(imagePath);
            const colours : any = {}
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
                  const red = this.bitmap.data[idx + 0];
                  const green = this.bitmap.data[idx + 1];
                  const blue = this.bitmap.data[idx + 2];
                  const alpha = this.bitmap.data[idx + 3];
                 
                  const colorKey = `${red}-${green}-${blue}-${alpha}`;
                  if (colours[colorKey]) {
                        colours[colorKey]++;
                  }else{
                        colours[colorKey] = 1;
                  }
                    });
            const sortedColors = Object.entries(colours as Record<string, number>).sort((a, b) => b[1] - a[1]); 
            const dominantColors : Array<{ r: number, g: number, b: number, a: number }> = sortedColors.slice(0, 4).map(color => {
                  const [r, g, b, a] = color[0].split('-').map(Number);
                  return { r, g, b, a };
                });   
           return JSON.stringify(dominantColors);     
      }
      catch (e) {
            console.log(e);
      }
      return '';
}
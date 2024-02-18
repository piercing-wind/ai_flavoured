import Animation from './particalsAnimation'
import Styles from './welcomeContent.module.css'
import AnimatedText from "./animatedTexts"
import {cn} from "../../../lib/utils";

const WelcomeContent = () => {
      const classNames = cn("text-2xl sm:text-3xl md:text-4xl  xl:text-4xl 2xl:text-4xl font-bold p-3", Styles.gradiantForText);
      const classNames2 = cn("text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold p-6", Styles.gradiantForText)
      return (
            <>
            
            <div className="flex flex-col items-center text-center p-6 lg:p-8 z-10 mt-10 relative" style={{height:'515px'}}>
            <div className='-z-10 absolute'><Animation /></div>
                  {/* <h1 className={cn("text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold p-6 mt-8", Styles.gradiantForText)} >Welcome to <span className={Styles.glowFont}>Ai Flavoured &nbsp; </span></h1> */}
                 <div className="object-contain absolute" >
                  <h4 className={cn(classNames2,"sm:mt-10 xl:mt-10", Styles.textGradient)}>Discover the Best AI</h4>
                    <div className={`${Styles.animationContainer},'h md:h-16 w-full flex justify-center items-center text-center'`}> 
                      <h4 className={Styles.colorForAnimatedText}>
                          <AnimatedText classNames={classNames2}/>
                      </h4>  
                    </div> 
                  <h4 className={cn(classNames2)}>With our <span className={Styles.glowFont}>Ai Flavoured &nbsp; </span> Now</h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-slate-50 mt-6">Transforming complexity into simplicity our AI makes understanding effortless.</p>
                  </div> 
            </div>
            </>
      );
};

export default WelcomeContent;
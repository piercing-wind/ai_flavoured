import {Header} from './(components)/header/header';
import {WelcomeContent} from "./(components)/particlesAndFrontMainContent/welcomeContent"
import {UserData} from './(components)/sessionData/userData'
const Home = () => {

  return (
    <>
      <Header/>
      <WelcomeContent />
      <UserData/>
    </> 
  );
}
export default Home;
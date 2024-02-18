import Header from './{components}/header/header';
import Welcome from "./{components}/particlesAndFrontMainContent/welcomeContent"
import {UserData} from './{components}/sessionData/userData'
const Home = () => {

  return (
    <>
      <Header/>
      <Welcome />
      <UserData/>
    </> 
  );
}
export default Home;
import AddHomeScreen from "@/components/AddToHomeScreen/AddToHomeScreen";
import InfiniteScrollDemo from "@/components/InfiniteScrollDemo";
import AddService from "@/components/add-service";
import Btn from "@/components/btn";

const Home = () => {
    
  return ( 
    <>
     <AddHomeScreen/>
    <Btn />
    <AddService />
    <InfiniteScrollDemo />
    </>
   );
}
 
export default Home;
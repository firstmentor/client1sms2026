import Footer from "./Footer";
import Header from "./Header";


const StudentLayout = ({ children }) => {
  return (
    <>
      <Header/>
      <main className="min-h-[80vh]">
        {children}
      </main>
      <Footer/>
    </>
  );
};

export default StudentLayout;

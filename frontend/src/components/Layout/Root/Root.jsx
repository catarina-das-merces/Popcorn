import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Root({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default Root;

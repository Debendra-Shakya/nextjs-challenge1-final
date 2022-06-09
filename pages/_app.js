import '../styles/globals.css'
// import { Provider } from 'react-redux'
import {wrapper} from "../store/store"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
function MyApp({ Component, pageProps }) {


  return <Component {...pageProps} />

}

export default wrapper.withRedux(MyApp);
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Spinner = () => {
    return (
        <div >
            <Loader
                type="Audio"
                color="#000"
                height={50}
                width={50}
                timeout={5000}
            />
        </div>
    );
};

export default Spinner;
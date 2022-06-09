import {Audio} from 'react-loader-spinner';
import styles from './Spinner.module.css'
const Spinner = () => {
    return (
        <div className={styles.spinnerWrapper}>
            <Audio
               
                color="#000"
                height={50}
                width={50}
                timeout={5000}
            />
        </div>
    );
};

export default Spinner;
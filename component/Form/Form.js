import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setForm } from '../../store/formSlice';
import { getTopTrack } from '../../store/topTrackSlice';
import styles from './Form.module.css'

const Form = () => {
 
  console.log('hello')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    
    const dispatch = useDispatch();
    const INITIAL_COUNTRY = useSelector((store) => store.form.country);
    const INITIAL_TOP_NUMBER = useSelector(
        (store) => store.form.topNumber
    );

    useEffect(() => {
        // dispatch(
        //     getTopArtists({
        //         country: INITIAL_COUNTRY,
        //         topNumber: INITIAL_TOP_NUMBER,
        //     })
        // );
        dispatch(
            getTopTrack({
                country: INITIAL_COUNTRY,
                topNumber: INITIAL_TOP_NUMBER,
            })
        );
    }, []);

    const onSubmit = (data) => {
        // dispatch(getTopArtists(data));
        dispatch(getTopTrack(data));
        dispatch(setForm(data));
    };

  
    return (
       
        <section>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputWrapper} >
                    <input
                        {...register('country', {
                            required: true,
                        })}
                        className={styles.input}
                        name="country"
                        type="text"
                        placeholder="Country name"
                        defaultValue={INITIAL_COUNTRY}
                    />

                    <input
                        {...register('topNumber', {
                            required: true,
                            min: 1,
                            max: 50,
                        })}
                        name="topNumber"
                       
                        type="number"
                        defaultValue={INITIAL_TOP_NUMBER}
                        placeholder="Top Number"
                    />
                </div>
                {errors.country && (
                    <div >
                        Country name must be required
                    </div>
                )}
                {errors.topNumber && (
                    <div >
                        Numbers must be between 0-50
                    </div>
                )}

                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default Form;

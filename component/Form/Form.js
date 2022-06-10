import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setForm } from '../../store/formSlice';
import { getTopTrack } from '../../store/topTrackSlice';
import { Section } from '../../styles/globalStyles';
import { Forms,InputWrapper,Input,Error,Button} from './FormStyles';

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
       
        <Section inverse="a" padding="0">
            <Forms onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper >
                    <Input
                        {...register('country', {
                            required: true,
                        })}
                        name="country"
                        type="text"
                        placeholder="Country name"
                        defaultValue={INITIAL_COUNTRY}
                    />

                    <Input
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
                </InputWrapper>
                {errors.country && (
                    <Error >
                        Country name must be required
                    </Error>
                )}
                {errors.topNumber && (
                    <Error >
                        Numbers must be between 0-50
                    </Error>
                )}

                <Button type="submit">
                    Submit
                </Button>
            </Forms>
        </Section>
    );
};

export default Form;

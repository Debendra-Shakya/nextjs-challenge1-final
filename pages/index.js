
import Form from "../component/Form/Form";
import Header from '../component/Header/Header';
import TopTrack from "../component/TopTrack/TopTrack";
import { Container } from "../styles/globalStyles";


export default function Home() {
    return (<Container>
            <Header title={'📈\u00A0\u00A0HIGHCHART CHALLENGE'} />
            <hr/>
            <Form />
            <TopTrack />
           
            </Container>
        
    );
}

import { Audio } from "react-loader-spinner";
import { SpinnerWrapper } from "./SpinnerStyles";
const Spinner = () => {
  return (
    <SpinnerWrapper>
      <Audio color="#000" height={100} width={50} timeout={5000} />
    </SpinnerWrapper>
  );
};

export default Spinner;

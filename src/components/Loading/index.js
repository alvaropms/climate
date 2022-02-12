import React, {useContext} from "react";
import { Opacity, StyledLoad } from "./Styles";
import { LoadContext } from "../../App";

const Loading = () => {
    const Load = useContext(LoadContext);

    return(
        <>
        <StyledLoad animation="border" variant="secondary" active={Load}/>
        <Opacity active={Load}/>
        </>
    );
}

export default Loading;
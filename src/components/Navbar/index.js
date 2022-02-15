import React, {useState} from "react";
import { Navbar, Button, Container, FormControl } from "react-bootstrap";
import { StyledForm, StyledInputGroup } from "./styles";
import { useQueryClient } from "react-query";

const MyNavbar = (props) => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    function changeCity(){
        props.cityRef.current = search

        queryClient.invalidateQueries(['climate'])
    }
    
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Climate</Navbar.Brand>
                <StyledForm>
                <StyledInputGroup>
                    <FormControl
                    placeholder="Pesquisar clima por cidade"
                    aria-label="Pesquisar clima por cidade"
                    aria-describedby="basic-addon2"
                    id="searchcity"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit" onClick={(e) => {e.preventDefault(); changeCity();}} variant="outline-secondary" id="button-addon2">
                    <i className="bi bi-search"></i>
                    </Button>
                </StyledInputGroup>
                </StyledForm>
            </Container>
        </Navbar>
        </>
    )
}

export default MyNavbar;
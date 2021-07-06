import React from "react";
import { Input, Button } from "semantic-ui-react";

const Searchbar = (props) => {
    return (
        <>
            <Input
                placeholder="search"
                fluid
                icon="search"
                value={props.value}
                onChange={props.onChange}
                loading={props.loading}
            />
            {props.searchResultNumber}{" "}
            {props.searchResultNumber === 1 ? "result" : "results"} found
            {props.value !== "" && (
                <Button onClick={props.clearSearch} compact basic size="tiny">
                    clear
                </Button>
            )}
        </>
    );
};

export default Searchbar;

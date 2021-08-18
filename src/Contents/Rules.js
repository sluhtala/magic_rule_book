import React, { useEffect, useState } from "react";
import {
    Item,
    Button,
    Icon,
    Accordion,
    Transition,
    Visibility,
} from "semantic-ui-react";
import RuleModal from "./RuleModal";

const Rule = ({ rule, activeIndex, id, setActiveIndex, rBook }) => {
    const titleLength = 30;
    const number = rule.substring(0, rule.indexOf(" "));
    const text = rule.substring(rule.indexOf(" ") + 1);
    const title = text.substring(0, titleLength);
    const [processedText, setProcessedText] = useState(null);

    const handleClick = () => {
        if (id === activeIndex) {
            setActiveIndex(-1);
        } else {
            setActiveIndex(id);
            processText(text);
        }
    };

    const processText = (text) => {
        const lines = text.split("\n");
        const pattern = /^[1-9][0-9][0-9]((\.([0-9]|$))|$)/;
        setProcessedText(
            lines.map((l, i) => (
                <div key={i}>
                    {l.split(/([ (,)])/).map((w, i) => {
                        return pattern.test(w) ? (
                            <RuleModal
                                key={i}
                                word={w}
                                rBook={rBook}
                                trigger={
                                    <Item
                                        as="a"
                                        style={{ cursor: "pointer" }}
                                        size="tiny">
                                        {w}
                                    </Item>
                                }
                            />
                        ) : (
                            w
                        );
                    })}
                </div>
            ))
        );
    };

    return (
        <>
            <Accordion.Title
                index={id}
                active={activeIndex === id}
                onClick={handleClick}>
                <Icon name="dropdown" />
                <b>{number}</b>
                {activeIndex !== id && (
                    <>
                        {" "}
                        {title}
                        {rule.length < titleLength ? "" : "..."}
                    </>
                )}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
                <Transition
                    duration={500}
                    animation="fade down"
                    visible={activeIndex === id}>
                    <div>{processedText}</div>
                </Transition>
            </Accordion.Content>
        </>
    );
};

const RuleLoader = ({ autoLoadMore, showMore, isLoading }) => (
    <Visibility
        onOnScreen={() => {
            autoLoadMore();
        }}
        continuous>
        <Button
            loading={isLoading}
            icon="arrow down"
            onClick={() => showMore()}
        />
    </Visibility>
);

const Rules = ({ rules, search, showMore, displayAmount, rBook }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [sliced, setSliced] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSliced(rules.slice(0, displayAmount));
        setIsLoading(false);
    }, [displayAmount, rules]);

    useEffect(() => {
        setActiveIndex(-1);
    }, [search]);

    const autoLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            showMore();
        }, 150);
    };

    return (
        <>
            <Accordion styled fluid>
                {sliced.map((r) => (
                    <Rule
                        key={r.id}
                        id={r.id}
                        rule={r.text}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        rBook={rBook}
                    />
                ))}
            </Accordion>
            {rules.length > displayAmount && (
                <RuleLoader
                    autoLoadMore={autoLoadMore}
                    showMore={showMore}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default Rules;

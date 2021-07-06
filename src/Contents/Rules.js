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
import { findRules } from "../services/utils";

const Rule = ({
    rule,
    activeIndex,
    id,
    setActiveIndex,
    rBook,
    modalRules,
    setModalRules,
}) => {
    const titleLength = 30;
    const number = rule.substring(0, rule.indexOf(" "));
    const text = rule.substring(rule.indexOf(" ") + 1);
    const title = text.substring(0, titleLength);

    const handleClick = () => {
        if (id === activeIndex) setActiveIndex(-1);
        else setActiveIndex(id);
    };

    const handleLinkClick = (word) => {
        const subRules = findRules(rBook.rules, parseInt(word));
        const dash = word.indexOf("-");
        if (dash === -1) {
            if (word[word.length - 1] === ".")
                word = word.substr(0, word.length - 1);
            setModalRules(
                subRules.filter((r) =>
                    r.text.substring(0, r.text.indexOf(" ")).includes(word)
                )
            );
        } else {
            if (isNaN(word[dash - 1])) {
                const len =
                    word[dash + 1].charCodeAt(0) -
                    word[dash - 1].charCodeAt(0) +
                    1;
                const index = subRules
                    .map((r) => r.text.substring(0, r.text.indexOf(" ")))
                    .indexOf(word.substr(0, dash));
                setModalRules(subRules.slice(index, index + len));
                return;
            }
            const from = parseInt(word.substring(word.indexOf(".") + 1, dash));
            const to = parseInt(word.substring(dash + 1));
            const base = word.substring(0, word.indexOf("."));
            const patterns = [];
            for (let i = from; i <= to; i++) {
                patterns.push(RegExp(`${base}[.]${i}`));
            }
            const newRules = subRules.filter((r) => {
                let isTrue = false;
                patterns.forEach((p) => {
                    if (p.test(r.text.substring(0, r.text.indexOf(" "))))
                        isTrue = true;
                });
                return isTrue;
            });
            setModalRules(newRules);
        }
    };

    const processText = (text) => {
        const lines = text.split("\n");
        const pattern = /[1-9][0-9]{2}(\.|\.([1-9])|$)/;
        return lines.map((l, i) => (
            <div key={i}>
                {l.split(/([ (,)])/).map((w, i) =>
                    pattern.test(w) ? (
                        <RuleModal
                            key={i}
                            rules={modalRules}
                            trigger={
                                <Item
                                    as="a"
                                    style={{ cursor: "pointer" }}
                                    size="tiny"
                                    onClick={() => handleLinkClick(w)}>
                                    {w}
                                </Item>
                            }
                        />
                    ) : (
                        w
                    )
                )}
            </div>
        ));
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
                    <div>{processText(text)}</div>
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

const Rules = ({ rules, setSearch, showMore, displayAmount, rBook }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [sliced, setSliced] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalRules, setModalRules] = useState([]);

    useEffect(() => {
        setSliced(rules.slice(0, displayAmount));
        setIsLoading(false);
    }, [displayAmount, rules]);

    const autoLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            showMore();
        }, 150);
    };

    return (
        <>
            <RuleModal />
            <Accordion styled fluid>
                {sliced.map((r) => (
                    <Rule
                        key={r.id}
                        id={r.id}
                        rule={r.text}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        setSearch={setSearch}
                        rBook={rBook}
                        modalRules={modalRules}
                        setModalRules={setModalRules}
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

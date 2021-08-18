import React, { useState, useEffect } from "react";
import { Container, Button, Header, Modal } from "semantic-ui-react";
import { findRules } from "../services/utils";

const ModalContent = (props) => {
    const [rule, setRule] = useState(props.rules[props.index]);
    const len = props.rules.length;

    useEffect(() => {
        setRule(props.rules[props.index]);
    }, [props.index, props.rules]);

    if (!rule) return "";
    const ruleNumber = rule.text.substring(0, rule.text.indexOf(" "));
    return (
        <>
            <Modal.Header>
                <Header>{ruleNumber}</Header>
            </Modal.Header>
            <Modal.Content>
                <Container text fluid>
                    {rule.text.substring(rule.text.indexOf(" "))}
                </Container>
            </Modal.Content>
            {len > 1 && (
                <Modal.Actions>
                    <Button
                        icon="arrow left"
                        disabled={props.index <= 0}
                        onClick={() => {
                            props.setIndex(props.index - 1);
                        }}
                    />
                    <Button
                        icon="arrow right"
                        disabled={props.index >= len - 1}
                        onClick={() => {
                            props.setIndex(props.index + 1);
                        }}
                    />
                </Modal.Actions>
            )}
        </>
    );
};

const RuleModal = ({ trigger, word, rBook }) => {
    const [index, setIndex] = useState(0);
    const [modalRules, setModalRules] = useState([]);

    useEffect(() => {
        setIndex(0);
    }, [word]);

    const findModalRules = () => {
        let w =
            word[word.length - 1] === "."
                ? word.slice(0, word.length - 1)
                : word;
        const subRules = findRules(rBook.rules, parseInt(w));
        const dashIndex = w.indexOf("-");
        if (dashIndex === -1) {
            setModalRules(
                subRules.filter((r) =>
                    r.text.substring(0, r.text.indexOf(" ")).includes(w)
                )
            );
        } else {
            const headerNum = w.substring(0, w.indexOf("."));
            const leftSide = w.substring(0, dashIndex);
            const rightSide = w.substring(dashIndex + 1);
            const startID = subRules.find((r) =>
                r.text.substring(0, r.text.indexOf(" ")).includes(leftSide)
            ).id;
            let endID;
            let fullRightSide = w.substring(dashIndex + 1);
            if (!rightSide.match(/[0-9]{3}/)) {
                fullRightSide = rightSide.match(/^[a-z]$/)
                    ? `${w.substring(0, dashIndex - 1)}${rightSide}`
                    : `${headerNum}.${rightSide}`;
            }
            endID = subRules.find((r) =>
                r.text.substring(0, r.text.indexOf(" ")).includes(fullRightSide)
            ).id;
            const rules = [];
            for (let i = startID; i <= endID; i++) {
                rules.push(subRules.find((r) => r.id === i));
            }
            setModalRules(rules);
        }
    };

    return (
        <Modal
            closeIcon="close"
            content={
                <ModalContent
                    rules={modalRules}
                    index={index}
                    setIndex={setIndex}
                />
            }
            on="click"
            trigger={trigger}
            onOpen={() => findModalRules()}></Modal>
    );
};

export default RuleModal;

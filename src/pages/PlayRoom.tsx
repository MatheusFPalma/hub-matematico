import "../App.css"
import ButtonDefault from "../components/ButtonDefault";
import ChallengeLevel from "../components/ChallengeLevel"
import DisplayScore from "../components/DisplayScore";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { CardType, getCards } from "../store/modules/cards.slice";
import { v4 as createUuid } from "uuid"
import apple from "/apple_level_One.png"

const PlayRoom = () => {
    const isOnHomePage = window.location.pathname === "/play-room";

    if (isOnHomePage) {
        document.body.classList.add("challengeLevel");
    } else {
        document.body.classList.remove("challengeLevel");
    }

    const dispatch = useAppDispatch()

    const operationRedux = useAppSelector((state) => state.operations)
    const resultLastOperation = useAppSelector((state) => state.challenges)
    const targetValueLastStatement = useAppSelector((state) => state.cards.targetCurrentStatement)
    const lastSelectedCardsRedux = useAppSelector(state => state.cards.lastSelectedCards)

    const [renderCards, setRenderCards] = useState<CardType[]>([])
    const [operation, setOperation] = useState<"+" | "-" | "x" | "÷" | null>(null)

    const handleNumbers = () => {
        const newCards: CardType[] = [];

        for (let i = 1; i <= 10; i++) {
            const randomNumber = Math.floor(Math.random() * 9) + 1;
            const cardId = createUuid();

            const newCard: CardType = {
                cardId: cardId,
                numberCard: randomNumber,
                operation: operationRedux.operationLevel,
                img: apple
            };
            newCards.push(newCard);
        }
        dispatch(getCards(newCards));
        return newCards
    };

    const isSelectedPair = lastSelectedCardsRedux.length < 2
    const checkSelecion = targetValueLastStatement === resultLastOperation.result

    const handleConfirmSelection = () => {
        if (isSelectedPair) {
            return alert('Você selecionou apenas uma carta para o resultado')
        }
        else if (checkSelecion) {
            alert('Parabéns você acertou')
        }
        else {
            alert('Tente novamente')
        }
    }


    useEffect(() => {
        const resultCards = handleNumbers()
        setOperation(operationRedux.operationLevel)
        setRenderCards(resultCards)


    }, [operation])

    return (
        <div style={{ marginBottom: '80px' }}>
            <ChallengeLevel renderCards={renderCards} children={<DisplayScore score={0} />} />
            <ButtonDefault action={handleConfirmSelection} customStyle={'buttonConfirm'} label={'Confirmar'} styleWidth={'60%'} styleHeight={60} />
        </div>
    )
}

export default PlayRoom
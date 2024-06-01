import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sum, subtract, multiply, divide } from "./utils/mathUtils";
import { updateInfoOperation } from "../store/modules/challenge.slice";
// import { addEquationHistory } from "../store/modules/challenge.slice"

interface GroupOperationLevelProps {
    firstCard: number
    secondCard: number;
    operation: string | null,
}

const GroupOperationLevel: React.FC = () => {

    const dispatch = useAppDispatch()
    const operationLevel = useAppSelector((state) => state.operations.operationLevel)
    const [firstCard, secondCard] = useAppSelector(state => state.cards.lastSelectedCards)

    useEffect(() => {
        let result = 0;
        if (operationLevel === '÷' && secondCard.numberCard === 0) {
            result = 0;
        } else {
            switch (operationLevel) {
                case '+':
                    result = sum(firstCard.numberCard, secondCard.numberCard);
                    break;
                case '-':
                    result = subtract(firstCard.numberCard, secondCard.numberCard);
                    break;
                case 'x':
                    result = multiply(firstCard.numberCard, secondCard.numberCard);
                    break;
                case '÷':
                    result = divide(firstCard.numberCard, secondCard.numberCard);
                    break;
                default:
                    result
            }
        }

        dispatch(updateInfoOperation({
            firstNumber: firstCard.numberCard,
            secondNumber: secondCard.numberCard,
            operation: operationLevel,
            result,
        }));


    }, [firstCard, secondCard, operationLevel]);

    return null
}

export default GroupOperationLevel

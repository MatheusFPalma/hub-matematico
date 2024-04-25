import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sum, subtract, multiply, divide } from "./utils/mathUtils";
import { addEquationHistory } from "../store/modules/challenge.slice"

interface GroupOperationLevelProps {
    firstCard: number
    secondCard: number;
    operation: string,
}

const GroupOperationLevel: React.FC<GroupOperationLevelProps> = ({
    firstCard,
    secondCard,
    operation
}) => {

    const dispatch = useAppDispatch()
    const operationLevel = useAppSelector((state) => state.operations.operationLevel)

    useEffect(() => {
        let result = 0;
        if (operationLevel === '÷' && secondCard === 0) {
            result = 0;
        } else {
            switch (operationLevel) {
                case '+':
                    result = sum(firstCard, secondCard);
                    break;
                case '-':
                    result = subtract(firstCard, secondCard);
                    break;
                case 'x':
                    result = multiply(firstCard, secondCard);
                    break;
                case '÷':
                    result = divide(firstCard, secondCard);
                    break;
                default:
                    result
            }
        }

        dispatch(addEquationHistory({
            firstNumber: firstCard,
            secondNumber: secondCard,
            operation: operationLevel,
            result: !firstCard && !secondCard ? 0 : result
        }));


    }, [firstCard, secondCard, operation, dispatch, operationLevel]);

    return null
}

export default GroupOperationLevel

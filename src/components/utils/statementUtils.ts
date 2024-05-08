const calculateTargetValue = (firstCard: number, secondCard: number, operation: string | null): number => {
    switch (operation) {
        case '+':
            return firstCard + secondCard;
        case '-':
            return firstCard - secondCard;
        case 'x':
            return firstCard * secondCard;
        case '÷':
            return firstCard / secondCard;
        default:
            return 0;
    }
}


export default calculateTargetValue
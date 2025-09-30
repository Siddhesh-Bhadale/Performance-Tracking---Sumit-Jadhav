import { months } from "./staticData/StaticData";
export function getPreviousMonths(currentMonth) {
    function sliceArray(start, end, array) {
        return array.slice(start, end).reverse();
    }
    return !months[currentMonth] ? ["give me a  valid month"] : [...sliceArray(0, currentMonth + 1, months), ...sliceArray(currentMonth + 1, months.length, months)]
}

export const gridMaker = (input) => {
    const N = Math.ceil(Math.sqrt(input))
    return `${N} X ${N}`
}
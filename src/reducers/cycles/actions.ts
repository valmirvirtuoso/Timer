import { Cycle } from "./reducer";

// * Forma para podermos ter acesso a quais tipos de ações nosso reducer tem acesso.
export enum ActionTypes {

    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',

}

export function addNewCycleAction (newCycle: Cycle) {

    // * type -> é o tipo de ação, e payload é o "dado" que estamos enviando para o reducers.
    return {

        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {

            newCycle,

        }

    }

}

export function markCurrentCycleAsFinishedAction () {

    // * Não precisamos passar cycleId pois ele está sendo pego dentro da action no arquivo reducer.ts
    return {

        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,

    }

}

export function interruptCurrentCycleAction () {

    // * Não precisamos passar cycleId pois ele está sendo pego dentro da action no arquivo reducer.ts
    return {

        type: ActionTypes.INTERRUPT_CURRENT_CYCLE

    }

}
// ? O immer nos ajuda a trabalhar com variaveis IMUTAVEIS como se fossem variáveis normais, dessa forma podemos simplificar nossas logicas de código pois o Immer por debaixo dos panos estara convertendo tudo isso para a logica imutavel.
import { produce } from "immer";

import { ActionTypes } from "./actions";

export interface Cycle {

    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;

}

interface CyclesState {

    cycles: Cycle[];
    activeCycleId: string | null;

}

export function cyclesReducer (state: CyclesState, action: any) {

    switch(action.type) {

        case ActionTypes.ADD_NEW_CYCLE:
            
            // ? o produce recebe 2 argumentos, o estado atual, e o draft, que é um rascunho do estado atual, e é nele que trabalharemos.
            return produce(state, (draft: CyclesState) => {

                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id

            })

        case ActionTypes.INTERRUPT_CURRENT_CYCLE:

            // * Estamos procurando o index do ciclo ativo
            const currentCyclesIndex = state.cycles.findIndex(cycle => {

                return cycle.id === state.activeCycleId

            })

            // * se não achar o index do ciclo ativo nos retornamos o state
            if (currentCyclesIndex < 0) {

                return state

            }

            return produce(state, draft => {

                draft.activeCycleId = null
                draft.cycles[currentCyclesIndex].interruptedDate = new Date()

            })

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            // * Estamos procurando o index do ciclo ativo
            const currentCyclesIndex = state.cycles.findIndex(cycle => {

                return cycle.id === state.activeCycleId

            })

            // * se não achar o index do ciclo ativo nos retornamos o state
            if (currentCyclesIndex < 0) {

                return state

            }

            return produce(state, draft => {

                draft.activeCycleId = null
                draft.cycles[currentCyclesIndex].finishedDate = new Date()

            })
        }

        default:
            return state

    }

}
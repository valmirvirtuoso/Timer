import { ReactNode, createContext, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {

    task: string;
    minutesAmount: number;

}

interface CyclesContextType {

    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;

}

interface CyclesContextProviderProps {

    children: ReactNode

}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider ({ children }: CyclesContextProviderProps) {

    
    // ? useReducer ajuda a tratar mudanças de estados que são complexas de forma mais simples.
    // ? Ela recebe 3 parametros, o state == valor atual do estado, e a action, ela indica qual ação que sera executada para modificar esse estado. E o ultimo, é uma função que recupera dados de algum lugar para preencher o estado. Como por exemplo dados do localStorage.
    // ? O reducers recebe uma callBack e o tipo inicial do dado que você guardará nele.

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {

            cycles: [],
            activeCycleId: null,

        }, (initialState) => {

            const storedStateAsJSON = localStorage.getItem("@ignite-timer:cycles-state-1.0.0");

            // ! O reducer sempre precisa retornar algo
            if (storedStateAsJSON) {

                return JSON.parse(storedStateAsJSON)

            }

            // * caso o if nao seja true ou seja, não tenha dados no localStorage, eu retorno o estado vazio.
            return initialState

        }
    );

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId);
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

        if (activeCycle) {

            return differenceInSeconds(
                new Date(), 
                new Date(activeCycle.startDate),
            )

        }

        return 0

    });

    // * Salvando ciclos no localStorage
    useEffect (() => {

        const stateJSON = JSON.stringify(cyclesState)
        // ? Dica para colocar dados no local storage, sempre seguir essa ideia de nome para o item guardado.
        localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON)

    }, [cyclesState])

    function setSecondsPassed (seconds: number) {

        setAmountSecondsPassed(seconds)

    }

    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction());

    }

    function createNewCycle (data: CreateCycleData) {

        const id = String(new Date().getTime());

        const newCycle: Cycle = {

            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),

        }

        // * Estamos passando o newCycle para a função que enviara o dado e o tipo de action.
        dispatch(addNewCycleAction(newCycle));

        setAmountSecondsPassed(0);

    }

    function interruptCurrentCycle () {

        dispatch(interruptCurrentCycleAction());

    }


    return (

        <CyclesContext.Provider value={{ 
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle 
        }}>
            {children}
        </CyclesContext.Provider>

    )

}

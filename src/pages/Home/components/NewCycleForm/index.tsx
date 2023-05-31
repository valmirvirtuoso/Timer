import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm () {

    const { register } = useFormContext()
    const { activeCycle } = useContext(CyclesContext);

    return (

        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                type="text" 
                id="task" 
                list="task-suggestions" 
                disabled={!!activeCycle}
                placeholder="Dê um nome para o seu projeto" 
                {...register("task")}
            />
            <datalist id="task-suggestions">

                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />
                <option value="Banana" />

            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number"
                step={5}
                min={5}
                max={60}
                id="minutesAmount" 
                placeholder="00" 
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>

    );

}
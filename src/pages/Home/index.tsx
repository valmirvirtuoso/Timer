import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { 
    CountDownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountDownButton, 
    TaskInput 
} from "./styles";

const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number()
        .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
        .max(60, "O ciclo precisa ser de no máximo 60 minutos."),

});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home () {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {

            task: "",
            minutesAmount: 0,

        }

    });

    function handleCreateNewCycle (data: NewCycleFormData) {

        console.log(data);
        reset();

    }

    const task = watch("task")
    const isSubmitDisabled = !task;

    return (
  
        <HomeContainer>

            <form onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="taks" 
                        list="task-suggestions" 
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
                        // min={5}
                        // max={60}
                        id="minutesAmount" 
                        placeholder="00" 
                        {...register("minutesAmount", { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>


                <CountDownContainer>

                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>

                </CountDownContainer>

                <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24}/>
                    Começar
                </StartCountDownButton>

            </form>

        </HomeContainer>
  
    );
  
  }
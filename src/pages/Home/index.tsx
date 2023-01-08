import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home () {

    return (
  
        <HomeContainer>

            <form>

                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="taks" 
                        list="task-suggestions" 
                        placeholder="Dê um nome para o seu projeto" 
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

                <StartCountDownButton type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountDownButton>

            </form>

        </HomeContainer>
  
    );
  
  }
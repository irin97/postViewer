import { createPortal } from "react-dom";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import type { EditCampaignPanelProps, formDataType } from "./types";
import type { FullCampaignData } from "@/shared/api";
import { useEditCampaignInfoMutation } from "@/shared/api";

export const EditCampaignPanel = ({ handleOpen, data }: EditCampaignPanelProps) => {

    const { id, title, step_percent, cps, auto_dial_type } = data;
    const [updateInfo, { isLoading }] = useEditCampaignInfoMutation();
    const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
        defaultValues: {
            step_percent,
            cps,
            auto_dial_type
        }
    });

    useEffect(() => {
        reset({
            step_percent,
            cps,
            auto_dial_type
        })
    }, [step_percent, cps, auto_dial_type, reset])

    const onSubmit = async (formData: formDataType) => {
        console.log('Отправляются данные:', formData);

        const updatedData: FullCampaignData = {
            ...data,
            ...formData
        }
        try {
            await updateInfo({ data: updatedData, id }).unwrap();
            handleOpen(null);
        } catch (err) {
            console.log(err)
        }
    }

    return createPortal(<div>
        <div>
            <h2>
                Редактирование проекта
            </h2>
            <button onClick={() => handleOpen(null)}>x</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                Название проекта: {title}
            </div>
            <div>
                <div>Процент перезвона:</div>
                <input type="number" {...register('step_percent', {
                    valueAsNumber: true,
                    required: 'Поле обязательно для заполнения',
                    min: { value: 0, message: 'Процент перезвона должен быть больше 0' },
                    max: { value: 100, message: 'Процент перезвона должен быть меньше 100' }
                })} />
                {errors.step_percent && <div>{errors.step_percent.message}</div>}
            </div>
            <div>
                <div>CPS:</div>
                <input type="number" {...register('cps', {
                    valueAsNumber: true,
                    required: 'Поле обязательно для заполнения',
                    min: { value: 0, message: 'CPS должен быть больше 0' }
                })} />
                {errors.cps && <div>{errors.cps.message}</div>}
            </div>
            <div>
                <div>Тип автонабора</div>
                <select {...register('auto_dial_type')}>
                    <option>predictive</option>
                    <option>predictive_adaptive</option>
                    <option>not_limited</option>
                    <option>manual</option>
                </select>
            </div>
            <div>
                <button type='button' onClick={() => reset()}>Отменить</button>
                <button type='submit' disabled={!isDirty || isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
        </form>
    </div>, document.querySelector('#modal')!
    )
}

import { createPortal } from "react-dom";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import type { EditCampaignPanelProps, formDataType } from "./types";
import type { FullCampaignData } from "@/shared/api";
import { useEditCampaignInfoMutation } from "@/shared/api";
import styles from "./EditCampaignPanel.module.scss";

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

    return createPortal(
        <div className={styles.overlay}>
            <aside className={styles.drawer}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Редактирование проекта
                    </h2>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={() => handleOpen(null)}>
                        ✕
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <span className={styles.label}>Название проекта</span>
                        <div className={styles.projectName}>
                            {title}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Процент перезвона</span>
                        <input className={styles.input} type="number" {...register('step_percent', {
                            valueAsNumber: true,
                            required: 'Поле обязательно для заполнения',
                            min: { value: 0, message: 'Процент перезвона должен быть больше 0' },
                            max: { value: 100, message: 'Процент перезвона должен быть меньше 100' }
                        })} />
                        {errors.step_percent && <span className={styles.error}> {errors.step_percent.message} </span>}
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>CPS</span>
                        <input className={styles.input} type="number" {...register('cps', {
                            valueAsNumber: true,
                            required: 'Поле обязательно для заполнения',
                            min: { value: 0, message: 'CPS должен быть больше 0' }
                        })} />
                        {errors.cps && <span className={styles.error}>{errors.cps.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Тип автонабора</span>
                        <select className={styles.select} {...register('auto_dial_type')}>
                            <option>predictive</option>
                            <option>predictive_adaptive</option>
                            <option>not_limited</option>
                            <option>manual</option>
                        </select>
                    </div>

                    <div className={styles.footer}>
                        <button type='button' className={styles.cancelButton} onClick={() => reset()}>Отменить</button>
                        <button type='submit' className={styles.saveButton} disabled={!isDirty || isLoading}>
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </aside>
        </div>, document.querySelector('#modal')!
    )
}

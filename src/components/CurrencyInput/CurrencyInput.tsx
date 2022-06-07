import React, { FC, useEffect } from 'react'

interface Props {
    value: number | undefined;
    updateValue: (value: number | undefined) => void;
    className: string,
    maxLength?:number
}

export const CurrencyInput: FC<Props> = (props:Props) => {
    const format = (value: number) => {
        let a = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return a
    }

    const [currentValue, updateCurrentValue] = React.useState<string | number>("");
    
    useEffect(() => {
        updateCurrentValue(props.value !== undefined ? format(props.value) : "")
    },[props.value])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;
        if (value === "") {
            updateCurrentValue("");
            return props.updateValue(undefined);
        }
        let valueAsNumber;
        let number = parseInt(value.replace(/\./g, ""), 10);
        if(isNaN(number)){
            updateCurrentValue("");
            return props.updateValue(undefined);
        }
        else{
            valueAsNumber = number;
            updateCurrentValue(format(valueAsNumber));
            return props.updateValue(valueAsNumber);
        }      
    };

    return (
        <input
            type="text"
            className={props.className}
            value={currentValue}
            onChange={handleChange}
            placeholder="Nhập số tiền"
            pattern="[0-9]*"
            maxLength={props.maxLength === undefined ? 11 : props.maxLength}
        />
    )
}
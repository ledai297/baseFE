import React from 'react'

interface IProps {
    width?: string,
    height?: string
}

const Exclamation: React.FC<IProps> = (props: IProps) => {
    return (
        <div style={{ cursor: 'pointer', width: props.width || '16px', height: props.height || '16px', display: 'flex' }}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 2.4C13.32 2.4 14.28 3.48 14.16 4.8L13.2 14.4H10.8L9.84 4.8C9.72 3.48 10.68 2.4 12 2.4ZM12 21.6C10.68 21.6 9.6 20.52 9.6 19.2C9.6 17.88 10.68 16.8 12 16.8C13.32 16.8 14.4 17.88 14.4 19.2C14.4 20.52 13.32 21.6 12 21.6Z" fill="#FF0606"/>
            </svg>
        </div>
    )
}

export default Exclamation;
 
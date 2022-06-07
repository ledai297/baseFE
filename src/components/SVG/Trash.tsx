import React from 'react'

interface IProps {
    width?: string,
    height?: string
}

const Trash: React.FC<IProps> = (props: IProps) => {
    return (
        <div style={{ width: props?.width || '24px', height: props?.height || '27px', cursor: 'pointer' }}>
            <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M16 0H8C6.52933 0 5.33333 1.196 5.33333 2.66667V4H0V6.66667H2.66667V24C2.66667 25.4707 3.86267 26.6667 5.33333 26.6667H18.6667C20.1373 26.6667 21.3333 25.4707 21.3333 24V6.66667H24V4H18.6667V2.66667C18.6667 1.196 17.4707 0 16 0ZM8 2.66667H16V4H8V2.66667ZM18.6667 24H5.33333V6.66667H18.6667V24Z" fill="#2E3A59"/>
                <path d="M8 9.33333H10.6667V21.3333H8V9.33333Z" fill="#2E3A59"/>
                <path d="M13.3333 9.33333H16V21.3333H13.3333V9.33333Z" fill="#2E3A59"/>
            </svg>
        </div>
    )
}

export default Trash;
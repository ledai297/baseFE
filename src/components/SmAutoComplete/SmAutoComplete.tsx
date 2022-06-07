import React, { FC, Fragment, useEffect, useState, useRef } from 'react'
import './auto-complete.scss'
import { lt } from 'lodash';
import { generateRandomId } from '../../utilities/Helpers';
interface IProp {
    fieldName: string,
    data: Array<any>,
    isLoading: boolean,
    placeholder: string,
    onKeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    onSelectItem: (item: any) => void
}

const SmAutoComplete: FC<IProp> = (props: IProp) => {
    const {fieldName, data, isLoading, placeholder, onKeyup, onSelectItem} = props;
    const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const _handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onKeyup) {
            onKeyup(event)
        }
    }

    useEffect(() => {
        setIsShowSearchResult(!isLoading && data.length > 0)
    }, [isLoading, data])

    const handleClickComponent = (event: any) => {
        const { target } = event
        if (!divRef.current?.contains(target)) {
            setIsShowSearchResult(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickComponent);

        return () => {
            document.removeEventListener("click", handleClickComponent);
        };
    }, [])

    const _handleSelectItem = (item: any) => {
        onSelectItem(item);
        setIsShowSearchResult(false);
        (document.getElementById('sm-auto-complete-input') as HTMLInputElement).value = ''
    }
    return (
        <Fragment>
            <div className="group-input-query">
                {
                    isLoading ? (
                        <img src="/images/loading.gif" className="next-icon next-icon-size-16" />
                    ) : (
                        <svg className="next-icon next-icon-size-16" width="100%" height="100%">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path>
                            </svg>
                        </svg>
                    )
                }

                <input
                    id="sm-auto-complete-input"
                    type="text"
                    className="input-query sapo-textbox"
                    placeholder={placeholder}
                    onKeyUp={_handleKeyUp}
                />
                {
                    isShowSearchResult && (
                        <div className="search-results" ref={divRef}>
                            {
                                data.map(dataItem => (
                                    <div
                                        className="search-item"
                                        onClick={() => _handleSelectItem(dataItem)}
                                        key={generateRandomId(10)}
                                    >
                                        {dataItem[fieldName]}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default SmAutoComplete;
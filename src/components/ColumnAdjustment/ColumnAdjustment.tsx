import React, { FC, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, CircularProgress, Button, Link } from "@material-ui/core";
import _ from 'lodash';
import { Column, ColumnSettings } from "./type";
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import './column-adjustment.scss'

interface IProp {
    listColumn: ColumnSettings,
    setListColumn: (listColumn: Array<Column>) => void,
}

const ColumnAdjustment: FC<IProp> = (props: IProp) => {
    const { listColumn, setListColumn } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [listColumnShow, setListColumnShow] = useState<Array<Column>>(listColumn.columns);
    const handleClickOpenDialog = async () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.checked;
        let name = event.target.name;
        const columns = _.cloneDeep(listColumnShow);
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].title.includes(name)) {
                columns[i].visible = value;
            }
        }
        setListColumnShow(columns);
    };
    const changeColumn = () => {        
        localStorage.removeItem(listColumn.type);
        localStorage.setItem(listColumn.type, JSON.stringify(listColumnShow));
        setListColumn(listColumnShow);
        setOpenDialog(false);
    }
    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        userSelect: "none",
        padding: "6px 8px",
        background: isDragging ? "navi" : "white",
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",

    });
    const reorder = (list: Array<Column>, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(listColumnShow, result.source.index, result.destination.index);
        setListColumnShow(items);
    }
    return (
        <>
            <Button className="pull-left" onClick={handleClickOpenDialog} style={{ alignItems: "end" }}>
                <svg id="icon-setting" className="next-icon next-icon--size-20" style={{ top: "-2px", left: "-5px", fill: "#637381" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 478.703 478.703">
                        <path d="M454.2 189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8 7.1-27.9-3.2-38.1l-29.8-29.8c-5.6-5.6-13-8.7-20.9-8.7-6.2 0-12.1 1.9-17.1 5.5l-27.8 19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2a29.54 29.54 0 0 0-29.2-24.7h-42.1c-14.5 0-26.8 10.4-29.2 24.7l-5.8 34c-11.2 3.5-22.1 8.1-32.5 13.7l-27.5-19.8c-5-3.6-11-5.5-17.2-5.5-7.9 0-15.4 3.1-20.9 8.7l-29.9 29.8c-10.2 10.2-11.6 26.3-3.2 38.1l20 28.1c-5.5 10.5-9.9 21.4-13.3 32.7l-33.2 5.6a29.54 29.54 0 0 0-24.7 29.2v42.1c0 14.5 10.4 26.8 24.7 29.2l34 5.8c3.5 11.2 8.1 22.1 13.7 32.5l-19.7 27.4c-8.4 11.8-7.1 27.9 3.2 38.1l29.8 29.8c5.6 5.6 13 8.7 20.9 8.7 6.2 0 12.1-1.9 17.1-5.5l28.1-20c10.1 5.3 20.7 9.6 31.6 13l5.6 33.6a29.54 29.54 0 0 0 29.2 24.7h42.2c14.5 0 26.8-10.4 29.2-24.7l5.7-33.6c11.3-3.5 22.2-8 32.6-13.5l27.7 19.8c5 3.6 11 5.5 17.2 5.5 7.9 0 15.3-3.1 20.9-8.7l29.8-29.8c10.2-10.2 11.6-26.3 3.2-38.1l-19.8-27.8c5.5-10.5 10.1-21.4 13.5-32.6l33.6-5.6a29.54 29.54 0 0 0 24.7-29.2v-42.1c.2-14.5-10.2-26.8-24.5-29.2zm-2.3 71.3c0 1.3-.9 2.4-2.2 2.6l-42 7c-5.3.9-9.5 4.8-10.8 9.9-3.8 14.7-9.6 28.8-17.4 41.9-2.7 4.6-2.5 10.3.6 14.7l24.7 34.8c.7 1 .6 2.5-.3 3.4l-29.8 29.8c-.7.7-1.4.8-1.9.8-.6 0-1.1-.2-1.5-.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-.6-13.1 7.8-27.2 13.6-41.9 17.4-5.2 1.3-9.1 5.6-9.9 10.8l-7.1 42c-.2 1.3-1.3 2.2-2.6 2.2h-42.1c-1.3 0-2.4-.9-2.6-2.2l-7-42c-.9-5.3-4.8-9.5-9.9-10.8-14.3-3.7-28.1-9.4-41-16.8-2.1-1.2-4.5-1.8-6.8-1.8-2.7 0-5.5.8-7.8 2.5l-35 24.9c-.5.3-1 .5-1.5.5-.4 0-1.2-.1-1.9-.8l-29.8-29.8c-.9-.9-1-2.3-.3-3.4l24.6-34.5c3.1-4.4 3.3-10.2.6-14.8-7.8-13-13.8-27.1-17.6-41.8-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2c-1.3-.2-2.2-1.3-2.2-2.6v-42.1c0-1.3.9-2.4 2.2-2.6l41.7-7c5.3-.9 9.6-4.8 10.9-10 3.7-14.7 9.4-28.9 17.1-42 2.7-4.6 2.4-10.3-.7-14.6l-24.9-35c-.7-1-.6-2.5.3-3.4l29.8-29.8c.7-.7 1.4-.8 1.9-.8.6 0 1.1.2 1.5.5l34.5 24.6c4.4 3.1 10.2 3.3 14.8.6 13-7.8 27.1-13.8 41.8-17.6 5.1-1.4 9-5.6 9.9-10.8l7.2-42.3c.2-1.3 1.3-2.2 2.6-2.2h42.1c1.3 0 2.4.9 2.6 2.2l7 41.7c.9 5.3 4.8 9.6 10 10.9 15.1 3.8 29.5 9.7 42.9 17.6 4.6 2.7 10.3 2.5 14.7-.6l34.5-24.8c.5-.3 1-.5 1.5-.5.4 0 1.2.1 1.9.8l29.8 29.8c.9.9 1 2.3.3 3.4l-24.7 34.7c-3.1 4.3-3.3 10.1-.6 14.7 7.8 13.1 13.6 27.2 17.4 41.9 1.3 5.2 5.6 9.1 10.8 9.9l42 7.1c1.3.2 2.2 1.3 2.2 2.6v42.1h-.1z"></path>
                        <path d="M239.4 136.001c-57 0-103.3 46.3-103.3 103.3s46.3 103.3 103.3 103.3 103.3-46.3 103.3-103.3-46.3-103.3-103.3-103.3zm0 179.6c-42.1 0-76.3-34.2-76.3-76.3s34.2-76.3 76.3-76.3 76.3 34.2 76.3 76.3-34.2 76.3-76.3 76.3z"></path>
                    </svg>
                </svg>
                <span>??i???u ch???nh hi???n th??? c???t</span>
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth={true}>
                <DialogTitle id="form-dialog-title">??i???u ch???nh hi???n th??? c???t</DialogTitle>
                <span onClick={handleCloseDialog} className="icon-close-dialog">
                    <svg className="ui-icon-x ui-icon-x-20">
                        <svg id="cancel-small-minor"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11.414 10l4.293-4.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-4.293 4.293-4.293-4.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l4.293 4.293-4.293 4.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293l4.293-4.293 4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414l-4.293-4.293z"></path></svg></svg>
                    </svg>
                </span>
                <div style={{ borderTop: "1px solid #ddd", fontSize: "14px" }}>
                    <DialogContent style={{ paddingBottom:"unset", maxHeight:"500px" }}>
                        <div className="w-100">

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {
                                                listColumnShow.map((column: Column, index: number) => (
                                                    <Draggable key={column.title} draggableId={column.title} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                                className="border-bottom"
                                                            >
                                                                <label>
                                                                    <Checkbox checked={column.visible} onChange={handleChange} name={column.title} />
                                                                    {column.title}
                                                                </label>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </DialogContent>
                    <DialogActions style={{ borderTop: "1px solid #ddd", fontSize: "14px" }}>
                         <div className="w-100">
                            <span style={{ fontWeight: "bold" }}>L??u ??: </span>Di chu???t v??o v?? k??o th??? c??c ?? ????? thay ?????i th??? t??? v??? tr?? c??c c???t hi???n th??? tr??n trang danh s??ch
                        </div>
                        <Link className="btn sapo-btn-blank none-text-decoration" onClick={handleCloseDialog}>Thoa??t</Link>
                        <button className="btn sapo-btn-default" onClick={changeColumn}>
                            L??u
                        </button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}
export default ColumnAdjustment
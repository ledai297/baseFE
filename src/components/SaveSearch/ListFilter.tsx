import React, { FC, Fragment, ChangeEvent, useState } from "react";
import '../../../src/style/default.scss';
import { Tabs, Tab, makeStyles} from "@material-ui/core"


const useStyles = makeStyles({
    tab: {
        marginBottom: 0
        
    },
    itemTab: {
        textOverflow: "ellipsis !important",
        whiteSpace: "nowrap",
    }
});
interface IProps{
    typeFilter: string
}
const ListFilter: FC<IProps> = (props: IProps) => {
    const { typeFilter } = props;
    const classes =  useStyles()
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const handleChangeTab = (event: ChangeEvent<{}>, value: number) => {
        setSelectedTab(value);
    }
    const clickTabAll = () => {
        window.location.href = `/admin/${typeFilter}`;
    }
    return (
        <Fragment>
            <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                indicatorColor="primary"
            >
                <Tab
                    value={0}
                    label="Tất cả"
                    onClick={clickTabAll}
                />                        
            </Tabs>
        </Fragment>
    )
}

export default ListFilter;
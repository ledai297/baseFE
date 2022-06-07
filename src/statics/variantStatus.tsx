import React from 'react';
import { Chip } from "@material-ui/core"

export class VariantStatus {
    public static ACTIVATED : string = "ACTIVATED"
    public static DEACTIVATED : string = "DEACTIVATED"
    public static DELETED : string = "DELETED"
    public static genNameStatus(status: string): string{
        switch(status){
            case this.DEACTIVATED : return "Ẩn"
            case this.ACTIVATED : return "Hiển thị"
            case this.DELETED : return "Xóa"
            default: return ""
        }           
    }
    public static genChipStatus(status: string){
        switch(status){
            case this.DEACTIVATED: 
                return <Chip className="chip-deactivated" label={this.genNameStatus(this.DEACTIVATED)} />
            case this.ACTIVATED : 
                return <Chip className="chip-activated" label={this.genNameStatus(this.ACTIVATED)} />
            case this.DELETED : 
                return <Chip className="chip-deleted" label={this.genNameStatus(this.DELETED)} />
            default: 
        }          
    }
}

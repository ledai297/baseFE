import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

interface IProp {
    onChange? : (html : string) => void
    className: string,
    defaultValue ?: string,
    readOnly?: boolean
}
function TextEditor (props: IProp){
    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline','strike'],
          [{ 'color': [] }], 
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
        ],
      }    
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote','color', 'background',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    const handleChange = (html: string) => {
        if(props.onChange !== undefined)
          props.onChange(html);
    }
    return (
        <ReactQuill value={props.defaultValue} onChange={handleChange} theme="snow" modules={modules} formats={formats} className={props.className} readOnly={props.readOnly === undefined ? false: props.readOnly}/>
    )
}
export default TextEditor
import React, {useState} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import { TableCell, IconButton } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function TblEditDelete(Props) {
  const [isDeleting ,setIsDeleting] = useState(false);

  //--------------Delete Record-----------------
  const deleteRecord = async (id, model) => {
    setIsDeleting(true)
    axios.post(`${process.env.REACT_APP_MAIN_URL}/${Props?.module}/deleteRecord`, { model , id}).then(response => { 
      if (!response){
        toast.error("Something wrong!")
      }else{
        toast.success(response.data)
        Props.fatchdata()
        setIsDeleting(false)
      }
    }).catch(err => {
      console.log(err);
      setIsDeleting(false)
  });    
  }

  return (
    <TableCell sx={{ fontSize: "12px" }}>
      <IconButton onClick={() => Props.setItemToEdit(Props.val)} sx={{ color: "primary" }}>
        <EditIcon />
      </IconButton>
      <Popconfirm placement="topRight" title={"Do you want to delete this record?"} onConfirm={() => deleteRecord(Props.val, Props.loc)} okText="Yes, Delete" cancelText="Cancel" okButtonProps={{"type": "default"}}>
          <IconButton>{isDeleting? <DeleteOutlineIcon sx={{color:"gray"}} /> : <DeleteOutlineIcon  sx={{ color: "#c75d5d" }} />}</IconButton>
      </Popconfirm>
    </TableCell>
  )
}



import React, { useState } from "react";
import { useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetMessage, selectInfoMessage, selectTargetMessage } from "../../features/pages/MessageModel";

const trigger = "message_modal";

function SuccessErrorModal() {

  const [msg, setMsg] = useState('')
  const [passed, setPass] = useState(Boolean)

  const target = useSelector(selectTargetMessage);
  const info = useSelector(selectInfoMessage)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(target === trigger && info) {
      setMsg(info.msg)
      setPass(info.success)
      setTimeout(() => {
        dispatch(resetMessage())
        setTimeout(() => {
          setMsg('')
        }, 500);
      }, 3000);
    }
  }, [target, info, dispatch])
  

  return (
    <div className={`error_success_modal ${trigger !== target ? 'error_success_modal_hide' : ''}`}>
      <div
        className={`error_success_modal_icon_container ${
          msg ? "error_success_modal_icon_container_show" : ""
        }`}
      >
        {
          passed ? 
          <IoCheckmarkCircle color="#36B368" size={24} /> : 
          <IoCloseCircle color="#EA5230" size={24} />
        }
      </div>

      <div
        className={`error_success_modal_message_container ${
          msg ? "error_success_modal_message_container_show" : ""
        }`}
      >
        <p>{msg ? msg : ""}</p>
      </div>
    </div>
  );
}

export default SuccessErrorModal;

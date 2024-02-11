import {useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Button from "./Button";

const InvalidProjectDataModal = forwardRef(function InvalidProjectDataModal({}, ref) {
    const invalidDataModal = useRef();

    useImperativeHandle(ref, () => {
        return {
            open(){
                invalidDataModal.current.showModal();
            }
        }
    });

  return createPortal(
    <dialog ref={invalidDataModal} className="bg-stone-400 backdrop:bg-stone-900/90 rounded-lg text-center py-2">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid data input!</h2>
        <ul className="px-4 text-stone-200">
            <li><strong className="text-stone-700 px-2">Title / Description:</strong> Can not be null or empty and must be type of string!</li>
            <li><strong className="text-stone-700 px-2">Due date:</strong> Can not be earlier than today's date and must be type of date!</li>
        </ul>
        <form method="dialog" className="mt-4">
            <Button onClick={() => invalidDataModal.current.close()}>Close</Button>
        </form>
    </dialog>, document.getElementById("modal-root")
  )
})

export default InvalidProjectDataModal;

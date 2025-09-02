import React from 'react';

const DeleteAlert = ({content, onDelete, buttonLabel, btnColor}) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        <button className={`add-btn add-btn-fill type='button' ${btnColor}`} onClick={onDelete}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default DeleteAlert;

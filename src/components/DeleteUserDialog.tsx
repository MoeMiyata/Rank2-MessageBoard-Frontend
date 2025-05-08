import React, { useState } from "react"

export const DeleteUserDialog = () => {
    const [ isOpenDialog, setIsOpenDialog ] = useState(false);

    const onClickSwitchDialog = () => {
        setIsOpenDialog(!isOpenDialog)
    }

    return (
        <>
          <div>
            <button onClick={onClickSwitchDialog}>
                { isOpenDialog && (
                    <div>
                        <h2>Delete Dialog</h2>
                        <p>これはダイアログの内容です。</p>
                        <button onClick={onClickSwitchDialog}>閉じる</button>
                    </div>
                )}
            </button>
          </div>
        </>
    )
}
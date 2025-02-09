const { useState } = React

export function LongTxt({ text, length = 100 }) {
    const [isShowLongText, setIsShowLongText] = useState(false)

    function onToggleIsShowLongText() {
        setIsShowLongText(!isShowLongText)
    }

    const isLongText = text.length > length
    const textToShow = isShowLongText ? text : (text.substring(0, length))

    return (
        <p>
            {textToShow}
            {isLongText &&
                <button onClick={onToggleIsShowLongText}>
                    {isShowLongText ? 'Show Less...' : 'Show More...'}
                </button>
            }
        </p>
    )
}
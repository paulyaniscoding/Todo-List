import React, {
    useCallback,
    useEffect,
    useState,
    useRef,
} from 'react'

// *** Read Chrome bookmark - bookmark - readingList - 2022-08-04 - TextareaAutoExpand

/* Not Finished Yet, Need to Google
export const GrowableTextarea = ({values, onChange}) => {
    let [text, setText] = useState();
    let [height, setheight] = useState();
    let [text, setText] = useState();
    let ref = useRef(null)

    const resize = () => {
        if (ref) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px'
        }
    }

    const handleChange = e => {
        onChange(e.target.value);
        resize()
    }
    return (
        <textarea
            ref={ref}

            placeholder={values.placeholder}
            value={values.value}
            onChange={handleChange}
        />
    )
}
*/
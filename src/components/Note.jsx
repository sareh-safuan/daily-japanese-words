import React, { useState } from 'react'

const Note = () => {
    const [notes, setNotes] = useState(localStorage.getItem('notes'))

    const save = () => {
        localStorage.setItem('notes', notes)
    }

    return (
        <div className="form-group mt-4">
            <label>Note:</label>
            <textarea
                defaultValue={notes}
                onChange={(e) => { setNotes(e.target.value.trim()) }}
                onBlur={save}
                className="form-control" rows="5"></textarea>
        </div>
    )
}

export default Note
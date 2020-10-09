import React, { useState } from 'react'
import _ from 'lodash'

import Lesson from './Lesson'
import Quiz from './Quiz'

const Board = ({ words }) => {
    const [learn, setLearn] = useState(true)

    return (
        <div className="card shadow">
            {learn ? <Lesson words={words} /> : <Quiz words={_.shuffle(words)} />}

            <div className="card-footer">
                <button
                    className="btn btn-block btn-outline-dark"
                    onClick={() => { setLearn(!learn) }}
                >
                    {learn ? "Take Quiz" : "Learn"}
                </button>
            </div>
        </div>
    )
}

export default Board
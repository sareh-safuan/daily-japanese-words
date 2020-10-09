import React, { Fragment, useState } from 'react'
import _ from 'lodash'

import Lesson from './Lesson'
import Quiz from './Quiz'

const Board = ({words}) => {
    const [learn, setLearn] = useState(true)

    return (
        <Fragment>
            {learn ? <Lesson words={words} /> : <Quiz words={_.shuffle(words)} /> }

            <button onClick={() => { setLearn(!learn) }}>
                { learn ? "Quiz" : "Learn" }
            </button>
        </Fragment>
    )
}

export default Board
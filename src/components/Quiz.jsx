import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { BsCheckCircle, BsCircle } from 'react-icons/bs'
import { nanoid } from 'nanoid'

const Quiz = ({ words }) => {
    const [index, setIndex] = useState(0)
    const fillers = _.shuffle(words.filter(f => f.id !== words[index].id))
    const answers = _.shuffle([words[index], ...fillers.slice(0, 3)])

    return (
        <div className="card">
            <div className="p-3">
                <div>
                    <span style={{
                        fontSize: '34px',
                        fontWeight: '600',
                        marginRight: '0.75rem'
                    }}>{words[index].vKana}</span>
                    <span>[ {words[index].vExp} ]</span>
                </div>

                <div className="p-2">
                    <div className="list-group">
                        {
                            answers.map((answer) => (
                                <QuizAnswer key={nanoid()} answer={answer} id={words[index].id} />
                            ))
                        }
                    </div>
                </div>

                <div className="mt-2 ml-2">
                    <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => { setIndex(index + 1) }}
                        disabled={index === 9}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

const QuizAnswer = ({ answer, id }) => {
    const [isCorrect, setIsCorrect] = useState(undefined)

    useEffect(() => {
        if (isCorrect === false) {
            alert('Wrong answer. Please try again.')
        }
    })

    return (
        <button
            className="list-group-item list-group-item-action"
            onClick={() => { setIsCorrect(answer.id === id) }}
        >
            {isCorrect ?
                <BsCheckCircle fill="#17A267" size={22} /> : <BsCircle size={18} />} {answer.vMean}
        </button>
    )
}

export default Quiz
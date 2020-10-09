import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import { BsCheckCircle, BsCircle } from 'react-icons/bs'
import { nanoid } from 'nanoid'

const Quiz = ({ words }) => {
    const [index, setIndex] = useState(0)
    const double = [...words, ...words]
    const fillers = _.shuffle(double.filter(f => f.id !== double[index].id))
    const answers = _.shuffle([double[index], ...fillers.slice(0, 3)])
    const toEN = index < 10 ? true : false

    return (
        <div className="card">
            <div className="p-3">
                <QuizQuestion question={double[index]} toEN={toEN} />

                <div className="p-2">
                    <div className="list-group">
                        {
                            answers.map((answer) => (
                                <QuizAnswer
                                    key={nanoid()}
                                    answer={answer}
                                    id={double[index].id}
                                    toEN={toEN}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="mt-2 ml-2">
                    <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => { setIndex(index + 1) }}
                        disabled={index === 19}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

const QuizQuestion = ({ question, toEN }) => {
    return (
        <div>
            {toEN ?
                <Fragment>
                    <span style={{
                        fontSize: '34px',
                        fontWeight: '600',
                        marginRight: '0.75rem'
                    }}>{question.vKana}</span>
                    <span>[ {question.vExp} ]</span>
                </Fragment>
                : <span style={{
                    fontSize: '30px',
                    fontWeight: '600',
                    marginLeft: '0.75rem'
                }}>{question.vMean}</span>
            }
        </div>
    )
}

const QuizAnswer = ({ answer, id, toEN }) => {
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
                <BsCheckCircle fill="#17A267" size={22} />
                : <BsCircle size={18} />} {toEN ? answer.vMean
                : answer.vKana + ' [' + answer.vExp + ']'}
        </button>
    )
}

export default Quiz